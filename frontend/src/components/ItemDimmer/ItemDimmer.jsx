import React from 'react';
import { Button, Dimmer, GridRow, Header } from 'semantic-ui-react';

const ItemDimmer = ( { children, isDimmed, handleDimmer, listItem, list, setList, remocaoProduto, headerMessage } ) => {

    /**
     * @Summary Remove o item do carrinho ou da loja
     */
    function handleRemoveItem () {
        if ( !remocaoProduto ) {
            list.splice( list.indexOf( listItem ), 1 );
            setList( [ ...list ] );
        }
        else {
            remocaoProduto( listItem );
            let carrinhoItem = list.find( ( itemCarrinho ) => itemCarrinho.id === listItem.id );
            list.splice( list.indexOf( carrinhoItem ), 1 );
            setList( [ ...list ] );
        }
    }

    return (
        <Dimmer.Dimmable as={ GridRow } dimmed={ isDimmed }>
            {children }
            <Dimmer active={ isDimmed } onClickOutside={ () => handleDimmer( listItem.id, false ) }>
                <Header inverted as='h2'>{ headerMessage }</Header>
                <Button onClick={ handleRemoveItem }>Sim</Button>
                <Button onClick={ () => handleDimmer( listItem.id, false ) }>Não</Button>
            </Dimmer>
        </Dimmer.Dimmable>
    );
}

export default ItemDimmer;
