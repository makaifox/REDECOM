import { useState,useEffect} from "react";
import database from "../../services/database"
import "./styles.css"

type infoProps ={
  room_id: string,
}
type listUser = {
  user:string,
  user_name: string,
  setor:string,
  avatar:string,
}

export function UserInfos({room_id,}:infoProps){
  const [listUser,setListUser] = useState<listUser []>([])

useEffect(()=>{
        const loadData = async () =>{
            const response = await database.get('/room/users/list',{
                params:{room_id:room_id,}
            })
                setListUser(response.data)
        }
        loadData();
},[])
  
  return (
    <>
    <div className="UserInfos-wrp">
      <div className="chatListItem">
        <div className="chatListItem-lines">
            {
              listUser.map((item,key)=>(
              <div key={key}>
                <div className="chatListItem-line">
                  <img id='avatar'
                    src={item.avatar}
                    className="chat-avatar" 
                  />
                  <div className="chatListItem-text">
                      <div className="chatListItem-name">{item.user_name}</div>
                      <div className="chatListItem-function">{item.setor === 'Usuario' ? ('Autor da Demanda'):(item.setor)}</div>
                  </div>
                </div>
              </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
