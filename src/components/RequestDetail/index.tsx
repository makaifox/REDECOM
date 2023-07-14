import {useEffect, useState} from "react"
import firebase from "../../services/firebase"
import {useAuth} from "../../hooks/useAuth"
import './styles.css'
import Api from "../../contexts/Api"

type RequestDetailProps = {
    id:any,
    authorId:string,
}
type RequestType = {
    assunto:string;
    authorName:string;
    bairro:string;
    cep:string;
    cidade:string;
    rua:string;
    data:string;
    descrevaMelhor:string;
    horario:string;
    necessidade:string;
    numero:string;
    persoNome:string;
    personalidade:string;
    progresso:string;
    protocolo:string;
    authorId:string;
    anexo:string;
}

export default function RequestDetail({id, authorId}: RequestDetailProps){
    const {user,userId} = useAuth();
    const [request,setRequest] = useState<RequestType>();

    useEffect(() => {
        const dataRef = firebase.database().ref(`Demandas/${authorId}/${id}`)
        dataRef.once('value', demanda =>{
            const dataBase = demanda.val();
            setRequest(dataBase)     
        })
        return () => {dataRef.off('value')}
    },[userId])
    
    function downloadFile(){
        if(request?.anexo !== undefined){
            Api.getRequestFile(request.anexo)
        }
        else{
            window.alert("Não há anexo para está demanda")
        }
    }


    if(!user){return (<></>)}

    return(
        <>
         <div className='main'>
            <div className='wrp'>

                <div className="wrapper-alignTexts">
                    <h2>Assunto:</h2>
                    <div className='borderTop'></div>
                    <div className='text'>
                        <h2>Assunto:</h2><br></br>
                        <p>{request?.assunto}</p>
                    </div>
                    <div className='text'>
                        <h2>Melhor Descrição:</h2><br></br>
                        <p>{request?.descrevaMelhor}</p>
                    </div>
                </div>
                <div className="wrapper-alignTexts">
                    <h2>Horario - Data:</h2>
                    <div className='borderTop'></div>
                    <div className='text'>
                        <h2>Data:</h2><br></br>
                        <p>{request?.data}</p>
                    </div>
                    <div className='text'>
                        <h2>Horario:</h2><br></br>
                        <p>{request?.horario}</p>
                    </div>
                </div>

             <h2>Local da Demanda:</h2>
             <div className='borderTop'></div>
             <div className='text'>
                 <h2>Cep:</h2><br></br>
                 <p>{request?.cep}</p>
             </div>
             <div className='text'>
                 <h2>Cidade:</h2><br></br>
                 <p>{request?.cidade}</p>
             </div>
             <div className='text'>
                 <h2>Rua:</h2><br></br>
                 <p>{request?.rua}</p>
             </div>
             <div className='text'>
                 <h2>Numero:</h2><br></br>
                 <p>{request?.numero}</p>
             </div>

             <h2>Personalidade:</h2>
             <div className='borderTop'></div>
             <div className='text'>
                 <h2>nome:</h2><br></br>
                 <p>{request?.persoNome}</p>
             </div>
            </div>

             {
                 request?.anexo !== undefined ?
                 (
                     <button className='btn-download' onClick={downloadFile}>Download dos Arquivos</button>
                 )
                 :
                 (<></>)

             }
         </div>
        </>
    )
}