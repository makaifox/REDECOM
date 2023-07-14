import Api from "../../contexts/Api";
import {useAuth} from "../../hooks/useAuth"
import './styles.css'
import { AiFillFile } from "react-icons/ai";
type MessageProps ={
    body:string;
    user:string;
    author:string;
    authorName:string;
    time:string;
    type:string;
}
type getFileProps={
    body:string
}
export default function MessageItem({body, user, author,authorName, time, type}:MessageProps) {
    authorName = authorName.split(' ')[0]
    // pegando apenas a hora
    let hours = '0';
    if(time !== undefined){
        const [,hour] = time.split('T')
        if(hour !== undefined){
            hours = hour.slice(0,5)
        }
    }
    const getFile = async ({body}:getFileProps) => {
        Api.getChatFile(body)
    }

    return (
        <>
            <div
            className='messageLine'
            style={{ justifyContent: user === author ? 'flex-end':'flex-start'}}
            >
                <div
                className='messageItem'
                >
                    <div className='messageAuthor'>{authorName}</div>
                    {type === 'file' ?(
                        <button className='messageFile'
                        style={{ 
                            backgroundColor: user === author ? '#223450':'rgba(48, 64, 91, 0.551)',
                            cursor: 'pointer'
                        }}
                        onClick={()=>getFile({body})}
                        >
                            <AiFillFile className='file-icon' size={70}/>
                            {body.split(`_`,-1).pop()}
                        </button>
                    ):(
                        <div className='messageText'
                        style={{ backgroundColor: user === author ? '#223450':'rgba(48, 64, 91, 0.551)'}}
                        >{body}</div>
                    )}
                    <div className='messageDate'>{hours}</div>
                </div>
            </div>
        </>
    )
}