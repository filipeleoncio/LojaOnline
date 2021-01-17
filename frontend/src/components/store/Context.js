import { createContext } from 'react'
import roleNames from '../../utils/permissionLevel'

const StoreContext = createContext( {
    token: null,
    setToken: () => { },
    role: roleNames.DEFAULT,
    setRole: () => { },
    produtos: [],
    setProdutos: () => { },
    carrinho: [],
    setCarrinho: () => { },
    logoutRealizado: false,
    setLogoutRealizado: () => { },
} );

export default StoreContext;
