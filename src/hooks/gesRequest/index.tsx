import {useEffect, useState} from "react"
import {useAuth} from "../useAuth"
import fire from "../../services/firebase"

type FirebaseRequest = Record<string,Record<string,{
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
}>>

type RequestType = {
    id:string|undefined;
    userId:string| undefined;
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
        const dataRef = fire.database().ref('Demandas/');
        
        dataRef.on('value', demanda =>{
            const dataBase = demanda.val();
            const firebaseData:FirebaseRequest = dataBase ?? {}

            const list = new Array();

            // Lista de cada Usuario
            const parsedData = Object.entries(firebaseData).map(([key,value])=>{
                 // Lista de Demandas
                 const demandas  = Object.entries(value).map(([k,v])=>{
                  // adicionando valores a lista
                    list.push({
                        id:k,
                        userId:key,
                        assunto:v.assunto,
                        authorName:v.authorName,
                        bairro:v.bairro,
                        cep:v.cep,
                        cidade:v.cidade,
                        data:v.data,
                        descrevaMelhor:v.descrevaMelhor,
                        horario:v.horario,
                        necessidade:v.necessidade,
                        numero:v.numero,
                        persoNome:v.persoNome,
                        personalidade:v.personalidade,
                        rua:v.rua,
                        progresso:v.progresso,
                        protocolo:v.protocolo,
                        authorId:v.authorId,
                    })
                 })
            })
            setRequest(list);
        })

    return ()=>{dataRef.off('value')};
    }, [userId])

    return{request}
}