import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import roleNames from '../../utils/permissionLevel';
import { If } from '../If/If';
import StoreContext from '../store/Context';
import './BotoesLoja.css'

const BotoesLoja = ( { adicionaCarrinho, adicionaListaDesejos, handleDimmer, prod } ) => {
    const { role } = useContext( StoreContext );

    return (
        <div>
            <If condition={ role === roleNames.USER }>
                <If condition={ prod.quantidade > 0 }>
                    <Button className='buttonsDisplay1' onClick={ () => adicionaCarrinho( prod ) } >Adicionar ao carrinho</Button>
                </If>
                <Button className='buttonsDisplay2' onClick={ () => adicionaListaDesejos( prod ) } >Adicionar a lista de desejos</Button>
            </If>
            <If condition={ role === roleNames.ADMIN }>
                {/* <Button className='buttonsDisplay1' onClick={ () => adicionaCarrinho( prod ) } >Adicionar ao carrinho</Button> */ }
                <Button className='buttonsDisplay2' onClick={ () => handleDimmer( prod.id, true ) } >Remover Produto</Button>
            </If>
        </div>
    );
}

export default BotoesLoja;
