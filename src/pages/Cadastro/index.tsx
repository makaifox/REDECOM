import { FormEvent, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import "./styles.css";
import { Header } from "../../components/Header";
import { HeaderResponsive } from "../../components/HeaderResponsive";
import { TituloPagina } from "../../components/TituloPagina";
import { Button } from "../../components/Button";

type Matricula = {
  matricula: string
  setMatricula: string;
}


export default function Cadastro() {


  // verificando se já existe usuario logado
  const history = useHistory();
  const { user } = useAuth();
  if (user !== undefined) { history.push("/meu-painel") }

  const [cpfOpen, setCpfOpen] = useState(false)
  const [matriculaOpen, setMatriculaOpen] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telefone, setTelefone] = useState('')
  const [matricula, setMatricula] = useState('')
  const [setor, setSetor] = useState('')
  const [nomeSuperior, setNomeSuperior] = useState('')
  const [emailSuperior, setEmailSuperior] = useState('')
  const [telefoneSuperior, setTelefoneSuperior] = useState('')
  const [cargo, setCargo] = useState('')
  const [file, setFile] = useState()
  const [errorMsg, setErrorMsg] = useState<Array<string>>([]);
  let errorL = 0;


  const handleCpfOpen = () => {
    if (cpfOpen === false) {
      setCpfOpen(true);
      setMatriculaOpen(false);
    }
    else
      setCpfOpen(false);
    setMatriculaOpen(false);
  }

  const handleMatriculaOpen = () => {
    if (matriculaOpen === false) {
      setMatriculaOpen(true);
      setCpfOpen(false);
    }else
      setMatriculaOpen(false);
    setCpfOpen(false);
  }

  const onIconChange = async (e: any) => {
    const file = e.target.files[0];
    if (file.size > 2097152) {
      errorL++;
     return setErrorMsg([...errorMsg, "Tamanho da Imagem excedido!"])
    } else
      setFile(file);
  }

  const checkMatricula = () => {
    if (matricula == ''){
     return setErrorMsg([...errorMsg, "Insira seu Cpf ou matricula"])
    }
  }

  const closeItem = {
    display: "none",
  }

  const openItem = {
    display: "flex",
  }

  const maskOnlyLetters = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = value.replace(/\d/g, '')
    e.currentTarget.value = value;
  }, [])

  const maskCpf = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    value = value.replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2')
    value = value.replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    e.currentTarget.value = value;
  }, [])

  const maskMatricula = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 13;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '$1/$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2')
    value = value.replace(/(-\d{2})\d+?$/, '$1')
    e.currentTarget.value = value;
  }, [])
  

  const maskNumber = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 15;
    let value = e.currentTarget.value;
    value= value.replace(/\D/g, "")
    value= value.replace(/(\d{2})(\d)/, "($1) $2")
    value= value.replace(/(\d{5})(\d)/, "$1-$2")
    value= value.replace(/(-\d{4})(\d+?)$/, "$1");
    e.currentTarget.value = value;
  }, [])



  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://redecom.herokuapp.com',
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true,
    dynamicLinkDomain: 'localhost'
  };


  const auth = getAuth();
sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const errorCode = error.code;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const errorMessage = error.message;
  });
  
  // Função para Cadastrar novos usuarios

  async function registerUserInBank(event: FormEvent) {
    event.preventDefault();
    if (name.trim() === '' || password.length < 6) {
      return;
    }

    if(emailSuperior == email){
      errorL++;
     setErrorMsg([...errorMsg, "Email do superior deve ser diferente do seu Email"])

    }

    if(telefoneSuperior == telefone){
      errorL++;
     setErrorMsg([...errorMsg, "Telefone do superior deve ser diferente do seu Telefone"])

    }
    if(errorL === 0 ){
    let userId;



          // criando autenticação de email e senha
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) =>{
      userId = userCredential.user?.uid
      userCredential.user?.sendEmailVerification()
    })
    .catch((err) =>{
      return console.log(err)
    })


    // // salvando dados do usuario no banco
    await firebase.database().ref(`Cadastros/${userId}`).set({
      username: name,
      email: email,
      telefone: telefone,
      matricula: matricula,
      setor: setor,
      cargo: cargo,
      nomeSuperior: nomeSuperior,
      emailSuperior: emailSuperior,
      telefoneSuperior: telefoneSuperior,
      userType: 'Usuario',
    })
      .catch((err) => {
        return console.log(err)
      }
      )
    const data: any = file;
    // // enviando para storage
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`images/${userId}`);
    fileRef.put(data)

    history.push("/login")
    }
  }

  return (
    <>

      <Header />
      <HeaderResponsive />
      {/* {Seção Cadastro} */}
      <section className="container flex">
        <TituloPagina titulo="Cadastro" />

        {/* Formulario de Cadastro */}
        <div className="wrapper">

          <form className="Cadastro" onSubmit={registerUserInBank}>
            <div>
              <div className="wrp-container left-border">

                {/* titulo container */}
                <div className="wrp-title">
                  <span className="title-circle">
                    <span className="title-circle-color"></span>
                  </span>
                  <span>
                    <h1>Cadastro de novo usuário</h1>
                  </span>
                </div>

                {/* Matricula ou Cpf */}
                <div className="wrp-radio">
                  <div className="wrapper-label">
                    <label htmlFor="matricula">
                      <input
                        onClick={handleMatriculaOpen}
                        className="radio"
                        type="radio"
                        id="matricula"
                        name="selector"
                        defaultChecked
                      />
                      <span>Matricula</span>
                    </label>
                    <label htmlFor="cpf">
                      <input
                        className="radio"
                        onClick={handleCpfOpen}
                        type="radio"
                        id="cpf"
                        name="selector" />
                      <span>CPF</span>
                    </label>
                  </div>
                  <br />

                  <input
                    type="text"
                    id="cpf-mask"
                    style={cpfOpen ? openItem : closeItem}
                    pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})"
                    className="text-input"
                    placeholder="***.***.***-**"
                    onKeyUp={maskCpf}
                    onChange={event => setMatricula(event.target.value)}
                  ></input>

                  <input
                    type="text"
                    id="matrícula-mask"
                    pattern="(\d{2}\/?\d{3}\.?\d{3}-?\d{2})"
                    style={matriculaOpen ? openItem : closeItem}
                    className="text-input"
                    onKeyUp={maskMatricula}
                    placeholder="**/***.***-**"
                    onChange={event => setMatricula(event.target.value)}
                  />

                  {/* Nome */}
                  <div>
                    <label htmlFor="nome">Nome: *</label>
                    <br />
                    <input
                      type="text"
                      id="nome"
                      onKeyUp={maskOnlyLetters}
                      className="text-input"
                      placeholder="Digite seu nome"
                      onChange={event => setName(event.target.value)}
                      required
                    />
                  </div>


                  {/* Foto */}
                  <div id="wrapper-foto" style={{ margin: ' 2rem 0 5rem 0' }}>
                    <label htmlFor="foto">Anexe sua foto:</label>
                    <div className="wrapper-btn-foto">
                      <label htmlFor="anexo-arquivo" className="label-foto">
                        Selecionar foto
                      </label>
                    </div>
                    <input
                      type="file"
                      id="anexo-arquivo"
                      required
                      onChange={onIconChange}
                    />

                  </div>{" "}

                  <br />

                  {/* Senha */}
                  <div>
                    <label htmlFor="senha">Senha: *</label>
                    <br />
                    <input
                      type="password"
                      id="senha"
                      className="text-input"
                      placeholder="Digite uma senha com no mínimo 6 dígitos"
                      onChange={event => setPassword(event.target.value)}
                      required
                    />
                  </div>
                  {/* Telefone */}
                  <div>

                    <label htmlFor="telefone">Telefone: *</label>
                    <br />
                    <input
                      type="text"
                      id="telefone"
                      onKeyUp={maskNumber}
                      className="text-input"
                      placeholder="Digite seu telefone"
                      title='Apenas telefone (DD)XXXX-XXXX'
                      onChange={event => setTelefone(event.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email">E-mail Institucional: *</label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      className="text-input"
                      placeholder="Exemplo: nome@mesquita.rj.gov.br"
                      pattern="[a-z0-9._%+-]+@mesquita[a-z.]+\.[a-z]{2,4}$"
                      title="Apenas emails @mesquita.rj.gov.br"
                      onChange={event => setEmail(event.target.value.trim())}
                      required
                    />
                  </div>

                  {/* Setor */}
                  <div>
                    <label htmlFor="subsecretario">Setor: *</label>
                    <br />
                    <select id="subsecretario" className="text-input"
                      onChange={event => setSetor(event.target.value)}
                    >
                      <option value="selecione">Selecione</option>
                      <option value="SEMGOV - SUBSECRETARIA DE GOVERNO">
                        SEMGOV - SUBSECRETARIA DE GOVERNO
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE ADMINISTRAÇÃO">
                        SEMGOV - SUBSECRETARIA DE ADMINISTRAÇÃO
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE ORÇAMENTO E FINANÇAS">
                        SEMGOV - SUBSECRETARIA DE ORÇAMENTO E FINANÇAS
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE COMPRAS, SERVIÇOS E LOGÍSTICA">
                        SEMGOV - SUBSECRETARIA DE COMPRAS, SERVIÇOS E LOGÍSTICA
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE PLANEJAMENTO ESTRATÉGICO E GESTÃO">
                        SEMGOV - SUBSECRETARIA DE PLANEJAMENTO ESTRATÉGICO E
                        GESTÃO
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE FAZENDA">
                        SEMGOV - SUBSECRETARIA DE FAZENDA
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE TECNOLOGIA DA INFORMAÇÃO">
                        SEMGOV - SUBSECRETARIA DE TECNOLOGIA DA INFORMAÇÃO
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE TRABALHO">
                        SEMGOV - SUBSECRETARIA DE TRABALHO
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE DESENVOLVIMENTO ECONÔMICO">
                        SEMGOV - SUBSECRETARIA DE DESENVOLVIMENTO ECONÔMICO
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE CULTURA">
                        SEMGOV - SUBSECRETARIA DE CULTURA
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE ESPORTE">
                        SEMGOV - SUBSECRETARIA DE ESPORTE
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE TURISMO">
                        SEMGOV - SUBSECRETARIA DE TURISMO
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE LAZER">
                        SEMGOV - SUBSECRETARIA DE LAZER
                      </option>
                      <option value="SEMGOV - SUBSECRETARIA DE ASSISTÊNCIA SOCIAL">
                        SEMGOV - SUBSECRETARIA DE ASSISTÊNCIA SOCIAL
                      </option>
                      <option value="SEMIMSP - SECRETARIA MUNICIPAL DE INFRAESTRUTURA, MOBILIDADE E SERVIÇOS PÚBLICOS">
                        SEMIMSP - SECRETARIA MUNICIPAL DE INFRAESTRUTURA,
                        MOBILIDADE E SERVIÇOS PÚBLICOS
                      </option>
                      <option value="SEMIMSP - SUBSECRETARIA DE OBRAS">
                        SEMIMSP - SUBSECRETARIA DE OBRAS
                      </option>
                      <option value="SEMIMSP - SUBSECRETARIA DE SERVIÇOS PÚBLICOS">
                        SEMIMSP - SUBSECRETARIA DE SERVIÇOS PÚBLICOS
                      </option>
                      <option value="SEMIMSP - SUBSECRETARIA DE TRANSITO">
                        SEMIMSP - SUBSECRETARIA DE TRANSITO
                      </option>
                      <option value="SEMIMSP - SUBSECRETARIA DE DEFESA CIVIL">
                        SEMIMSP - SUBSECRETARIA DE DEFESA CIVIL
                      </option>
                      <option value="SEMIMSP - SUBSECRETARIA DE MEIO AMBIENTE">
                        SEMIMSP - SUBSECRETARIA DE MEIO AMBIENTE
                      </option>
                      <option value="SEMIMSP - SUBSECRETARIA DE URBANISMO">
                        SEMIMSP - SUBSECRETARIA DE URBANISMO
                      </option>
                      <option value="SEMIMSP - SUBSECRETARIA DE AGRICULTURA">
                        SEMIMSP - SUBSECRETARIA DE AGRICULTURA
                      </option>
                      <option value="SEMUS - SECRETARIA MUNICIPAL DE SAÚDE">
                        SEMUS - SECRETARIA MUNICIPAL DE SAÚDE</option>
                      <option value="SEMED - SECRETARIA MUNICIPAL DE EDUCAÇÃO">
                        SEMED - SECRETARIA MUNICIPAL DE EDUCAÇÃO</option>
                      <option value="CGM - CONTROLADORIA GERAL MUNICIPAL">
                        CGM - CONTROLADORIA GERAL MUNICIPAL</option>
                      <option value="PGM - PROCURADORIA GERAL MUNICIPAL">
                        PGM - PROCURADORIA GERAL MUNICIPAL</option>
                      <option value="CCS - COORDENADORIA DE COMUNICAÇÃO SOCIAL">
                        CCS - COORDENADORIA DE COMUNICAÇÃO SOCIAL</option>
                      <option value="GABINETE DO PREFEITO">
                        GABINETE DO PREFEITO</option>
                      <option value="SETOR CERIMONIAL">
                        SETOR CERIMONIAL</option>
                      <option value="OUVIDORIA">
                        OUVIDORIA</option>
                      <option value="PROCON">
                        PROCON</option>
                      <option value="MESQUITAPREV">
                        MESQUITAPREV</option>
                      <option value="OUTRAS">
                        OUTRAS</option>



                    </select>
                  </div>

                  {/* Cargo */}
                  <div>
                    <label htmlFor="cargo">Cargo: *</label>
                    <br />
                    <select id="cargo" className="text-input"
                      onChange={event => setCargo(event.target.value)}
                    >
                      <option value="SELECIONE">Selecione seu Cargo</option>
                      <option value="SECRETÁRIO(A)">SECRETÁRIO(A)</option>
                      <option value="SUBSECRETÁRIO(A)">SUBSECRETÁRIO(A)</option>
                      <option value="LÍDER">LÍDER</option>
                      <option value="CHEFE">CHEFE</option>
                      <option value="GESTOR(A)">GESTOR(A)</option>
                      <option value="SUPERVISOR(A)">SUPERVISOR(A)</option>
                      <option value="COORDENADOR(A)">COORDENADOR(A)</option>
                      <option value="COLABORADOR(A)">COLABORADOR(A)</option>
                      <option value="ENCARREGADO(A)">ENCARREGADO(A)</option>
                      <option value="OUTROS">OUTROS</option>
                    </select>
                  </div>

                  {/* Nome do Superior */}
                  <div>
                    <label htmlFor="nome">Nome do superior: *</label>
                    <br />
                    <input
                      type="text"
                      id="nome-superior"
                      onKeyUp={maskOnlyLetters}
                      className="text-input"
                      placeholder="Digite o nome do superior"
                      onChange={event => setNomeSuperior(event.target.value)}
                    />
                  </div>

                  {/* Email do Superior */}
                  <div>
                    <label htmlFor="email">E-mail do superior: *</label>
                    <br />
                    <input
                      type="email"
                      id="email-superior"
                      className="text-input"
                      placeholder="Digite o e-mail do superior"
                      onChange={event => setEmailSuperior(event.target.value)}
                    />
                  </div>

                  {/* Telefone do Superior */}
                  <div>
                    <label htmlFor="email">Telefone do superior: *</label>
                    <br />
                    <input
                      type="telefone"
                      id="telefone-superior"
                      onKeyUp={maskNumber}
                      className="text-input"
                      placeholder="Digite o telefone do superior"
                      onChange={event => setTelefoneSuperior(event.target.value)}
                    />
                  </div>

                </div>
              </div>
            </div>
            <div className="flex">
              <Button id="btn-cadastro" type="submit">Enviar Cadastro</Button>
            </div>
            <label className='errorMsg'>{
              errorMsg.map(error => {
                return(
                  <p>{error}</p>
                )
                
              })}</label>
          </form>
        </div>
      </section>
    </>
  );
}