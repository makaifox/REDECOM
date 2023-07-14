import './styles.css';
import './querie.css';
import  RedecomLogo from "../../assets/images/logo-redecom.svg";
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from "react-router";
import backgroundImage from "../../assets/images/background-login.svg"
//  {HiEye, HiEyeOff} from 'react-icons/hi';


export default function Login() {
    const{
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        signInWithEmail,
    } = useAuth();
        const {user} = useAuth();
        const history = useHistory();
            return (
                        <>                        
                            <div className="login">
                                    <div className="wrapper-img-background">
                                    <img className="background-image" src={backgroundImage} alt="" />
                                    
                    {/* LOGO-REDECOM */}
                            <div className="infos-login">
                                <div className="redecom-logo">
                                    <img src={RedecomLogo} alt="logo-redecom" />
                                </div>
                    {/* DADOS DE LOGIN */}
                                <div className="login-area">
                                    <div className="login-dados">
                                        <div className="login-InputEmail">
                                            <h3>Usuário:</h3>
                                            <input 
                                                type="text" 
                                                placeholder="Digite seu e-mail" 
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)}
                                                id="inputLogin"
                                            />
                                        </div>

                                        <div className="login-InputPassword">
                                            <h3>Senha:</h3>
                                            <input 
                                            type="password"
                                            placeholder="Digite sua senha" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="inputLogin"
                                            />
                                            
                                        </div>
                                    </div>

                                    <div className="acessbtn">
                                        <input type="checkbox" name="" id="remenber" />  Lembrar-me
                                        <button 
                                        type="submit" 
                                        id="acessar"
                                        onClick={signInWithEmail}
                                        >
                                            Acessar
                                        </button>
                                    </div>
                                    <p className='errorMsg'>{emailError}</p>
                                    <p className='errorMsg'>{passwordError}</p>
                                </div>

                    {/* RODAPÉ DO SITE */}
                                <div className="bottomm">
                                    <div className="links-wrapper">
                                    <a href="/esqueci-senha">Perdeu a senha?</a>
                                    <a href="/cadastro">Cadastre-se</a> <br />
                                    </div>
                                    <a href="http://mesquita.rj.gov.br/pmm/" target="_blank">Ir para o site da PMM</a>
                                </div>
                                </div>
                                </div>
                            </div>
                        </>
    );
}
