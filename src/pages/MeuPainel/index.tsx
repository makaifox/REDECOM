import './styles.css';
import './querie.css';
import {useAuth} from '../../hooks/useAuth';

import {Header} from "../../components/Header"
import {PainelAdmin} from "../../components/PainelAdmin"
import {PainelUsuario} from "../../components/PainelUsuario"
import {PainelGestor} from "../../components/PainelGestor"
import {PainelFuncionario} from "../../components/PainelFunc"

export default () => {
    const {user} = useAuth();
    if(user !== null){
        // verificando tipo de usuario
        switch(user?.userType){
    
            // Retornando painel do Administrador
            case 'Administrador':
            return(<PainelAdmin/>)
             
            // Retornando painel do Administrador
             case 'Gestor':
                return(<PainelGestor/>)

            // Retornando painel do usuario
            case 'Usuario':
                return(<PainelUsuario/>)
            
            case 'Mídia Social':
                return(<PainelFuncionario/>)
            case 'Assessoria de Imprensa':
                return(<PainelFuncionario/>)
            case 'Desenvolvimento Web e T.I.':
                 return(<PainelFuncionario/>)
            case 'Fotografia':
                return(<PainelFuncionario/>)
            case 'Impressão em Papel':
                    return(<PainelFuncionario/>)
            case 'Marketing':
                    return(<PainelFuncionario/>)
            case 'Vídeo':
                return(<PainelFuncionario/>)
            }
    
    }
    return(
        <></>
    )
}