import React, {useContext, useState} from 'react';
import './styles.css'
import './querie.css'

import RedecomLogo from "../../assets/images/logo-redecom.svg";
import { useAuth } from '../../hooks/useAuth';
import backgroundImage from "../../assets/images/background-login.svg"

export default function EsqueciSenha() {
    const {
        sendEmailErrorCode,
        sendEmailErrorMsg,
        sendPasswordResetEmail,
    } = useAuth();
    const [email, setEmail] = useState("")

    return (
        <div className="login">
            <div className="wrapper-img-background">
            <img className="background-image" src={backgroundImage} alt="" />   
{/* ÁREA DE LOGIN */}
<div className="infos-login">
            <div className="redecom--logo">
                <img src={RedecomLogo} alt="logo-redecom" />
            </div>

{/* ÁREA DE DADOS */}
            <div className="area">
                <div className="dados">
                    <div className="InputEmail">
                        <h3>E-mail:</h3>
                        <input type="email" name="" id="inputEmail" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                </div>

                <div className="Enviarbtn">
                    <button type="submit" id="acessar"
                    onClick={sendPasswordResetEmail(email)}
                    >
                        Enviar
                    </button>
                </div>
                <div className="wrapper-error">
                <p className='errorMsg'>{sendEmailErrorCode}</p>
                <p className='errorMsg'>{sendEmailErrorMsg}</p>
                </div>
            </div>

            <div className="bottomm">
                <a href="/login">Voltar para a página de Login</a>
            </div>
            </div>
            </div>
        </div>
    );
}
