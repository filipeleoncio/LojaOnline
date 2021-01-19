import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Grid, GridColumn, GridRow, Item, Image } from 'semantic-ui-react';
import Produto from '../../classes/Produto';
import { Api } from '../../utils/apiData';
import roleNames from '../../utils/permissionLevel';
import { If } from '../If/If';
import StoreContext from '../store/Context';
import './CompProduto.css';

const CompProduto = () => {
    const { carrinho, setCarrinho } = useContext( StoreContext );
    const { role, produtos } = useContext( StoreContext );


    function adicionaCarrinho ( prod ) {

        const prodEscolhido = produtos.find( ( produto ) => produto.id === prod.id );

        /**
         * @Summary Produto escolhido pelo cliente a ser inserido no carrinho
         */
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
    }

    async function removeProduto ( prod ) {
        try {
            await axios.delete( Api.url + Api.deletaProduto( prod.id ) );
        }
        catch ( err ) {
            const error = 'Erro app -> removeProduto; Erro: ' + err;
            console.log( error );
            throw err;
        }
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
                        <GridColumn width={ 5 }>
                            <If condition={ role >= roleNames.USER }>
                                <Button className='buttonsDisplay1' onClick={ () => adicionaCarrinho( prod ) } >Adicionar ao carrinho</Button>
                            </If>
                            <If condition={ role >= roleNames.ADMIN }>
                                <Button className='buttonsDisplay2' onClick={ () => removeProduto( prod ) } >Remover Produto</Button>
                            </If>
                        </GridColumn>
                    </GridRow>
                ) )
                }
            </Grid >
        )
    }
    return null;
}

export default CompProduto;
