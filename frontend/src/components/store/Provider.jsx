import React from 'react';
import Context from './Context';
import useStorage from '../../utils/useStorage';

const StoreProvider = ( { children } ) => {
    const [ token, setToken ] = useStorage( 'token' );
    const [ role, setRole ] = useStorage( 'role' );
    const [ usuario, setUsuario ] = useStorage( 'usuario' );
    const [ produtos, setProdutos ] = useStorage( 'produtos' );
    const [ carrinho, setCarrinho ] = useStorage( 'carrinho' );
    const [ logoutRealizado, setLogoutRealizado ] = useStorage( 'logoutRealizado' );

    return (
        <Context.Provider
            value={ {
                token,
                setToken,
                role,
                setRole,
                usuario,
                setUsuario,
                produtos,
                setProdutos,
                carrinho,
                setCarrinho,
                logoutRealizado,
                setLogoutRealizado,
            } }
        >
            {children }
        </Context.Provider>
    )

}

export default StoreProvider;
