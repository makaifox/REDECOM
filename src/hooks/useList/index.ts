import { useEffect,  useState} from "react";
import firebase from "../../services/firebase"
import {useAuth} from "../useAuth"


type FirebaseUser = Record<string, {
    cargo:string;
    email:string;
    emailSuperior:string;
    username:string;
    matricula:string;
    nomeSuperior:string;
    password:string;
    setor:string;
    telefone:string;
    telefoneSuperior:string;
    userType:string;
}>

type UserListType = {
    id:string;
    cargo:string;
    email:string;
    emailSuperior:string;
    userName:string;
    matricula:string;
    nomeSuperior:string;
    password:string;
    setor:string;
    telefone:string;
    telefoneSuperior:string;
    userType:string;
}

export default () =>{
    const [userList, setUserList] = useState<UserListType[]>([]);

    useEffect(() => {
        const dataRef = firebase.database().ref('Cadastros/');

        dataRef.on('value',demanda =>{
            const dataBase = demanda.val();
            const firebaseData:FirebaseUser = dataBase ?? {};

            const parsedData = Object.entries(firebaseData).map(([key,value]) =>{
                return{
                    id:key,
                    cargo:value.cargo,
                    email:value.email,
                    emailSuperior:value.emailSuperior,
                    userName:value.username,
                    matricula:value.matricula,
                    nomeSuperior:value.nomeSuperior,
                    password:value.password,
                    setor:value.setor,
                    telefone:value.telefone,
                    telefoneSuperior:value.telefoneSuperior,
                    userType:value.userType,
                }
            })
            setUserList(parsedData)
        })
        return() =>{dataRef.off('value');}
    },[])
    return{userList}
}