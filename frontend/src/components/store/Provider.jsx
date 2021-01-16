import React from 'react';
import Context from './Context';
import useStorage from '../../utils/useStorage'

const StoreProvider = ( { children } ) => {
    const [ token, setToken ] = useStorage( 'token' );
    const [ role, setRole ] = useStorage( 'role' );
    const [ produtos, setProdutos ] = useStorage( 'produtos' );
    const [ carrinho, setCarrinho ] = useStorage( 'carrinho' );
    return (
        <Context.Provider
            value={ {
                token,
                setToken,
                role,
                setRole,
                produtos,
                setProdutos,
                carrinho,
                setCarrinho,
            } }
        >
            {children }
        </Context.Provider>
    )

}

export default StoreProvider;
