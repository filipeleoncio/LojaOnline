import React, { useContext } from 'react';
import { Grid, GridColumn, GridRow, Header, Item, Image, Button } from 'semantic-ui-react';
import StoreContext from '../store/Context';
import './CarrinhoCompras.css';

const CarrinhoCompras = () => {
    const { carrinho, setCarrinho } = useContext( StoreContext );

    function onButtonClick ( op, item ) {
        item.atualizaCarrinho( op );
        setCarrinho( [ ...carrinho ] );
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
                                <Header as='h4'>Quantidade</Header>
                                <Grid>
                                    <GridRow verticalAlign='middle' className='boxQuantidade'>
                                        <GridColumn width={ 6 }>
                                            <img fluid onClick={ () => onButtonClick( 'subtrair', carrinhoItem ) } src='https://image.flaticon.com/icons/png/512/7/7659.png' alt='button' />
                                        </GridColumn>
                                        <GridColumn width={ 4 }>
                                            <Header as='h3'> { carrinhoItem.qtdCarrinho }</Header>
                                        </GridColumn>
                                        <GridColumn width={ 6 }>
                                            <img fluid onClick={ () => onButtonClick( 'somar', carrinhoItem ) } src='https://img2.gratispng.com/20180318/jqe/kisspng-computer-icons-clip-art-underline-swirl-5aae745e406ca3.6560336815213824942639.jpg' alt='button' />
                                        </GridColumn>
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
            </Grid>
        );
    }
    return (
        <Header as='h1' textAlign='center' color='blue'>Seu Carrinho esta Vazio!</Header>
    );
};

export default CarrinhoCompras;
