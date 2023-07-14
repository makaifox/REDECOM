import Chat from '../Chat'
import {UserInfos} from '../UserInfos'
import './styles.css'
import './querie.css'
type chatWindowProps ={
    roomId: string,
    authorId: string,
}
export default function ChatWindow({roomId,authorId,}:chatWindowProps){
    return(
        <>
            <div className='user-info-wrp'>
                <UserInfos room_id={roomId}/>
            </div>
            <div className='grid'>
            <div className='chat-wrp'>
                <Chat room_id={roomId} authorId={authorId}/>
            </div>
        </div>
        </>

    )
}