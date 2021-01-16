import React, { useContext } from 'react';
import { Button, Grid, GridColumn, GridRow, Item, Image } from 'semantic-ui-react';
import Produto from '../../classes/Produto';
import roleNames from '../../utils/permissionLevel';
import { If } from '../If/If';
import StoreContext from '../store/Context';
import './CompProduto.css';
// import Produto from '../../classes/Produto'

export const CompProduto = () => {
    const { carrinho, setCarrinho } = useContext( StoreContext );
    const { role, produtos } = useContext( StoreContext );


    function onClick ( prod ) {
        // console.log( "event: ", event.produto );

        // console.log( produtos );
        const prodEscolhido = produtos.find( ( produto ) => produto.id === prod.id );

        const produtoInserido = new Produto(
            prodEscolhido.id,
            prodEscolhido.nome,
            prodEscolhido.preco,
            prodEscolhido.imagem,
            prodEscolhido.descricao,
            prodEscolhido.quantidade
        );

        if ( carrinho.length > 0 ) {
            const produtoJaNoCarrinho = carrinho.find( ( produto ) => produto.id === prodEscolhido.id );
            if ( produtoJaNoCarrinho ) {
                produtoJaNoCarrinho.incrementaNoCarrinho();
                // console.log( "Produto no carrinho", produtoJaNoCarrinho );
                //replicar o Produto pois se nao ao adicionar o carrrinho, o produto vai ser modificado na loja
                setCarrinho( [ ...carrinho ] );
            }
            else {
                produtoInserido.incrementaNoCarrinho();
                setCarrinho( [ ...carrinho, produtoInserido ] );
            }
        }
        else {
            produtoInserido.incrementaNoCarrinho();
            setCarrinho( [ ...carrinho, produtoInserido ] );
        }


        console.log( "Carrinho(produtos)", carrinho );
    }

    if ( produtos ) {
        return (
            <Grid >
                { produtos.map( ( prod, index ) => (
                    <GridRow key={ index }>
                        <GridColumn width={ 3 }>
                            <Image src={ prod.imagem } fluid />
                        </GridColumn>
                        <GridColumn width={ 8 }>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header>{ prod.nome }</Item.Header>
                                        <Item.Description>{ prod.descricao }</Item.Description>
                                        <Item.Meta>Preço: { prod.preco }</Item.Meta>
                                        <Item.Extra>Quantidade disponível: { prod.quantidade }</Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </GridColumn>
                        <If condition={ role >= roleNames.USER }>
                            <GridColumn width={ 5 }>
                                {/* <Button onClick={ onClick } produto={ prod }>Adicionar ao carrinho</Button> */ }
                                <Button onClick={ () => onClick( prod ) } >Adicionar ao carrinho</Button>
                            </GridColumn>
                        </If>
                    </GridRow>
                ) )
                }
            </Grid >
        )
    }
    return null;
}
