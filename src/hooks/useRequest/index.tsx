import {useEffect, useState} from "react"
import {useAuth} from "../useAuth"
import firebase from "../../services/firebase"

type FirebaseRequest = Record<string, {
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

}>
type RequestType = {
    id:string|undefined;
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
}

export default () =>{

    const {userId} = useAuth();
    const [request,setRequest] = useState<RequestType[]>([]);

    // pegando demanda do usuario
    useEffect(() => {
        const dataRef = firebase.database().ref('Demandas/'+userId);
        
        dataRef.on('value', demanda =>{
            const dataBase = demanda.val();
            const firebaseData:FirebaseRequest = dataBase ?? {}

            const parsedData = Object.entries(firebaseData).map(([key,value])=>{
                return{
                    id:key,
                    assunto:value.assunto,
                    authorName:value.authorName,
                    bairro:value.bairro,
                    cep:value.cep,
                    cidade:value.cidade,
                    data:value.data,
                    descrevaMelhor:value.descrevaMelhor,
                    horario:value.horario,
                    necessidade:value.necessidade,
                    numero:value.numero,
                    persoNome:value.persoNome,
                    personalidade:value.personalidade,
                    rua:value.rua,
                    progresso:value.progresso,
                    protocolo:value.protocolo,
                    authorId:value.authorId,
                }
            })
            setRequest(parsedData)
        })


    return ()=>{dataRef.off('value')};
    }, [userId])

    return{request}
}