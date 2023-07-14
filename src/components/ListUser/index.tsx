import { useState, FormEvent, useCallback } from "react"
import firebase from "../../services/firebase"
import { useAuth } from '../../hooks/useAuth';

type ListUserProps = {
  id: string;
  cargo: string;
  email: string;
  emailSuperior: string;
  userName: string;
  matricula: string;
  nomeSuperior: string;
  password: string;
  setor: string;
  telefone: string;
  telefoneSuperior: string;
  userType: string;
}

export function ListUser({
  id,
  cargo,
  email,
  emailSuperior,
  userName,
  matricula,
  nomeSuperior,
  password,
  setor,
  telefone,
  telefoneSuperior,
  userType,
}: ListUserProps) {
  const [viewUser, setViewUser] = useState(false);
  // dados usuario alterados 
  const [name, setName] = useState(userName)
  const [Email, setEmail] = useState(email)
  const [Avatar, setAvatar] = useState(setor)
  const [Telefone, setTelefone] = useState(telefone)
  const [Matricula, setMatricula] = useState(matricula)
  const [Setor, setSetor] = useState(setor)
  const [NomeSuperior, setNomeSuperior] = useState(nomeSuperior)
  const [EmailSuperior, setEmailSuperior] = useState(emailSuperior)
  const [TelefoneSuperior, setTelefoneSuperior] = useState(telefoneSuperior)
  const [Cargo, setCargo] = useState(cargo)
  const [Type, setType] = useState(userType)
  const { user } = useAuth();
  //Mostrando painel modal
  const viewUserData = () => {
    if (viewUser === false) {
      setViewUser(true);
    }
    else
      setViewUser(false);
  }
  // Alterando dados no Banco
  const changeUserRegistre = (event: FormEvent) => {
    const userId = id;
    event.preventDefault();
    firebase.database().ref(`Cadastros/${userId}`).update({
      username: name,
      cargo: Cargo,
      email: Email,
      emailSuperior: EmailSuperior,
      matricula: Matricula,
      nomeSuperior: NomeSuperior,
      setor: Setor,
      telefone: Telefone,
      telefoneSuperior: TelefoneSuperior,
      userType: Type,
    })

    // Fechando Modal
    setViewUser(false);
  }

  // Máscaras de input
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

  // Removendo Usuario do Banco
  const removeUser = () => {
    if (window.confirm('Tem certeza que deseja excluir este Usuario')) {
      const userId = id;
      firebase.database().ref(`Cadastros/${userId}`).remove()
      // Fechando Modal
      setViewUser(false);
    }
  }
  return (
    <>
      <div className="Request"
      >
        <div className='request-topic'>{userName}</div>
        <div className='request-topic'>{email}</div>
        <div className='request-topic'>{userType}</div>
        {user?.userType === 'Administrador' ?
          (
            <>
              <div className='request-topic'>
                <button
                  className='request-button'
                  onClick={viewUserData}>
                  Alterar Cadastro
                </button>
              </div>
            </>
          )
          :
          ""
        }

      </div>

      {/* Modal */}
      <div
        className='modal-wrapper'
        style={{ display: viewUser ? "block" : "none" }}
      >
        <div className='request-modal'>
          <div className='m-header'>
            <div>Usuario</div>
            <button onClick={viewUserData}>X</button>
          </div>
          <div className="m-main">
            <form onSubmit={changeUserRegistre}>
              <div className="flex-div">
                <div className='modal-row'>
                  <label>Nome:</label>
                  <input type="text" placeholder={userName}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Email:</label>
                  <input type="text" placeholder={email}
                    onChange={(e) => setEmail(e.target.value)}

                  /><br></br>
                  <label>Telefone:</label>
                  <input type="text" placeholder={telefone}
                    onKeyUp={maskNumber} onChange={(e) => setTelefone(e.target.value)}
                  /><br></br>
                  <label>Matricula:</label>
                  <input type="text" placeholder="**/***.***-**"
                    onKeyUp={maskMatricula} onChange={(e) => setMatricula(e.target.value)}
                  /><br></br>
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
                  <label>TipoUsuario:</label>
                  <select
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option selected>{userType}</option>
                    <option>Administrador</option>
                    <option >Gestor</option>
                    <option >Usuario</option>
                    <option >Mídia Social</option>
                    <option >Assessoria de Imprensa</option>
                    <option >Desenvolvimento Web e T.I.</option>
                    <option >Fotografia</option>
                    <option >Impressão em Papel</option>
                    <option >Marketing</option>
                    <option >Vídeo</option>
                  </select>

                  <label>Cpf:</label>
                  <input type="text" placeholder="***.***.***-**"
                    onKeyUp={maskCpf} onChange={(e) => setMatricula(e.target.value)}
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


                </div>
              </div>
              <div>
                <input type='submit' value='Confirmar' className="modal-button" />
                <input type="button" value='Excluir Usuario' className="modal-button" onClick={removeUser} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}