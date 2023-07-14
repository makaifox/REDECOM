import firebase from "../../services/firebase"
import database from "../../services/database"

export default{

// =================== Funções do Formulario ===============
    registerFormInBank: async(
      assuntotxt:string,
      necessidade:string[],
      data:string,
      cep:string,
      horario:string,
      rua:string,
      numero:string,
      bairro:string,
      cidade:string,
      personalidade:string,
      persoNome:string,
      descrevaMelhor:string,
      concordar:boolean,
      userId:string| undefined,
      user:any,
      setErrorMsg:Function,
      file?:any,
    )=>{
      let current = new Date();
      let year = current.getFullYear();
      let day:any = current.getDate() > 10 ? current.getDate():`0${current.getDate()}`;
      let mm:number|string = current.getMonth() > 10 ? current.getMonth() +1:`0${current.getMonth()+1}`;
      let hour:number|string = current.getHours() > 10 ? current.getHours():`0${current.getHours()}`;
      let mil:number|string = current.getMilliseconds() > 10 ? current.getMilliseconds():`0${current.getMilliseconds()}`;
      let requestVal:number;
      

      // Criando protocolo com base na data e hora do envio 
          const timeProtocol = () => {
            // gerando numero aleatorio
            let num:number|string = Math.floor(Math.random() * 10);
              let sum = `${year}${mm}${day}${hour}${mil}${num}`;
              return sum;
          } 
          const protocolo = timeProtocol();
          
          
          // Verificando se o usuario concorda
          if(concordar === false){
            setErrorMsg('Necessario concordar com a metodologia');
            return;
          }

          // salvando dados do Formulario no Banco
          await firebase.database().ref(`Demandas/${userId}/${protocolo}`).set({
            authorName:user?.name,
            assunto:assuntotxt,
            necessidade:necessidade,
            concluidos:'',
            data:data,
            horario:horario,
            cep:cep,
            rua:rua,
            numero:numero,
            bairro:bairro,
            cidade:cidade,
            personalidade:personalidade,
            persoNome:persoNome,
            descrevaMelhor:descrevaMelhor,
            progresso:"Em andamento",
            protocolo:protocolo,
            authorId:userId,
            anexo:`${protocolo}.${file.name.split('.').pop()}`,
          }).catch((err) => {return console.log(err)})

          // atualizando metricas
          necessidade.forEach(async function(item){
            await firebase.database().ref(`Metricas/${item}/${year}/${mm}`).get().then((snapshot)=>{
              requestVal = snapshot.val();
              requestVal++;
            }).catch((err)=>{return console.log(err)})
            await firebase.database().ref(`Metricas/${item}/${year}/${mm}`).set(requestVal).catch((err) =>{return console.log(err)})
          })


          // envio arquivos para o Banco de dados Nodejs   
          if(file !== undefined){
            const formData = new FormData();
          formData.append('file', file, `${protocolo}.${file.name.split('.').pop()}`);
  
          database.post('posts', formData);
          }

          // Criando sala no banco de dados
          await database.post('/room',{
            id:`${protocolo}`,
            author:`${userId}`,
          })
          .catch(function(error){console.log(error)})

          // Atualizando lista de usuarios da sala 
          await database.post('/add-new-user',{
            room_id:`${protocolo}`,
            user:`${userId}`,
            user_name:`${user.name}`,
            setor:`${user.userType}`,
            avatar:`${user.avatar}`
          })

    },

// ================= Funções das Demandas ==================
 changeRequestProgress: async(id:string|undefined,userId:string|undefined)=>{
    await firebase.database().ref(`Demandas/${userId}/${id}`).update({
      progresso:"Concluida",
    }).catch(function(){
      return
    })
 },

 // ======== Alterar do Usuario
     // Alterando dados no Banco
     changeUserRegistre:async(
      name:string,
      cargo:string,
      Email:string,
      password:string,
      EmailSuperior:string,
      Matricula:string,
      NomeSuperior:string,
      Setor:string,
      Telefone:string,
      TelefoneSuperior:string,
      Type:string,
      userId:string|undefined,
      file:any,
     )=>{
      await firebase.database().ref(`Cadastros/${userId}`).update({
          username:name,
          cargo:cargo,
          email:Email,
          emailSuperior:EmailSuperior,
          matricula:Matricula,
          nomeSuperior:NomeSuperior,
          setor:Setor,
          telefone:Telefone,
          telefoneSuperior:TelefoneSuperior,
          userType:Type,
      }).catch(function(){return})
      // atualizando email no auth()
    await firebase.auth().currentUser?.updateEmail(Email).then(()=>{
    }).catch(function(error){return console.log(error.code)})
    // atualizando senha no auth()
    await firebase.auth().currentUser?.updatePassword(password).then(()=>{
    }).catch(function(error){return console.log(error.code)})

    const data: any = file;
    await firebase.storage().ref().child(`images/${userId}`).delete().catch(function(error){return console.log(error.code)})
    firebase.storage().ref().child(`images/${userId}`).put(data).catch(function(error){return console.log(error.code)})
  
  }, 

  // Funcoes do Chat

  // Envio de mensagem
  sendMessage: async(
    roomId: string,
    author:string,
    author_name:string| null,
    body:string,
  )=>{
    await database.post('/message',{
      room_id:`${roomId}`,
      author:`${author}`,
      author_name:`${author_name}`,
      body:`${body}`
    })
    .catch(function(error){console.log(error)})
  },

  addUserChat: async(
    room_id:string,
    user_id:string|undefined,
    user_name:string | null | undefined,
    user_avatar:string,
    user_type:string | null | undefined,
  )=>{
    await database.post('/add-new-user',{
      room_id:`${room_id}`,
      user:`${user_id}`,
      user_name:`${user_name}`,
      setor:`${user_type}`,
      avatar:`${user_avatar}`
    })
    .catch(function(error){console.log(error)})
  },

  // Fechamento de Sala
  endRoom: async(
    room_id:string,
    author:string,
    user:string | undefined,
    user_type:string | null | undefined,
    user_name:string | null | undefined,
    necessidade:string | null | undefined,
    concluido:any,
  )=>{
    // alterando setores concluidos no banco
    const dataRef = firebase.database().ref(`Demandas/${author}/${room_id}`)
    dataRef.update({
        concluidos:concluido,
    }).catch((err) => {return console.log(err)})

    // enviando mensagem no chat
    await database.post('/message',{
      room_id,
      author:`${user}`,
      author_name:`${user_name}`,
      body:`Demanda Finalizada por ${user_name} (${user_type}).`
    })
    .catch(function(error){console.log(error)})

    // fechando sala caso todos setores concluidos
    if((concluido.length) === necessidade?.length || user_type === 'Gestor'){
      await database.post('/room/ended',{
        room_id
      })
      .catch(function(error){console.log(error)}) 
    }
  },

  sendMessageFile: async(
    file:any,
    room_id:string,
    author:string,
    author_name:string | null,
  )=>{
    const data = new Date();
    const seconds = data.getSeconds();
      if(file !== undefined){
        const formData = new FormData();
        formData.append('file', file, `${room_id}${seconds}_${file.name}`);
        
        database.post('/message/storage', formData)
        .catch(function(error){console.log(error)})
      }
      await database.post('/message',{
        room_id:`${room_id}`,
        author:`${author}`,
        author_name:`${author_name}`,
        body:`${room_id}${seconds}_${file.name}`,
        type:'file'
      })
      .catch(function(error){console.log(error)})
    },

  getChatFile: async(body:string)=>{
     await database.get(`/files/chat/${body}`,{
       responseType:'blob',
     })
     .then(response => {
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a')
      a.style.display = 'none';
      a.href = url;
      a.download = `${body.split(`_`,-1).pop()}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
     })
     .catch(function (e){console.log(e)})
  },
  getRequestFile: async(body:string)=>{
    await database.get(`/files/request/${body}`,{
      responseType: 'blob',
    })
    .then(response =>{
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = body;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(function(e){console.log(e)})
  }
}
