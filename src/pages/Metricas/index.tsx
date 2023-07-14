import './styles.css'
import Demandas from '../../assets/images/megafone.svg';
import Impressões from '../../assets/images/impressora.svg';
import Eventos from '../../assets/images/camera.svg';
import { Header } from "../../components/Header"
import { TituloPagina } from "../../components/TituloPagina"
import { BarChart } from '../../components/BarChart';
import { useState } from "react"
import { HeaderResponsive } from '../../components/HeaderResponsive';
import './querie.css'
import { Footer } from '../../components/Foot';

export default function Metricas() {
    const [listType, setListType] = useState('Assessoria de Imprensa');

    return (
        <div>

            {/* TOPO DA PÁGINA */}
            <Header />
            <HeaderResponsive />

            <TituloPagina titulo="Métricas" />

            {/* ÁREA DE MÉTRICAS */}
            <div className="metricas">

                <div className="row">
                    <h2>Principais Números</h2>
                    <div className='line'></div>
                </div>
                <div className="metricas-img">
                    <div className="icon-wrapper">
                        <img src={Demandas} alt="" />
                    </div>

                    <div className="icon-wrapper">
                        <img src={Impressões} alt="" />
                    </div>

                    <div className="icon-wrapper">
                        <img src={Eventos} alt="" />
                    </div>

                </div>
                <div className="wrapper-row">
                    <div className='wrapper row'>
                        <h2>Demandas Atendidas</h2>
                        <div className='line'></div>
                        {/* Filtrando as demandas por setor */}
                        <select className="select-demandas"
                            onChange={(e) => setListType(e.target.value)}
                        >
                            <option selected>Selecione:</option>
                            <option value="Assessoria de Imprensa" >Assessoria de Imprensa</option>
                            <option value="Desenvolvimento Web e TI">Desenvolvimento Web e T.I</option>
                            <option value="Design Gráfico">Design Gráfico</option>
                            <option value="Fotografia">Fotografia</option>
                            <option value="Impressao em Papel">Impressão em Papel</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Midia Social">Mídia Social</option>
                            <option value="Vídeo">Video</option>
                        </select>
                    </div>
                    <div className="wrapper-chart">
                        <div className="chartbar">
                            <BarChart
                                listType={listType}
                            ></BarChart>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
}