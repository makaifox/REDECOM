import { useState } from "react"
import useList from '../../hooks/useList'
import { ListUser } from '../../components/ListUser'
import { TituloPagina } from "../../components/TituloPagina"
import { Header } from "../../components/Header"
import { useHistory } from 'react-router-dom'
import Atencao from "../../assets/images/atencao.svg";

import { HeaderResponsive } from '../../components/HeaderResponsive';

export default function UserList() {
    const history = useHistory();
    const { userList } = useList();
    const [listType, setListType] = useState('Selecione');
    const sendHistory = () => {
        history.push("/meu-painel");
    }

    return (
        <>
            <Header />
            <HeaderResponsive />

            <TituloPagina titulo="Listagem de usuarios" />
            <section className='meu-painel'>
                <div className="notificacao tutorial">
                    <div className="not-exclamacao">
                        <img src={Atencao} alt="" />
                    </div>
                    <div className="not-text">
                        <h2>Tutorial</h2>
                        <p>
                            - Clique em "Selecione" para para Filtrar os usuarios entre os tipos "Gestor", "Administrador" e "Usuario".<br></br>
                            - Clique no Botão "Retornar para o Painel" para ser redimensionado para o painel de Demandas.<br></br>
                        </p>
                    </div>
                </div>
                <div className="painel">
                    <div className='painel-header'>
                        <h1>Opções</h1>
                        <div></div>
                        <select
                            onChange={(e) => setListType(e.target.value)}
                        >
                            <option selected>Selecione</option>
                            <option >Usuario</option>
                            <option >Administrador</option>
                            <option >Gestor</option>
                        </select>
                    </div>
                    <div className="list">
                        <div className='list-data'>
                            <span>Usuario</span>
                            <span>Email</span>
                            <span>Tipo</span>
                        </div>
                        <div className='list-over'>
                            {userList.map(list => {
                                if (listType === 'Selecione' || listType === list.userType) {

                                    return (
                                        <ListUser
                                            id={list.id}
                                            cargo={list.cargo}
                                            email={list.email}
                                            emailSuperior={list.emailSuperior}
                                            userName={list.userName}
                                            matricula={list.matricula}
                                            nomeSuperior={list.nomeSuperior}
                                            password={list.password}
                                            setor={list.setor}
                                            telefone={list.telefone}
                                            telefoneSuperior={list.telefoneSuperior}
                                            userType={list.userType}
                                        />
                                    )
                                }
                            })}
                        </div>
                        <div className='footer'>
                            <button className="btn-novaDemanda" onClick={sendHistory}>Retornar para o Painel</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}