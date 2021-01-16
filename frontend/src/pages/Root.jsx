//import logo from './logo.svg';
//import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import StoreProvider from '../components/store/Provider';
import RoutesPrivate from '../components/Routes/Private/Private'
import Home from './Home/Home';
import Login from './Login/Login';
import Management from './Management/Management';
import Profile from './Profile/Profile'
import AccessDenied from './AccessDenied/AccessDenied'
// import AccessDenied from './AccessDenied/AccessDenied'
import roleNames from '../utils/permissionLevel';
import { Cadastro } from './Cadastro/Cadastro';
import Carrinho from './Carrinho/Carrinho';

const PagesRoot = () => (
    <Router>
        <StoreProvider>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/accessdenied" component={ AccessDenied } />
                <RoutesPrivate requiredRole={ roleNames.DEFAULT } path="/" exact={ true } component={ Home } />
                <RoutesPrivate requiredRole={ roleNames.DEFAULT } path="/cadastro" component={ Cadastro } />
                <RoutesPrivate requiredRole={ roleNames.USER } path="/perfil" exact={ true } component={ Profile } />
                <RoutesPrivate requiredRole={ roleNames.USER } path="/perfil/carrinho" component={ Carrinho } />
                <RoutesPrivate requiredRole={ roleNames.ADMIN } path="/gerenciar" component={ Management } />
            </Switch>
        </StoreProvider>
    </Router>
)

export default PagesRoot;