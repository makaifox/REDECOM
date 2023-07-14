import "./styles.css"

import React, { useState} from 'react';
import RedecomLogo from "../../assets/images/logo-redecom.svg";
import { useAuth } from "../../hooks/useAuth"
import { useLocation } from "react-router-dom"
import Avatar from "../../assets/images/avatar.svg"
import { MenuResponsive } from "../../components/MenuResponsive";

export function HeaderResponsive() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu =() =>{
    if(menuOpen == false){
      setMenuOpen(true);
    }
    else
      setMenuOpen(false);
  }

  return (
    <>
      <div className="header-responsive">
      <MenuResponsive 
      handleOpenMenu={handleOpenMenu}
      menuOpen={menuOpen}
      />

      <div className="wrapper-logo">
          <a href='/'>
            <img src={RedecomLogo} alt="logo-redecom" className='logo-redecom-responsive'/> 
          </a>
        </div>
        <div className="hamburguer"
                    onClick={handleOpenMenu}
                    style={{ width: menuOpen ? 0 : 30 }}>
                    <div className="line" id="line1"></div>
                    <div className="line" id="line2"></div>
                    <div className="line" id="line3"></div>
                </div>
        {/* Botao Menu-Mobile */}
        </div>
    </>
  );
};