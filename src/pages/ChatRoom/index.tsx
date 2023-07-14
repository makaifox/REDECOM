import { useEffect } from "react";
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TituloPagina } from "../../components/TituloPagina"
import { Header } from "../../components/Header"
import { HeaderResponsive } from "../../components/HeaderResponsive";
import { Footer } from "../../components/Foot";
import { useAuth } from '../../hooks/useAuth';
import { BsFillChatFill } from "react-icons/bs";
import { BsFillBookFill } from "react-icons/bs";
import RequestDetail from '../../components/RequestDetail'
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import ChatWindow from '../../components/ChatWindow'
import database from "../../services/database"
import Api from '../../contexts/Api'
import { useHistory } from "react-router";
import firebase from "../../services/firebase"

import './styles.css'
import './querie.css'

type RoomParams = {
    id: string;
}

export default function ChatRoom() {
    const { user, userId } = useAuth();
    const params = useParams<RoomParams>();
    const paramSplit = params.id.split('-')
    const roomId = paramSplit[1];
    const authorId = paramSplit[0]
    const [window, setWindow] = useState(true);
    const [modal, setModal] = useState(false);
    const [verifyUser, setVerifyUser] = useState(false);
    const history = useHistory();
    const [necessidade, setNecessidade] = useState('');
    const [concluidos, setConcluidos] = useState<Array<string | null | undefined>>([]);
    const [endedRoom, setEndedRoom] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (user && mounted) {
            const load = async () => {
                const dataRef = await firebase.database().ref(`Demandas/${authorId}/${roomId}`);
                const data = [];
                data.push(user?.userType)

                dataRef.on('value', demanda => {
                    const database = demanda.val();
                    const concluido = database?.concluidos
                    setNecessidade(database?.necessidade)

                    if (concluido) {
                        for (let i = 0; i < concluido.length; i++) {
                            const verif = concluido[i] == user.userType
                            console.log(verif)
                            if (verif == true) {
                                setEndedRoom(true)
                                return
                            }
                            else {
                                data.push(concluido[i])
                            }
                        }
                    }
                })
                setConcluidos(data)
            }
            load()
            const loadData = async () => {
                const response = await database.get('/room/detail', {
                    params: { room_id: roomId, }
                })
                if (response.data.ended === true) {
                    setEndedRoom(true)
                    return
                }
            }
            loadData();
        }
        return () => {
            mounted = false;
        }
    }, [roomId])

    const finalizarDemanda = async () => {
        Api.endRoom(
            roomId,
            authorId,
            userId,
            user?.userType,
            user?.name,
            necessidade,
            concluidos,
        )
        history.push('/meu-painel');

    }

    // verificando se usuario existe na sala
    useEffect(() => {
        if (user) {
            const loadData = async () => {
                const response = await database.get('/room/users/list', { params: { room_id: roomId, } })
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].user === userId) {
                        return setVerifyUser(true);
                    }
                }
            }
            loadData()
        }
    })

    async function entrarChat() {
        const user_name = user?.name
        const user_id = userId
        const user_avatar = user?.avatar
        const user_type = user?.userType

        await Api.addUserChat(
            roomId,
            user_id,
            user_name,
            user_avatar,
            user_type,
        )
        setVerifyUser(true)

    }
    function voltarPainel() {
        history.push('/meu-painel');
    }

    if (user !== undefined) {
        return (
            <>
                <Header />
                <HeaderResponsive />
                <TituloPagina titulo={`Demanda N° ${roomId}`} />
                {verifyUser ? (
                    <section className='demanda-painel'>
                        <div className='transition-wrp'>
                            <div className='transition'>
                                <button className='transition-btn' title="Chat da demanda" onClick={() => setWindow(true)} style={{ background: window ? "#fff" : "none" }}>
                                    <BsFillChatFill size={20} />
                                </button>
                                <button className='transition-btn' title="Informações da demanda" onClick={() => setWindow(false)} style={{ background: window ? "none" : "#fff" }}>
                                    <BsFillBookFill size={20} />
                                </button>
                                <>
                                    {user.userType !== 'Usuario' ? (
                                        <>
                                            {endedRoom ? (
                                                <>
                                                </>
                                            ) : (
                                                <>
                                                    <button className='transition-btn' title="Finalizar Demanda" onClick={() => setModal(true)} style={{ background: modal ? "#fff" : "none" }}>
                                                        <BsFillXCircleFill size={20} />
                                                    </button>
                                                </>
                                            )}
                                            {/* Modal Fechamento da demanda */}
                                            {modal ? (
                                                <>
                                                    <div className='modal-entry-chat'>
                                                        <div className='modal-entry'>
                                                            <div className='modal-entry-text'>
                                                                <h3>Deseja finalizar a demanda no seu Setor?</h3>
                                                                <p><span>Atenção!</span> Ao finalizar a demanda você não podera manda ou receber mensagens!</p>
                                                            </div>
                                                            <div className='modal-entry-btn'>
                                                                <button className='modal-button' onClick={finalizarDemanda}>Finalizar</button>
                                                                <button className="modal-button" onClick={() => setModal(false)}>Voltar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (<></>)}
                                </>

                                <a className="back-painel" title="Voltar para meu-painel" href="/meu-painel"> <BsArrowLeftCircleFill size={20} /> </a>
                            </div>
                        </div>
                        <div className='window'>

                            {window ?
                                (<ChatWindow roomId={roomId} authorId={authorId} />)
                                :
                                (
                                    <RequestDetail id={roomId} authorId={authorId} />
                                )
                            }
                        </div>
                    </section>
                ) : (
                    <section className='demanda-painel'>
                        <div className='transition-wrp'>
                            <div className='transition'>
                                <button className='transition-btn' title="Chat da demanda" onClick={() => setWindow(true)} style={{ background: window ? "#fff" : "none" }}>
                                    <BsFillChatFill size={20} />
                                </button>
                                <button className='transition-btn' title="Informações da demanda" onClick={() => setWindow(false)} style={{ background: window ? "none" : "#fff" }}>
                                    <BsFillBookFill size={20} />
                                </button>

                                <a className="back-painel" title="Voltar para meu-painel" href="/meu-painel"> <BsArrowLeftCircleFill size={20} /> </a>
                            </div>
                        </div>
                        <div className='window'>
                            {/* modal entrar na sala */}
                            <div className='modal-entry-chat'>
                                <div className='modal-entry'>
                                    <div className='modal-entry-text'>
                                        <h3>Deseja Logar no Chat?</h3>
                                        <p>Para ver os detalhes da demanda e conversas no chat<br></br> e necessario logar no chat.</p>
                                    </div>
                                    <div className='modal-entry-btn'>
                                        <button className='modal-button' onClick={entrarChat}>Logar</button>
                                        <button className="modal-button" id="btn-voltar" onClick={voltarPainel}>Voltar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
                }
                <div className="wrapper-footer" id="wrapper-footer-chat">
                    <Footer />
                </div>

            </>
        )
    }
    return (
        <></>
    )
}