import { useState, FormEvent, useCallback } from "react"
import firebase from "../../services/firebase"
import { useAuth } from '../../hooks/useAuth';
import Api from '../../contexts/Api'
import "./styles.css"

type ListUserProps = {
  cargo: any;
  email: any;
  emailSuperior: any;
  userName: any;
  matricula: any;
  nomeSuperior: any;
  setor: any;
  telefone: any;
  telefoneSuperior: any;
  userType: any;
  userCad: any;
}

export function Alterar({
  cargo,
  email,
  emailSuperior,
  userName,
  matricula,
  nomeSuperior,
  setor,
  telefone,
  telefoneSuperior,
  userType,
  userCad,
}: ListUserProps) {
  const [viewUser, setViewUser] = useState(false);
  // dados usuario alterados 
  const [name, setName] = useState(userName)
  const [Email, setEmail] = useState(email)
  const [password, setPassword] = useState(email)
  const [Avatar, setAvatar] = useState(setor)
  const [Telefone, setTelefone] = useState(telefone)
  const [Matricula, setMatricula] = useState(matricula)
  const [Setor, setSetor] = useState(setor)
  const [NomeSuperior, setNomeSuperior] = useState(nomeSuperior)
  const [EmailSuperior, setEmailSuperior] = useState(emailSuperior)
  const [TelefoneSuperior, setTelefoneSuperior] = useState(telefoneSuperior)
  const [Cargo, setCargo] = useState(cargo)
  const [Type, setType] = useState(userType)
  const { userId } = useAuth();
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState('');



  //Mostrando painel modal
  const viewUserData = () => {
    if (viewUser === false) {
      setViewUser(true);
    }
    else
      setViewUser(false);
  }

  // Alterando dados no Banco
  const changeUserRegistre = async (event: FormEvent) => {
    event.preventDefault();
    await Api.changeUserRegistre(
      name,
      cargo,
      Email,
      password,
      EmailSuperior,
      Matricula,
      NomeSuperior,
      Setor,
      Telefone,
      TelefoneSuperior,
      Type,
      userId,
      file,
    )

    // Fechando Modal
    userCad();
  }
  const onChangeIcon = async (e: any) => {
    const file = e.target.files[0];
    if (file.size > 2097152) {

      setErrorMsg("Tamanho da Imagem excedido!")
    } else
      setFile(file);
  }



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

  const maskNumber = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 15;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d{5})(\d)/, "$1-$2")
    value = value.replace(/(-\d{4})(\d+?)$/, "$1");
    e.currentTarget.value = value;
  }, [])


  return (
    <>
      {/* Modal */}
      <div
        className='alt-wrapper'
      >
        <div className='request-modal'>
          <div className='m-header'>
            <div>Usuario</div>
            <button onClick={userCad}>X</button>
          </div>
          <div className="m-main">
            <form onSubmit={changeUserRegistre}>
              <div className="flex-div">
                <div className='modal-row'>
                  <label>Nome:</label>
                  <input type="text" placeholder={userName}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* <label>Email:</label>
                        <input type="text" placeholder={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        
                        /><br></br>
                        <label>Senha:</label>
                        <input type="password" placeholder={"******"}
                        onChange={(e)=> setPassword(e.target.value)}
                        /> */}
                  <label>Telefone:</label>
                  <input type="text" placeholder={telefone}
                    onKeyUp={maskNumber} onChange={(e) => setTelefone(e.target.value)}
                  /><br></br>
                  <label>CPF / Matricula:</label>
                  <input type="text" placeholder={matricula}
                    onKeyUp={maskCpf} onChange={(e) => setMatricula(e.target.value)}
                  />

                  <label htmlFor="foto">Trocar foto:</label>
                  <div className="wrapper-btn-trocar-foto">
                    <label id="trocar-foto" htmlFor="anexo-arquivo" className="label-foto">
                      Selecionar foto
                    </label>
                  </div>
                  <input
                    type="file"
                    id="anexo-arquivo"
                    required
                    onChange={onChangeIcon}
                  />

                  <label>Cargo:</label>
                  <select
                    onChange={(e) => setCargo(e.target.value)}
                  >
                    <option selected>{cargo}</option>
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
                <div className='modal-row'>
                  <label>Superior:</label>
                  <input type="text" placeholder={nomeSuperior}
                    onChange={(e) => setNomeSuperior(e.target.value)}

                  />
                  <label>EmailSuperior:</label>
                  <input type="text" placeholder={emailSuperior}
                    onChange={(e) => setEmailSuperior(e.target.value)}
                  /><br></br>
                  <label>TelefoneSuperior:</label>
                  <input type="text" placeholder={telefoneSuperior}
                    onKeyUp={maskNumber} onChange={(e) => setTelefoneSuperior(e.target.value)}
                  />

                  {/* --- Setor --- */}

                  <label>Setor:</label>
                  <select
                    onChange={(e) => setSetor(e.target.value)}
                  >
                    <option selected>{setor}</option>
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
                  </select>
                  <br />
                  <label>Alterar Senha:</label>
                  <div className="btn-alterar-senha">
                    <a href="/Esqueci-senha"> Alterar Senha</a>
                  </div>
                </div>
              </div>
              <div>
                <input type='submit' value='Confirmar' className="modal-button" />
                <input type="button" value='Cancelar' className="modal-button" onClick={userCad} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}