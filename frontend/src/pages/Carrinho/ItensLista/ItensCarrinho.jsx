import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, GridColumn, GridRow, Header, Item, Image, Button } from 'semantic-ui-react';
import { Api } from '../../../utils/apiData';
import ItemDimmer from '../../../components/ItemDimmer/ItemDimmer';
import StoreContext from '../../../components/store/Context';
import './ItensCarrinho.css'

const ItensCarrinho = () => {
    const { carrinho, setCarrinho, produtos } = useContext( StoreContext );
    const [ itemDimmer, setItemDimmer ] = useState( [] );

    /**
     * @Summary Seta a variavel responsável
     * pelo dimmer de cada item do carrinho
     */
    useEffect( () => {
        let itens = [];
        carrinho.forEach( ( carrinhoItem ) => {
            itens = [ ...itens, {
                'id': carrinhoItem.id,
                'res': false
            } ];
        } );
        setItemDimmer( itens );
    }, [ carrinho ] );

    /**
     * @Summary Atualiza o dimmer do item no carrinho de acordo com o status
     * @param id Id do item no carrinho
     * @param status Novo status do dimmer
     */
    function handleDimmer ( id, status ) {
        if ( itemDimmer.length > 0 ) {
            itemDimmer.find( ( item ) => item.id === id ).res = status;
            setItemDimmer( [ ...itemDimmer ] );
        }
    }

    /**
     * @Summary Retorna o status do dimmer do item do carrinho
     * @param id Id do item equivalente
     */
    function getIsDimmerAssociado ( id ) {
        const item = itemDimmer.find( ( item ) => item.id === id );
        if ( item ) {
            return item.res;
        }
        return false;
    }

    /**
     * @Summary Atualiza a quantidade de cada produto no carrinho
     * @param op Operação a ser feita (Adição, subtração)
     * @param item Item a ser atualizado
     */
    function handleAtualiza ( op, item ) {
        let produtoLoja = produtos.find( ( prod ) => prod.id === item.id );
        let qtdMaxDisponivel = produtoLoja.quantidade;
        item.atualizaCarrinho( op, qtdMaxDisponivel );
        setCarrinho( [ ...carrinho ] );
    }

    async function finalizarPedido () {
        try {
            await axios.put( Api.url + Api.produto, carrinho );
        }
        catch ( err ) {
            const error = 'Erro app -> finalizarPedido; Erro: ' + err;
            console.log( error );
            throw err;
        }
        setCarrinho( [] );
    }

    function calculaTotal () {
        let total = 0;

        carrinho.forEach( ( item ) => {
            total += item.preco * item.qtdCarrinho;
        } );
        return total;
    }

    if ( carrinho.length > 0 ) {
        return (
            <Grid>
                { carrinho.map( ( carrinhoItem, index ) => (
                    <ItemDimmer key={ index }
                        isDimmed={ getIsDimmerAssociado( carrinhoItem.id ) }
                        handleDimmer={ handleDimmer }
                        listItem={ carrinhoItem } list={ carrinho } setList={ setCarrinho }
                        headerMessage={ `Deseja remover ${ carrinhoItem.nome } do carrinho?` }>
                        <GridColumn width={ 3 }>
                            <Image src={ carrinhoItem.imagem } />
                        </GridColumn>
                        <GridColumn width={ 7 }>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header>{ carrinhoItem.nome }</Item.Header>
                                        <Item.Description>{ carrinhoItem.descricao }</Item.Description>
                                        <Item.Meta>Preço: { carrinhoItem.preco }</Item.Meta>
                                        <Item.Extra>Quantidade disponível: { carrinhoItem.quantidade }</Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </GridColumn>
                        <GridColumn width={ 3 }>
                            <div className='centered'>
                                <Header as='h4' >Quantidade</Header>
                                <Grid>
                                    <GridRow verticalAlign='middle' className='boxQuantidade'>
                                        <GridColumn width={ 5 }>
                                            <Image onClick={ () => handleAtualiza( 'subtrair', carrinhoItem ) } src='https://image.flaticon.com/icons/png/512/7/7659.png' alt='button' />
                                        </GridColumn>
                                        <GridColumn width={ 6 } className='noPadding'>
                                            <Header as='h3'> { carrinhoItem.qtdCarrinho }</Header>
                                        </GridColumn>
                                        <GridColumn width={ 5 }>
                                            <Image onClick={ () => handleAtualiza( 'somar', carrinhoItem ) } src='https://img2.gratispng.com/20180318/jqe/kisspng-computer-icons-clip-art-underline-swirl-5aae745e406ca3.6560336815213824942639.jpg' alt='button' />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow>
                                        <Button fluid onClick={ () => handleDimmer( carrinhoItem.id, true ) } content='Remover Item' />
                                    </GridRow>
                                </Grid>
                            </div>
                        </GridColumn>
                        <GridColumn width={ 3 }>
                            <div className='centered'>
                                <Header as='h4'>Sub-Total</Header>
                                <Header as='h3' className='displaySubtotal'>R$: { carrinhoItem.preco * carrinhoItem.qtdCarrinho }</Header>
                            </div>
                        </GridColumn>
                    </ItemDimmer>
                ) )
                }
                <GridRow>
                    <GridColumn>
                        <Header textAlign='right' as='h1'>Total da Compra: R$ { calculaTotal() }</Header>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <Button fluid onClick={ finalizarPedido }>Finalizar Pedido</Button>
                    </GridColumn>
                </GridRow>
            </Grid >
        );
    }
    return (
        <Header as='h1' textAlign='center' color='blue'>Seu Carrinho está Vazio!</Header>
    );
};

export default ItensCarrinho;
