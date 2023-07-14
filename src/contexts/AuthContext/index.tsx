import {createContext, ReactNode, useEffect, useState} from 'react';
import firebase from "../../services/firebase"
import {useHistory} from 'react-router-dom'
import Avatar from '../../assets/images/avatar.svg';

// Tipos para os dados do Usuario
type User = {
    name:string |null;
    email:string| null;
    cargo:string| null;
    emailSuperior:string| null;
    matricula:string| null;
    telefone:string| null;
    setor:string| null;
    nomeSuperior:string| null;
    telefoneSuperior:string| null;
    userType:string| null;
    avatar:any;
}

// Tipos do AuthContext
type AuthContextType = {
    user: User| undefined,
    email:string,
    setEmail:Function,
    password:string,
    setPassword:Function,
    emailError:string,
    passwordError:string,
    signOutUser: () => Promise<void>,
    signInWithEmail: () =>void,
    userId:string| undefined,
    sendEmailErrorMsg:string,
    sendEmailErrorCode:string,
    sendPasswordResetEmail:Function,
}

type AuthContextProviderProps = {
    children:ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);
export function AuthContextProvider(props: AuthContextProviderProps){
        // Pegando dados do Usuario
    const [user,setUser] = useState<User>();
    const [email,setEmail] = useState("");
    const [emailError,setEmailError] = useState("");
    const [password,setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [sendEmailErrorCode,setSendEmailErrorCode] = useState("");
    const [sendEmailErrorMsg,setSendEmailErrorMsg] = useState("");
    const [useAvatar,setUseAvatar] = useState('');
    const history = useHistory();
    const userId = firebase.auth().currentUser?.uid;
    

// ================= Funções do Usuario ===============
    // Informações usuario já logado
    useEffect(() => {
        const unsubscribe =firebase.auth().onAuthStateChanged( async user =>{
            const userId = firebase.auth().currentUser?.uid;
            if(user){
                
                // imggem do usuario
               await firebase.storage().ref(`images/${userId}`).getDownloadURL().then(function(url){
                    return setUseAvatar(url)
                }).catch(function(){
                    console.clear()
                    return  setUseAvatar(Avatar)
                })

                // banco de dados
              await  firebase.database().ref('/Cadastros/' + userId).once('value').then((userData) =>{
                    const {
                    username,email,cargo,emailSuperior,matricula,telefone,
                    setor,nomeSuperior,telefoneSuperior,userType,
                    } = userData.val();

                setUser({
                    name:username,
                    email:email,
                    cargo:cargo,
                    telefone:telefone,
                    matricula:matricula,
                    setor:setor,
                    nomeSuperior:nomeSuperior,
                    emailSuperior:emailSuperior,
                    telefoneSuperior,
                    userType:userType,
                    avatar:useAvatar,
                })
                }).catch(function(error){
                    return;
                })
            }
        })
        return ()=>{unsubscribe()};
    })

    // Limpando inputs 
    const clearLoginInputs = () =>{
        setEmail("");
        setPassword("");
    }
    // Limpando erros
    const clearLoginError = () =>{
        setEmailError("")
        setPasswordError("")
    }

    // Login com usuario existente
    async function signInWithEmail () {
        clearLoginError()
        clearLoginInputs()
        const mail = email.trim()
        const pass = password.trim()
        if(email == "" && password ==""){
            return
        }
        await firebase.auth()
        .signInWithEmailAndPassword(mail, pass).then((userCredential) => {
            if(user && userCredential.user?.emailVerified !== false){
                return history.push("/meu-painel")
            }
            else{
                return window.alert("Verifique seu Email para ativar a conta")
            }
        })
        .catch((err) =>{
        // Setando Erros
        switch(err.code){
        default:
        setEmailError("Email ou Senha invalido");
            return
        }
        })
    }

    // Lougout do usuario no banco
    async function signOutUser(){
        await firebase.auth().signOut();
        history.push('/');
        window.location.reload();
    }

    async function sendPasswordResetEmail(email:string){
        firebase.auth().sendPasswordResetEmail(email).then(()=>{})
        .catch((error) =>{
           setSendEmailErrorCode("Email")
             setSendEmailErrorMsg("Inválido")
        })
    }

    return(
        <AuthContext.Provider value={{
            user,
            userId,
            signInWithEmail,
            signOutUser,
            email,
            setEmail,
            password,
            setPassword,
            emailError,
            passwordError,
            sendEmailErrorMsg,
            sendEmailErrorCode,
            sendPasswordResetEmail,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
