import "./styles.css"

import React, { useState } from 'react';
import RedecomLogo from "../../assets/images/logo-redecom.svg";
import { useAuth } from "../../hooks/useAuth"
import { useLocation } from "react-router-dom"

type prop ={
    handleOpenMenu:() => void,
    menuOpen:boolean,
}
export function MenuResponsive(
    {handleOpenMenu,menuOpen}:prop
) {


    // pegando a rota do usuario
    let location = useLocation();
    const { user, signOutUser } = useAuth();
    // verificando se o menu do usuario esta aberto
    const [userMenuResponsive, setUserMenuResponsive] = useState(false);
    
    // abrindo menu do usuario
    const openUserMenuResponsive = () => {
        if (userMenuResponsive == false) {
            setUserMenuResponsive(true);
        }
        else
            setUserMenuResponsive(false);
    }

    // Abrindo menu responsivo

    //Deixando o menu responsivo fechado inicialmente

    return (
        <>
            <div className="menu-responsive">

                {/* Botao Menu-Mobile */}


                {/* Se usuario nao estiver autenticado ou estiver pagina home  */}
                {!user?(
                    <>
                    <div className="menu-responsive" style={{ width: menuOpen ? '100vw' : '0vw' }}>

                        <div className="mobile-menu-close"
                            onClick={handleOpenMenu}
                            style={{ width: menuOpen ? 40 : 0 }}>
                            <div className="line" id="line-close1"></div>
                            <div className="line" id="line-close2"></div>

                        </div>
                        <div className='transition-wrapper'>
                        <a href="/login">LOGIN</a>
                        </div>
                        <div className='transition-wrapper'>
                        <a href="/cadastro"> CADASTRO</a>
                        </div>
                        <div className='transition-wrapper'>
                        <a href="/metricas"> MÉTRICAS</a>
                        </div>
                        <div className='transition-wrapper'>
                        <a href="https://www.mesquita.rj.gov.br/pmm/"> RETORNAR PARA O SITE DA PMM</a>
                        </div>
                    </div>
                </>
                ) : (
                    <>
                        <div className="menu-responsive" style={{ width: menuOpen ? '100%' : '0vw' }}>

                            <div className="mobile-menu-close"
                                onClick={handleOpenMenu}
                                style={{ width: menuOpen ? 40 : 0 }}>
                                <div className="line" id="line-close1"></div>
                                <div className="line" id="line-close2"></div>

                            </div>
                            <div className='user-menu-responsive'>
                                <img src={user.avatar} className='user-avatar' />
                            </div>
                            <h2 className='user-name'>{user.name}</h2>
                            <div className='transition-wrapper'>
                            <a href="/">INÍCIO</a>
                            </div>
                            <div className='transition-wrapper'>
                            <a href="/meu-painel"> MEU PAINEL</a>
                            </div>
                            <div className='transition-wrapper'>
                            <a href="/metricas"> MÉTRICAS</a>
                            </div>
                            <div className='transition-wrapper'>
                            <a href="https://www.mesquita.rj.gov.br/pmm/"> RETORNAR PARA O SITE DA PMM</a>
                            </div>
                            <div className='transition-wrapper'>
                            <button className='btn-sair' onClick={signOutUser}>Sair</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};