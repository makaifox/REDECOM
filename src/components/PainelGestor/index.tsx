import { useState } from "react"
import { Request } from '../../components/Request'
import { TituloPagina } from "../../components/TituloPagina"
import { Header } from "../../components/Header"
import { HeaderResponsive } from "../../components/HeaderResponsive";
import gesRequest from '../../hooks/gesRequest'
import { useHistory } from 'react-router-dom'
import Atencao from "../../assets/images/atencao.svg";
import { Footer } from "../Foot";

export function PainelGestor() {
    const { request } = gesRequest();
    const history = useHistory();
    // Valor no select para filtrar demandas
    const [listType, setListType] = useState('Selecione');
    const sendHistory = () => {
        history.push("/listadeusuarios");
    }
    return (
        <>
            <Header />
            <HeaderResponsive />
            <TituloPagina titulo="Painel do Gestor" />
            <section className='meu-painel'>
                <div className="wrapper-not">
                    <div className="notificacao tutorial">
                        <div className="not-exclamacao">
                            <img src={Atencao} alt="" />
                        </div>
                        <div className="not-text">
                            <h2>Instruções do Sistema</h2>
                            <p>
                                - Clique no nome da demanda para obter as descrições da mesma.<br></br>
                                - Clique em "processo" para marcar a demanda como concluida.<br></br>
                                - Clique em "Selecione" para Filtrar a demanda entre os tipos "Concluida" ou "Em Andamento".<br></br>
                                - Clique no Botão "Listagem de Usuarios" para ser redimensionado para lista de Usuarios.<br></br>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="painel">
                    <div className='painel-header'>
                        <h1>Demandas</h1>
                        <div></div>

                        {/* Filtrando as demandas por setor */}
                        <select
                            onChange={(e) => setListType(e.target.value)}
                        >
                            <option selected>Selecione</option>
                            <option selected>Em andamento</option>
                            <option selected>Concluída</option>
                        </select>
                    </div>
                    <div className="list">
                        <div className='list-data'>
                            <span>Demanda</span>
                            <span>Protocolo</span>
                            <span className="setor">Setor</span>
                            <span>Processo</span>
                        </div>
                        <div className='list-over'>
                            {/* Mapeando Objeto com todas as demandas do Usuario */}
                            {request.map(request => {
                                if (listType == "Selecione" || listType == request.progresso) {
                                    return (
                                        <Request
                                            id={request.id}
                                            userId={request.userId}
                                            assunto={request.assunto}
                                            progresso={request.progresso}
                                            descrevaMelhor={request.descrevaMelhor}
                                            authorName={request.authorName}
                                            bairro={request.bairro}
                                            cep={request.cep}
                                            cidade={request.cidade}
                                            data={request.data}
                                            horario={request.horario}
                                            necessidade={request.necessidade}
                                            numero={request.numero}
                                            persoNome={request.persoNome}
                                            personalidade={request.personalidade}
                                            rua={request.rua}
                                            protocolo={request.protocolo}
                                            authorId={request.authorId}
                                        />
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className='footer'>
                        <button className="btn-novaDemanda" onClick={sendHistory}>Listagem de usuarios</button>
                    </div>
                </div>
                <div className="wrapper-footer">
                    <Footer />
                </div>

            </section>
        </>
    )
}