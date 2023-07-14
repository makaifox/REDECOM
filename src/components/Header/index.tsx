import "./styles.css"
import {useState} from 'react'
import RedecomLogo from "../../assets/images/logo-redecom.svg"
import {useAuth} from "../../hooks/useAuth"
import {Alterar} from "../../components/Alterar"

export function Header(){
  // pegando a rota do usuario
 // let location = useLocation();
  const {user,signOutUser,userId} = useAuth();
  // verificando se o menu do usuario esta aberto
  const [userMenu, setUserMenu] = useState(false);
  const [userCad, setUserCad] = useState(false);

  // abrindo menu do usuario
  const openUserMenu =() =>{
    if(userMenu == false){
      setUserMenu(true);
    }
    else
      setUserMenu(false);
  }

  // abrindo Modal Cadastro
    const openUserCad =() =>{
      if(userCad == false){
        setUserCad(true);
      }
      else
        setUserCad(false);
    }

    if(!user){
        return(
        <>
          <div className="header">
          <a href='/'>
            <img src={RedecomLogo} alt="logo-redecom" className='logo-redecom'/> 
          </a>
          <>
            <div className="menu">
              <a href="/login">LOGIN</a>
              <a href="/cadastro"> CADASTRO</a>
              <a href="/metricas"> MÉTRICAS</a>
              <a href="https://www.mesquita.rj.gov.br/pmm/"> RETORNAR PARA O SITE DA PMM</a>
            </div>
          </>
          </div>
        </>
      );
    }


  return(
    <>
    <div className="header">
    <a href='/'>
      <img src={RedecomLogo} alt="logo-redecom" className='logo-redecom'/> 
    </a>
    <div className='user-menu'
          onClick={openUserMenu}
          >
              <img src={user.avatar} className='user-avatar'/>
              <div className='user-name'>{user?.name}</div>
              <div className='user-logout'
                style={{display:userMenu ? 'flex' : 'none'}}
              >
                <button onClick={signOutUser}>Sair</button>
                <button onClick={openUserCad}>Alterar-Cadastro</button>
              </div>
          </div> 
        <div className="menu">
          <a href="/">INÍCIO</a>
          <a href="/meu-painel"> MEU PAINEL</a>
          <a href="/metricas"> VISUALIZAR MÉTRICAS</a>
          <a href="https://www.mesquita.rj.gov.br/pmm/"> IR PARA O SITE DA PMM</a>
        </div>
        
    </div>
    {
      userCad? (
        <>
          <Alterar
          cargo={user.cargo}
          email={user.email}
          emailSuperior={user.emailSuperior}
          userName={user.name}
          matricula={user.matricula}
          nomeSuperior={user.nomeSuperior}
          setor={user.setor}
          telefone={user.telefone}
          telefoneSuperior={user.telefoneSuperior}
          userType={user.userType}
          userCad={openUserCad}
          />
        </>
      ):(
        <>
        </>
      )
    }

    </>
  );
};