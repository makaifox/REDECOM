import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext'

import Login from './pages/Login';
import Metricas from './pages/Metricas';
import Home from './pages/Home';
import Formulario from './pages/Formulario';
import EsqueciSenha from './pages/EsqueciSenha';
import Cadastro from './pages/Cadastro';
import MeuPainel from './pages/MeuPainel';
import UserList from './pages/UserList';
import ChatRoom from './pages/ChatRoom';


export default function Routes(){
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/metricas" component={Metricas} />
                    <Route path="/login" component={Login}/>
                    <Route path="/formulario" component={Formulario} />
                    <Route path="/esqueci-senha" component={EsqueciSenha} />
                    <Route path="/cadastro" component={Cadastro} />
                    <Route path="/Meu-painel" component={MeuPainel}/>
                    <Route path="/listadeusuarios" component={UserList}/>
                    <Route path="/rooms/:id" component={ChatRoom} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}
