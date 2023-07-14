import { useState} from "react"
import "./styles.css"
import "./querie.css"
import {useAuth} from "../../hooks/useAuth"
import Api from "../../contexts/Api"
import { useHistory } from 'react-router-dom'

type RequestProps ={
    id:string|undefined,
    userId?:string|undefined,
    assunto:string,
    descrevaMelhor:string,
    authorName:string,
    bairro:string, 
    cep:string, 
    cidade:string, 
    data:string, 
    horario:string, 
    necessidade:string, 
    numero:string, 
    persoNome:string,
    personalidade:string, 
    progresso:string, 
    rua:string, 
    protocolo:string,
    authorId:string,
}



export function Request ({
    id,
    userId,
    assunto,
    descrevaMelhor,
    bairro, 
    cep, 
    cidade, 
    data, 
    horario, 
    necessidade, 
    numero, 
    persoNome,
    personalidade, 
    progresso, 
    rua, 
    protocolo,
    authorId,
}:RequestProps){
    const [viewRequest,setViewRequest] = useState(false);
    const [confProg,setConfProg] = useState(false);
    const {user} = useAuth()
    const history = useHistory();

    // Abrindo Sala de Chat
    const clickViewRequest =()=>{
                history.push(`/rooms/${authorId}-${protocolo}`);
    }

    // Abrir modal de confirmação
    const clickConfirmProg = () =>{
        confProg ? setConfProg(false) : setConfProg(true)
    }

    const changeProgressRequest = async ()=>{
        await Api.changeRequestProgress(id,userId);
        clickConfirmProg();
    }

    return(
        <>
        <div className="Request">
            <div className='request-topic'>
                <button className='request-details' onClick={clickViewRequest}>{assunto}</button>
            </div>
            <div className='request-topic'> {protocolo}</div>
            <div className='request-topic'> {necessidade}</div>
            {user?.userType === "Gestor" ?
                <div className='request-topic'><button onClick={clickConfirmProg}>{progresso}</button></div>         
             :
                <div className='request-topic'>{progresso}</div>         
            }
        </div>
        
        {/*Confirmar Conclução Demanda*/}
        <div
        className='modal-wrapper'
        style={{display: confProg ? "flex": "none"}}
        >
            <div className="prog-modal">
                <div>
                    <h2>Marcar como Concluída</h2>
                    <p>Tem certeza que deseja marca a demanda como concluída</p>
                </div>
                <div className='buttons'>  
                    <button
                    onClick={changeProgressRequest}
                    >Sim</button>
                    <button
                    onClick={clickConfirmProg}
                    >Cancelar</button>
                </div>
            </div>
        </div>
        </>
    );
}
export default Request;