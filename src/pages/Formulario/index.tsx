import "./styles.css";
import './querie.css'

import { useState, FormEvent, useRef, useCallback } from 'react';
import Atencao from "../../assets/images/atencao.svg";
import { Header } from "../../components/Header";
import { HeaderResponsive } from "../../components/HeaderResponsive";
import { TituloPagina } from "../../components/TituloPagina";
import { Button } from "../../components/Button";
import { useAuth } from "../..//hooks/useAuth"
import Api from '../../contexts/Api'
import { useHistory } from "react-router";


export default function Formulario() {
  // Pegando dados do usuario logado
  const { userId, user } = useAuth();
  const history = useHistory();

  // Pegando dados do formulario
  const [assuntotxt, setAssuntoTxt] = useState('');
  const [necessidade, setNecessidade] = useState<Array<string>>([]);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [personalidade, setPersonalidade] = useState('');
  const [persoNome, setPersoNome] = useState('');
  const [descrevaMelhor, setDescrevaMelhor] = useState('');
  const [concordar, setConcordar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState();
  const [personalidadeOpen, setPersonalidadeOpen] = useState(false);
  const [personalidadeClose, setPersonalidadeClose] = useState(true);

  const HandlePersonalidadeOpen = () => {
    if (personalidadeOpen === false) {
      setPersonalidadeOpen(true);
    }
    else
      setPersonalidadeOpen(false);
  }

   const HandlePersonalidadeClose = () => {
     if (personalidadeClose === true) {
       setPersonalidadeOpen(false);
     }
     else
     setPersonalidadeOpen(true);
   }

  const closeItem = {
    display: "none",
  }

  const openItem = {
    display: "flex",
  }

  const onFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file.size > 26214400) {
      return (
        alert("Tamanho do arquivo anexado excedido, o mesmo não será enviado!"))
    } else {
      setFile(file);
    }
  }

  const registerFormInBank = async (event: FormEvent) => {
    event.preventDefault();
    await Api.registerFormInBank(
      assuntotxt,
      necessidade,
      data,
      cep,
      horario,
      rua,
      numero,
      bairro,
      cidade,
      personalidade,
      persoNome,
      descrevaMelhor,
      concordar,
      userId,
      user,
      setErrorMsg,
      file,
    );
    history.push('/meu-painel');
  }

  const maskCep = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    e.currentTarget.value = value;
  }, [])

  const maskOnlyLetters = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = value.replace(/\d/g, '')
    e.currentTarget.value = value;
  }, [])

  const maskOnlyNumbers = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    e.currentTarget.value = value;
  }, [])
  
   


  if (user !== undefined) {
    return (
      <>
        <Header />
        <HeaderResponsive />
        {/* {Seção Formulario de Requerimento} */}
        <section className="container flex">
          <TituloPagina titulo="Formulario de Requerimento" />
          {/* Caixa de notificação */}
          <div className="wrapper-not">
            <div className="notificacao">
              <div className="not-exclamacao">
                <img src={Atencao} alt="" />
              </div>
              <div className="not-text">
                <p>
                  Em função da pandemia do novo coronavírus,
                  alguns prazos podem ser alterados. Isso porque
                  profissionais da Coordenadoria de Comunicação Social que sejam
                  diagnosticados com covid-19 terão de ser afastados de suas funções
                  e, em alguns casos, profissionais que convivam com pacientes
                  diagnosticados com covid-19 podem ter de ser afastados de suas
                  funções, cumprindo quarentena, para a segurança dos demais
                  funcionários da área.
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de requerimento */}
          <div className="wrapper">
            <form className="Formulario" onSubmit={registerFormInBank} >
              <div>
                {/* Descreva a demanda */}
                <div className="wrp-container left-border">
                  {/* titulo container */}
                  <div className="wrp-title">
                    <span className="title-circle">
                      <span className="title-circle-color"></span>
                    </span>
                    <span className="wrapper-titulo">
                      <h2>
                        Descreva a demanda, para entendermos o que você precisa:
                      </h2>
                    </span>
                  </div>

                  {/* Assunto */}
                  <div className="assunto">
                    <label htmlFor="assunto">Assunto:*</label>
                    <br />
                    <input
                      type="text"
                      id="assunto"
                      className="text-input"
                      placeholder="Digite o assunto"
                      onChange={event => setAssuntoTxt(event.target.value)}
                      required
                    />
                  </div>
                  {/* Qual a sua Necessidade? */}
                  <div>
                    <label htmlFor="necessidade">Qual a sua necessidade?*</label>
                    <br />
                    <div className="nc-container text-input">
                      <input
                        type="checkbox"
                        id="assessoria"
                        name="necessidade"
                        value="Assessoria de Imprensa"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}
                      />
                      <label className="labelForm" htmlFor="assessoria">
                        Assessoria de Imprensa (Criação de notas, informativos,
                        matérias e roteiros)
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="desenvolvimento"
                        name="necessidade"
                        value="Desenvolvimento Web e TI"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}
                      />
                      <label className="labelForm" htmlFor="desenvolvimento">
                        Desenvolvimento Web e T.I. (Implementação e atualização do
                        portal de notícias e outros sites da CSS)
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="design"
                        name="necessidade"
                        value="Design Gráfico"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}
                      />
                      <label className="labelForm" htmlFor="design">
                        Design Gráfico (Criação de peças gráficas do tipo impresso
                        e digital)
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="fotografia"
                        name="necessidade"
                        value="Fotografia"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}
                      />
                      <label className="labelForm" htmlFor="fotografia">
                        Fotografia (Sessão ou cobertura fotográfica em agendas)
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="impressao"
                        name="necessidade"
                        value=" Impressao em Papel"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}
                      />
                      <label className="labelForm" htmlFor="impressao">
                        Impressão em Papel (Produção interna de material em folha
                        A3, A4 ou A5)
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="marketing"
                        name="necessidade"
                        value="Marketing"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}
                      />
                      <label className="labelForm" htmlFor="marketing">
                        Marketing (Análise de dados e informações no ambiente
                        digital)
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="midia-social"
                        name="necessidade"
                        value="Mídia Social"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}
                      />
                      <label className="labelForm" htmlFor="midia-social">
                        Mídia Social (Divulgação de conteúdos nos canais da
                        comunicação)
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="video"
                        name="necessidade"
                        value="Vídeo"
                        onChange={event => setNecessidade([...necessidade, event.target.value])}

                      />
                      <label className="labelForm" htmlFor="video">
                        Vídeo (Captura de material audiovisual em agendas)
                      </label>
                      <br />
                    </div>
                  </div>
                </div>

                {/* Se sua demanda é uma ação */}
                <div className="wrp-container left-border">
                  {/* titulo container */}
                  <div className="wrp-title">
                    <span className="title-circle">
                      <span className="title-circle-color"></span>
                    </span>
                    <span className="wrapper-span">
                      <h2>
                        Se sua demanda é uma ação, evento ou inauguração, informe:
                      </h2>
                    </span>
                  </div>

                  {/* Data */}
                  <div>
                    <label className="wrapper-data" htmlFor="data">Data:*</label>
                    <br />
                    <input
                      type="date"
                      id="data"

                      className="data-input"
                      placeholder="dd;mm/aaaa"
                      required
                      onChange={event => setData(event.target.value)}
                    />
                  </div>

                  {/* Horário */}
                  <div>
                    <label htmlFor="horario">Horário:*</label>
                    <br />
                    <input
                      type="time"
                      id="horario"
                      className="endereco-input"
                      placeholder="hh:mm"
                      required
                      onChange={event => setHorario(event.target.value)}
                    />
                  </div>

                  {/*CEP */}
                  <div className="wrapper-inputs-form">
                    <div className="wrapper-info-input">
                    <label htmlFor="cep">CEP:*</label>
                    <br />
                    <input
                      type="text"
                      id="cep"
                      className="endereco-input form-input"
                      onKeyUp={maskCep}
                      placeholder="Digite o Endereço"
                      onChange={event => setCep(event.target.value)}
                    />
                    </div>
                    <div className="wrapper-inputRadio-label">
                    <input type="checkbox" 
                      id="n-cep"
                      value="Não se Aplica"
                      className="check-form-aplicar"
                      onChange={event => event.target.checked ? 
                      (setCep(event.target.value),
                      (document.getElementById("cep") as HTMLInputElement).disabled =true)
                        : 
                      (setCep((document.getElementById('cep') as HTMLInputElement).value),
                      (document.getElementById("cep") as HTMLInputElement).disabled = false)
                    }
                    />
                    <label>Não se aplica</label>
                    </div>
                  </div>

                  {/*Rua */}
                  <div className="wrapper-inputs-form">
                  <div className="wrapper-info-input">
                    <label htmlFor="rua">Rua:*</label>
                    <br />
                    <input
                      type="text"
                      id="rua"
                      onKeyUp={maskOnlyLetters}
                      className="endereco-input"
                      placeholder="Digite a Rua"
                      onChange={event => setRua(event.target.value)}
                    />
                    </div>
                    <div className="wrapper-inputRadio-label">
                    <input type="checkbox" id="n-rua"
                      value="Não se Aplica"
                      className="check-form-aplicar"
                      onChange={event => event.target.checked ? 
                      (setRua(event.target.value),
                      (document.getElementById("rua") as HTMLInputElement).disabled =true)
                        : 
                      (setRua((document.getElementById('rua') as HTMLInputElement).value),
                      (document.getElementById("rua") as HTMLInputElement).disabled = false)
                      }
                    />
                    <label>Não se aplica</label>
                    </div>
                  </div>

                  {/*Numero Completo */}
                  <div className="wrapper-inputs-form">
                  <div className="wrapper-info-input">
                    <label htmlFor="numero">Numero:*</label>
                    <br />
                    <input
                      type="text"
                      id="numero"
                      onKeyUp={maskOnlyNumbers}
                      className="endereco-input"
                      placeholder="Digite número do local"
                      onChange={event => setNumero(event.target.value)}
                    />
                    </div>
                    <div className="wrapper-inputRadio-label">
                    <input type="checkbox" id="n-numero"
                      value="Não se Aplica"
                      className="check-form-aplicar"
                      onChange={event => event.target.checked ? 
                        (setNumero(event.target.value),
                        (document.getElementById("numero") as HTMLInputElement).disabled =true)
                          : 
                        (setNumero((document.getElementById('numero') as HTMLInputElement).value),
                        (document.getElementById("numero") as HTMLInputElement).disabled = false)
                        }
                    />
                    <label>Não se aplica</label>
                    </div>
                  </div>

                  {/*Bairro */}
                  <div className="wrapper-inputs-form">
                  <div className="wrapper-info-input">
                    <label htmlFor="bairro">Bairro:*</label>
                    <br />
                    <input
                      type="text"
                      id="bairro"
                      onKeyUp={maskOnlyLetters}
                      className="endereco-input"
                      placeholder="Digite o Endereço"
                      onChange={event => setBairro(event.target.value)}
                    />
                    </div>
                    <div className="wrapper-inputRadio-label">
                    <input type="checkbox"
                     id="n-bairro"
                      value="Não se Aplica"
                      className="check-form-aplicar"
                      onChange={event => event.target.checked ? 
                        (setBairro(event.target.value),
                        (document.getElementById("bairro") as HTMLInputElement).disabled =true)
                          : 
                        (setBairro((document.getElementById('bairro') as HTMLInputElement).value),
                        (document.getElementById("bairro") as HTMLInputElement).disabled = false)
                        }
                    />
                    <label>Não se aplica</label>
                    </div>
                  </div>

                  {/*Cidade */}
                  <div className="wrapper-inputs-form">
                  <div className="wrapper-info-input">
                    <label htmlFor="cidade">Cidade:*</label>
                    <br />
                    <input
                      type="text"
                      id="cidade"
                      onKeyUp={maskOnlyLetters}
                      className="endereco-input"
                      placeholder="Digite o Endereço"
                      onChange={event => setCidade(event.target.value)}
                    />
                    </div>
                    <div className="wrapper-inputRadio-label">
                    <input type="checkbox" 
                      id="n-cidade"
                      value="Não se Aplica"
                      className="check-form-aplicar"
                      onChange={event => event.target.checked ? 
                        (setCidade(event.target.value),
                        (document.getElementById("cidade") as HTMLInputElement).disabled =true)
                          : 
                        (setCidade((document.getElementById('cidade') as HTMLInputElement).value),
                        (document.getElementById("cidade") as HTMLInputElement).disabled = false)
                        }
                    />
                    <label>Não se aplica</label>
                    </div>
                  </div>

                  {/*Personalidade */}
                  <div className="wrapper-personas">
                    <label>Alguma personalidade estará presente?</label>
                    <br />
                    <div className="wrapper-radius-personalidades">
                      <div className="wrapper-box-personas">
                    <input type="radio" id="person-sim" name="person" value='sim'
                      onClick={HandlePersonalidadeOpen} onChange={event => setPersonalidade(event.target.value)}
                    />
                    <label htmlFor="person-sim">Sim</label>
                    </div>
                    <div className="wrapper-box-personas">
                    <input onClick={HandlePersonalidadeClose} defaultChecked type="radio" id="person-nao" name="person" value="não" 
                      onChange={event => setPersonalidade(event.target.value)}
                    />
                    <label htmlFor="person-nao">Não</label>
                    </div>
                    </div>
                    <br />
                    <div>
                      <br />
                      <label style={personalidadeOpen ? openItem : closeItem} htmlFor="person">Quem será?</label>
                      <br />
                      <input
                      style={personalidadeOpen ? openItem : closeItem}
                        type="text"
                        id="person"
                        onKeyUp={maskOnlyLetters}
                        className="endereco-input"
                        placeholder="Digite o nome da personalidade"
                        onChange={event => setPersoNome(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/*  Descreva melhor*/}
                <div className="wrp-container left-border">
                  {/* titulo container */}
                  <div className="wrp-title">
                    <span className="title-circle">
                      <span className="title-circle-color"></span>
                    </span>
                    <span>
                      <h2>Caso deseje, decreva ainda melhor a sua demanda:</h2>
                    </span>
                  </div>
                  {/* Area de Texto */}
                  <div className="wrp-textarea">
                    <label htmlFor="">
                      Explique a demanda de forma breve e objetiva(Até 1280 caracteres)
                    </label>
                    <br />
                    <textarea
                      name=""
                      className="text-input form-textarea"
                      cols={30}
                      rows={10}
                      maxLength={1280}
                      placeholder="Descreva sua demanda"
                      onChange={event => setDescrevaMelhor(event.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Material de Referência */}
                <div className="wrp-container left-border">
                  {/* titulo container */}
                  <div className="wrp-title">
                    <span className="title-circle">
                      <span className="title-circle-color"></span>
                    </span>
                    <span>
                      <h2>
                        Caso tenha algum material de referência, você pode nos
                        enviar:
                      </h2>
                    </span>
                  </div>

                  {/* Anexo */}
                  <div>
                    <label>Anexe os arquivos desejados (até 25mb):</label>
                    <label htmlFor="anexo-arquivo" className="label-anexo">
                      Escolher Arquivo
                    </label>
                    <input type="file" id="anexo-arquivo"

                      onChange={onFileChange}
                    />
                  </div>
                </div>

                {/* Concordar com Metodologia */}
                <div className="wrp-container">
                  {/* titulo container */}
                  <div className="wrp-title">
                    <span className="title-circle">
                      <span className="title-circle-color"></span>
                    </span>
                    <span>
                      <h2>
                        É necessário concordar com a metodologia de trabalho da
                        CCS:*
                      </h2>
                    </span>
                  </div>

                  <div className="text-input wrp-text">
                    <p>
                      1. Se possível, a realização de requerimentos deve ser feita
                      com no máximo até 21 dias de antecedência da data necessária
                      de sua demanda, para não ocorrer impasses na entrega.
                      <br />
                      2. A partir da realização do requerimento, a demanda será
                      inserida na fila de produção do CCS e respeitará a ordem de
                      chegada.
                      <br />
                      3. O prazo para o primeiro retorno é de 72 horas, a partir da
                      realização do requerimento, para a ciência da existência do
                      job.
                      <br />
                      4. Mesmo sendo realizado o requerimento, será considerado na
                      execução as prioridades solicitadas pelo Gabinete do
                      Prefeito e pela Secretaria de Governança, para não afetar
                      estrategicamente o bom funcionamento da instituição.
                      <br />
                      5. Dúvidas e feedbaccks, é necessário acompanhar e retornar
                      sempre a demanda pelo e-mail recebido no ato da realização
                      do requerimento.
                    </p>
                    <div className="wrapper-concordar">
                      <input type="checkbox" id="concordo"
                        onClick={event => setConcordar(true)}
                      />
                      <label htmlFor="concordo" id="concordo-text">
                        Li e concordo com a Metodologia da Coordenadoria de
                        Comunicação Social
                      </label>  <br />
                      <label className='errorMsg'>{errorMsg}</label>
                    </div>
                  </div>
                  <div className="flex">
                    <Button type="submit">Enviar Requerimento</Button>
                    <Button type="reset">Limpar</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
    </>
  )
}
function useForm(): [any, any] {
  throw new Error("Function not implemented.");
}

