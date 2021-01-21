import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, GridColumn, Item, Image } from 'semantic-ui-react';
import Produto from '../../classes/Produto';
import { Api } from '../../utils/apiData';
import { imgBase } from '../../utils/imgBase';
import BotoesLoja from '../BotoesLoja/BotoesLoja';
import ItemDimmer from '../ItemDimmer/ItemDimmer';
import StoreContext from '../store/Context';

const ListaDesejosComponent = () => {
    const [ itemDimmer, setItemDimmer ] = useState( [] );
    const [ listaDesejos, setListaDesejos ] = useState( [] );
    const [ update, setUpdate ] = useState( false );
    const { usuario, produtos, carrinho, setCarrinho } = useContext( StoreContext );

    useEffect( () => {
        /**
         * @Summary Busca os produtos no banco e seta a variavel
         * responsável pelo dimmer de cada item da lista de desejos
         */
        const fetchData = async () => {
            try {
                const res = await axios.get( Api.url + Api.listaDesejos );
                const resDesejos = res.data;
                let itens = [];
                const listaDesejos = resDesejos.map( ( produto ) => {

                    const prodObj = new Produto(
                        produto.id,
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
                setListaDesejos( listaDesejos );
                setItemDimmer( itens );
                setUpdate( false );
            }
            catch ( err ) {
                const error = 'Erro app -> buscandoListaDesejos; Erro: ' + err;
                console.log( error );
                throw err;
            }
        };
        fetchData();
    }, [ listaDesejos, update ] );

    /**
     * @Summary Atualiza o dimmer do item na lista de desejos de acordo com o status
     * @param id Id do item na lista de desejos
     * @param status Novo status do dimmer
     */
    function handleDimmer ( id, status ) {
        if ( itemDimmer.length > 0 ) {
            itemDimmer.find( ( item ) => item.id === id ).res = status;
            setItemDimmer( [ ...itemDimmer ] );
        }
    }

    /**
     * @Summary Retorna o status do dimmer do item na lista de desejos
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

    /**
     * @Sumamry Remove o produto da lista de desejos
     * @param prod Produto a ser removido
     */
    async function removeProdutoListaDesejos ( prod ) {
        try {
            await axios.put( Api.url + Api.listaDesejos( usuario.userName ), prod );
            setUpdate( true );
        }
        catch ( err ) {
            const error = 'Erro app -> removeProdutoListaDesejos; Erro: ' + err;
            console.log( error );
            throw err;
        }
    }

    if ( listaDesejos ) {
        return (
            <Grid>
                {listaDesejos.map( ( prod, index ) => (
                    <ItemDimmer key={ index }
                        isDimmed={ getIsDimmerAssociado( prod.id ) }
                        handleDimmer={ handleDimmer }
                        listItem={ prod } list={ listaDesejos } setList={ setListaDesejos }
                        remocaoProduto={ removeProdutoListaDesejos }
                        headerMessage={ `Deseja remover ${ prod.nome } da lista de desejos` }
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
                                handleDimmer={ handleDimmer }
                                prod={ prod }
                            />
                        </GridColumn>
                    </ItemDimmer>

                ) ) }
            </Grid>
        );
    }
    return null;

}
export default ListaDesejosComponent;
