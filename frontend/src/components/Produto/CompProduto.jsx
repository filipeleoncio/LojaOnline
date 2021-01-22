import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, GridColumn, Item, Image } from 'semantic-ui-react';
import Produto from '../../classes/Produto';
import { Api } from '../../utils/apiData';
import { imgBase } from '../../utils/imgBase';
import BotoesLoja from '../BotoesLoja/BotoesLoja';
import ItemDimmer from '../ItemDimmer/ItemDimmer';
import StoreContext from '../store/Context';
import './CompProduto.css';

const CompProduto = () => {
    const { carrinho, setCarrinho } = useContext( StoreContext );
    const { produtos, setProdutos } = useContext( StoreContext );
    const { usuario } = useContext( StoreContext );
    const [ itemDimmer, setItemDimmer ] = useState( [] );
    const [ update, setUpdate ] = useState( false );

    useEffect( () => {
        /**
         * @Summary Busca os produtos no banco e seta a variavel
         * responsável pelo dimmer de cada item da loja
         */
        const fetchDataProdutos = async () => {
            try {
                const res = await axios.get( Api.url + Api.produto );
                const resProdutos = res.data;
                let itens = [];
                const listaProdutos = resProdutos.map( ( produto ) => {

                    const prodObj = new Produto(
                        produto.produtoId,
                        produto.nome,
                        produto.preco,
                        imgBase + produto.file,
                        produto.descricao,
                        produto.quantidade
                    );
                    itens = [ ...itens, {
                        'id': produto.id,
                        'res': false
                    } ];
                    return prodObj;
                } );
                setProdutos( listaProdutos );
                setItemDimmer( itens );
                setUpdate( false );
            }
            catch ( err ) {
                const error = 'Erro app -> buscandoProdutos; Erro: ' + err;
                console.log( error );
                throw err;
            }
        };
        fetchDataProdutos();
    }, [ setProdutos, update ] );

    /**
     * @Summary Atualiza o dimmer do item na loja de acordo com o status
     * @param id Id do item na loja
     * @param status Novo status do dimmer
     */
    function handleDimmer ( id, status ) {
        if ( itemDimmer.length > 0 ) {
            itemDimmer.find( ( item ) => item.id === id ).res = status;
            setItemDimmer( [ ...itemDimmer ] );
        }
    }

    /**
     * @Summary Retorna o status do dimmer do item na loja
     * @param id Id do item equivalente
     */
    function getIsDimmerAssociado ( id ) {
        const item = itemDimmer.find( ( item ) => item.id === id );
        if ( item ) {
            return item.res;
        }
        return false;
    }


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

    async function adicionaListaDesejos ( prod ) {
        console.log( "antes da consulta" );
        console.log( "usuario: ", usuario );
        console.log( "username: ", usuario.userName );
        console.log( "produto: ", prod );

        let formData = new FormData();
        formData.append( 'username', usuario.userName );
        formData.append( 'produto', prod );
        let data = {
            'username': usuario.userName,
            'produto': {
                'produtoId': prod.id,
                'nome': prod.nome,
                'preco': prod.preco,
                'descricao': prod.descricao,
                'quantidade': prod.quantidade,
                'file': prod.getFile(),
            }
        }
        try {
            const res = await axios.post( Api.url + Api.atualizaListaDesejos, data );
            console.log( "adicionando produto: ", res );

        }
        catch ( err ) {
            const error = 'Erro app -> adicionaListaDesejos; Erro: ' + err;
            console.log( error );
            throw err;
        }
    }

    /**
     * @Sumamry Remove o produto da loja
     * @param prod Produto a ser removido
     */
    async function removeProduto ( prod ) {
        try {
            await axios.delete( Api.url + Api.deletaProduto( prod.id ) );
            setUpdate( true );
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
                    <ItemDimmer key={ index }
                        isDimmed={ getIsDimmerAssociado( prod.id ) }
                        handleDimmer={ handleDimmer }
                        listItem={ prod } prodList={ produtos } list={ carrinho } setList={ setCarrinho }
                        remocaoProduto={ removeProduto }
                        headerMessage={ `Deseja remover ${ prod.nome } da loja?` }
                    >
                        <GridColumn width={ 3 }>
                            <Image src={ prod.imagem } fluid />
                        </GridColumn>
                        <GridColumn width={ 9 }>
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
                        <GridColumn width={ 4 }>
                            <BotoesLoja
                                adicionaCarrinho={ adicionaCarrinho }
                                adicionaListaDesejos={ adicionaListaDesejos }
                                handleDimmer={ handleDimmer }
                                prod={ prod }
                            />
                        </GridColumn>
                    </ItemDimmer>
                ) )
                }
            </Grid >
        )
    }
    return null;
}

export default CompProduto;
