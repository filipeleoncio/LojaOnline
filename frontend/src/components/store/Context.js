import { createContext } from 'react';
import roleNames from '../../utils/permissionLevel';

const StoreContext = createContext( {
    usuario: null,
    setUsuario: () => { },
    token: null,
    setToken: () => { },
    role: roleNames.DEFAULT,
    setRole: () => { },
    produtos: [],
    setProdutos: () => { },
    carrinho: [],
    setCarrinho: () => { },
    listaDesejos: [],
    setListaDesejos: () => { },
    logoutRealizado: false,
    setLogoutRealizado: () => { },
} );

export default StoreContext;
