import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import StoreProvider from '../components/store/Provider';
import RoutesPrivate from '../components/Routes/Private/Private'
import Login from './Login/Login';
import Management from './Management/Management';
import Profile from './Profile/Profile'
import AccessDenied from './AccessDenied/AccessDenied'
import roleNames from '../utils/permissionLevel';
import Cadastro from './CadastroUsuario/CadastroUsuario';
import Carrinho from './Carrinho/Carrinho';
import CadastroProduto from './CadastroProduto/CadastroProduto';
import ListaDesejos from './ListaDesejos/ListaDesejos';
import Loja from './Loja/Loja';

const PagesRoot = () => (
    <Router>
        <StoreProvider>
            <Switch>
                <Route path="/login" component={ Login } />
                <Route path="/accessdenied" component={ AccessDenied } />
                <Route path="/" exact={ true } component={ Loja } />
                <Route path="/loja" exact={ true } component={ Loja } />
                <Route path="/cadastroUsuario" exact={ true } component={ Cadastro } />
                <RoutesPrivate requiredRole={ roleNames.USER } path="/perfil" exact={ true } component={ Profile } />
                <RoutesPrivate requiredRole={ roleNames.USER } path="/perfil/carrinho" exact={ true } component={ Carrinho } />
                <RoutesPrivate requiredRole={ roleNames.USER } path="/perfil/listaDesejos" exact={ true } component={ ListaDesejos } />
                <RoutesPrivate requiredRole={ roleNames.ADMIN } path="/gerenciar" exact={ true } component={ Management } />
                <RoutesPrivate requiredRole={ roleNames.ADMIN } path="/cadastroProduto" exact={ true } component={ CadastroProduto } />
            </Switch>
        </StoreProvider>
    </Router>
)

export default PagesRoot;
