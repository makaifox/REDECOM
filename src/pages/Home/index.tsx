import "./styles.css";
import "./querie.css";
import Interrogacao from "../../assets/images/ponto-de-interrogacao.png";
import Formulario from "../../assets/images/formcontato.png";
import Charts from "../../assets/images/charts.png";

import { Footer } from "../../components/Foot";
import { TituloPagina } from "../../components/TituloPagina";
import { Header } from "../../components/Header";
import { HeaderResponsive } from "../../components/HeaderResponsive";


export default function Home() {
  return (
    <>
      {/* TOPO DO SITE */}

      <Header />
      <HeaderResponsive />
      <main className="background-white">
        <div id="sobre-o-redecom">
          <h2>Sobre o</h2> <h1>REDECOM</h1>
        </div>


        <section className="rounded-main">
          <div className="Oque">
            <div className="img-title-wrapper">
              <h2>O que é ?</h2>
              <img id="pontoInterrogacao" src={Interrogacao} alt="Imagem ponto de interrogação" title="O que é ?" />
            </div>
            <div className="text-oque">
              <p>O REDECOM (Requerimento de Demandas da Comunicação) é um sistema piloto (MVP - Versão Alfa 1.5 - 13092019) lançado em Setembro de 2019, que tem por objetivo automatizar o pedido de demandas que são solicitados para a Coordenadoria de Comunicação (CCS), pelas pastas que compõe a administração pública da Cidade de Mesquita.</p>
            </div>

          </div>

          <div className="Como">
            <div className="text-como">
              <p>Em um processo simples, rápido e prático, com o preenchimento de um pequeno formulário de apenas 07 etapas, tanto os solicitantes quanto a Coordenadoria em questão, vão formalizar os pedidos e também entrar em uma sincronia de diálogo mediante a troca de e-mails futuros.</p>
            </div>
            <div className="img-title-wrapper" id="comoFunciona">
              <h2 id="como-funciona">Como funciona?</h2>
              <img id="img-como-funciona" src={Formulario} alt="Imagem de formulário" title="Formulário" />
            </div>
          </div>

          <div className="Porque">
            <div className="img-title-wrapper" id="comoFunciona">
              <h2>Por que <br />utilizar ?</h2>
              <img src={Charts} id="chartImage" alt="Imagem representando gráfico se elevando" title="Gráfico de métricas" />
            </div>
            <div className="text-porque">
              <p>Com o uso da ferramenta, será possível elaborar métricas, como a quantidade de requerimentos solicitados por cada pasta mensalmente e anualmente, e entender informações quantitativas, qualitativas e objetivas dos tipos de trabalhos executados pela equipe responsável. Aos servidores da Prefeitura Municipal de Mesquita (PMM), é primordial que seja utilizado o REDECOM, pois com isso, será possível favorecer melhorias e análises no fluxo de demandas entre a Coordenadoria de Comunicação Social (CCS) e as pastas que administram a instituição.</p>
            </div>

          </div>
        </section>
      </main>
      <Footer />

    </>


  );
}
