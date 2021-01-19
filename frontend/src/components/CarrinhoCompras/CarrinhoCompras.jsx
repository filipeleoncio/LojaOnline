import React, { useContext, useEffect, useState } from 'react';
import { Grid, GridColumn, GridRow, Header, Item, Image, Button, Dimmer } from 'semantic-ui-react';
import StoreContext from '../store/Context';
import './CarrinhoCompras.css';

const CarrinhoCompras = () => {
    const { carrinho, setCarrinho } = useContext( StoreContext );
    const [ itemDimmer, setItemDimmer ] = useState( [] );

    useEffect( () => {
        let itens = [];

        carrinho.forEach( ( carrinhoItem ) => {
            itens = [ ...itens, {
                'id': carrinhoItem.id,
                'res': false
            } ];
        } );

        // console.log( itens );

        setItemDimmer( itens );

    }, [ carrinho ] );

    function dimmedAssociado ( id ) {
        if ( itemDimmer.length <= 0 )
            return false;
        // console.log( "item ", id, ": ", itemDimmer.find( ( item ) => item.id === id ).res )
        return itemDimmer.find( ( item ) => item.id === id ).res;
    }

    function handleAtualiza ( op, item ) {
        item.atualizaCarrinho( op );
        setCarrinho( [ ...carrinho ] );
    }

    function handleRemoveItem ( item ) {
        setCarrinho( carrinho.slice( carrinho.indexOf( item, 1 ) ) );
    }

    function handleDimmer ( id, status ) {

        itemDimmer.find( ( item ) => item.id === id ).res = status;
        // console.log( itemDimmer.find( ( item ) => item.id === id ) );
        setItemDimmer( [ ...itemDimmer ] );
    }

    function finalizarPedido () {
        console.log( "Finalizar Pedido" );
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
                    <GridRow key={ index }>
                        {/* <Dimmer.Dimmable dimmed={ dimmedAssociado( carrinhoItem.id ) }> */ }
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
                                        <GridColumn width={ 6 }>
                                            <Image onClick={ () => handleAtualiza( 'subtrair', carrinhoItem ) } src='https://image.flaticon.com/icons/png/512/7/7659.png' alt='button' />
                                        </GridColumn>
                                        <GridColumn width={ 4 } className='noPadding'>
                                            <Header as='h3'> { carrinhoItem.qtdCarrinho }</Header>
                                        </GridColumn>
                                        <GridColumn width={ 6 }>
                                            <img onClick={ () => handleAtualiza( 'somar', carrinhoItem ) } src='https://img2.gratispng.com/20180318/jqe/kisspng-computer-icons-clip-art-underline-swirl-5aae745e406ca3.6560336815213824942639.jpg' alt='button' />
                                        </GridColumn>
                                    </GridRow>
                                    <GridRow>
                                        <Button size='tiny' fluid onClick={ () => handleDimmer( carrinhoItem.id, true ) } content='Remover Item' />
                                    </GridRow>
                                </Grid>
                            </div>
                        </GridColumn>
                        <GridColumn width={ 3 }>
                            <div className='centered'>
                                <Header as='h4'>Sub-Total</Header>
                                <Header as='h5'>R$: { carrinhoItem.preco * carrinhoItem.qtdCarrinho }</Header>
                            </div>
                        </GridColumn>
                        {/* <Dimmer active={ dimmedAssociado( carrinhoItem.id ) } onClickOutside={ () => handleDimmer( carrinhoItem.id, false ) }>
                                <Header as='h1'>Message</Header>
                            </Dimmer>
                        </Dimmer.Dimmable> */}
                    </GridRow>
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
        <Header as='h1' textAlign='center' color='blue'>Seu Carrinho esta Vazio!</Header>
    );
};

export default CarrinhoCompras;
