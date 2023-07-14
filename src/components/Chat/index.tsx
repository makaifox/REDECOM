import { useState, useEffect } from "react";
import './styles.css'
import './querie.css'
import { IoSend } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth"
import MessageItem from "../MessageItem";
import Api from '../../contexts/Api'
import database from "../../services/database"
import firebase from "../../services/firebase"
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs"
import EmojiPicker from 'emoji-picker-react';

type chatProps = {
    room_id: string,
    authorId: string,
}

type listMessage = {
    key: string,
    author: string,
    author_name: string,
    created_at: string,
    body: string,
    user: string,
    type: string,
}

export default function Chat({ room_id, authorId }: chatProps) {
    const [text, setText] = useState('');
    const { userId, user } = useAuth()
    const body = document.getElementById('body')
    const [list, setList] = useState<listMessage[]>([])
    const [endedRoom, setEndedRoom] = useState(false);
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [file, setFile] = useState();

    const handleOpenEmoji = () => {
        if (emojiOpen === false) {
            setEmojiOpen(true);
        } else
            setEmojiOpen(false);
    }

    // verificando sala finalizada
    useEffect(() => {
        let mounted = true;
        // verificando se setor finalizou a demanda
        if (user && mounted) {
            const load = async () => {
                const dataRef = await firebase.database().ref(`Demandas/${authorId}/${room_id}`);
                dataRef.on('value', demanda => {
                    const database = demanda.val();
                    if (database?.concluidos) {
                        for (let i = 0; i < database?.concluidos.length; i++) {
                            console.log()
                            if (database?.concluidos[i] === user.userType) {
                                setEndedRoom(true)
                            }
                        }
                    }
                })
            }
            load()
        }
        const loadData = async () => {
            if (mounted) {
                const response = await database.get('/room/detail', {
                    params: { room_id: room_id, }
                })
                if (response.data.ended === true) {
                    setEndedRoom(true)
                }
            }
        }
        loadData();

        return () => {
            mounted = false;
        }
    }, [room_id])

    // Pegando dados do banco
    useEffect(() => {
        setInterval(() => {
            let mounted = true;
            // pegando mensagens
            const loadData = async () => {
                const response = await database.get('/room/messages/list', {
                    params: { room_id: room_id, }
                })
                if (mounted) {
                    setList(response.data)
                }
            }
            loadData();


            return () => {
                mounted = false;
            }
        }, 1000 * 2)

    }, [room_id])

    // Rolando para final das Mensagens
    useEffect(() => {
        if (body !== null) {
            body.scrollTop = body.scrollHeight;
        }
    }, [list.length]);

    // verificando se apertou enter
    const inputKeyEnter = (e: any) => {
        if (e.keyCode === 13) {
            sendTextMessage()
        }
    }

    const EmojiClick = (e: any, emojiObject: any) => {
        setText(text + emojiObject.emoji);

    }

    const sendTextMessage = () => {
        if (userId !== undefined && user !== undefined) {
            let author = userId
            let author_name = user.name
            let body = text
            if (text !== '') {
                Api.sendMessage(
                    room_id,
                    author,
                    author_name,
                    body,

                )
                setText('');
            }
        }
    }

    const onFileChange = async (e: any) => {
        if (userId !== undefined && user !== undefined) {
            const file = e.target.files[0];
            const author = userId
            const author_name = user.name
            if (file.size > 26214400) {
                return (
                    alert("Tamanho do arquivo anexado excedido, o mesmo não será enviado!"))
            } else {
                setFile(file);
                Api.sendMessageFile(
                    file,
                    room_id,
                    author,
                    author_name,
                )
            }
        }
    }

    if (userId !== undefined) {
        return (

            <div className="chat-container">
                <div className="chatWindow-emojiarea"
                    style={{ height: emojiOpen ? "280px" : "0px" }}>
                    <EmojiPicker
                        onEmojiClick={EmojiClick}
                        disableSearchBar
                        disableSkinTonePicker
                    />
                </div>
                <div className="emojiArea">

                </div>
                <div className="chat-body" id='body'>

                    <div className="chat-body-ctn">

                        <div className='body-wrp'>
                            {list.map((item, key) => (
                                <MessageItem
                                    key={key}
                                    author={item.author}
                                    authorName={item.author_name}
                                    time={item.created_at}
                                    body={item.body}
                                    user={userId}
                                    type={item.type}
                                />
                            ))}
                        </div>

                    </div>
                </div>
                <div className='chat-footer'>
                    <div className='footer-wrp'>
                        {endedRoom ? (
                            <>
                                <div
                                    className="chatWindow-btn"
                                >
                                    <BsFillFileEarmarkArrowUpFill className='icon-emote' size={20} />
                                    <BsFillEmojiSmileFill className='icon-emote' size={20} />
                                </div>

                                <div className='chat-inputarea'>
                                    <input className='chat-input'
                                        type='text'
                                        value={text}
                                        placeholder='Sala Fechada'
                                        disabled
                                    />
                                </div>
                                <div className='send-btn'>
                                    <IoSend size={20} />
                                </div>
                            </>
                        ) : (
                            <>

                                <div className="chatWindow-btn"
                                >
                                    <label htmlFor="file-input">
                                        <BsFillFileEarmarkArrowUpFill className='icon-emote' size={20} />
                                    </label>
                                    <input type='file' id='file-input'
                                        onChange={onFileChange}
                                    />
                                </div>

                                <div className="chatWindow-btn"
                                    onClick={handleOpenEmoji}
                                >
                                    <BsFillEmojiSmileFill className='icon-emote' size={20} />
                                </div>


                                <div className='chat-inputarea'>
                                    <input className='chat-input'
                                        type='text'
                                        value={text}
                                        placeholder='Digite uma mensagem'
                                        onChange={e => setText(e.target.value)}
                                        onKeyUp={inputKeyEnter}
                                    />
                                </div>
                                <div className='send-btn'>
                                    <IoSend className="emote-send" onClick={sendTextMessage} size={20} />
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        )
    }
    return (<></>)
}