import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, GridColumn, Item, Image, Header, Button } from 'semantic-ui-react';
import Produto from '../../../classes/Produto';
import { Api } from '../../../utils/apiData';
import { imgBase } from '../../../utils/imgBase';
import { If } from '../../../components/If/If';
import ItemDimmer from '../../../components/ItemDimmer/ItemDimmer';
import StoreContext from '../../../components/store/Context';
import exibePreco from '../../../utils/functions/exibePreco';

const ItensLista = () => {
    const [ itemDimmer, setItemDimmer ] = useState( [] );
    const { listaDesejos, setListaDesejos } = useContext( StoreContext );
    const [ update, setUpdate ] = useState( false );
    const { usuario, produtos, carrinho, setCarrinho } = useContext( StoreContext );

    useEffect( () => {
        /**
         * @Summary Busca os produtos no banco e seta a variavel
         * responsável pelo dimmer de cada item da lista de desejos
         */
        const fetchDataListaDesejos = async ( usuario ) => {
            try {
                const res = await axios.get( Api.url + Api.listaDesejos( usuario.userName ) );
                const resDesejos = res.data;
                let itens = [];
                const listaDesejos = resDesejos.map( ( produto ) => {

                    const prodObj = new Produto(
                        produto.produtoId,
                        produto.nome,
                        produto.preco,
                        imgBase + produto.file,
                        produto.descricao,
                        produto.quantidade
                    );
                    itens = [ ...itens, {
                        'id': produto.produtoId,
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
        fetchDataListaDesejos( usuario );
    }, [ setListaDesejos, update, usuario ] );

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

    /**
     * @Summary Adiciona um produto no carrinho
     * @param prod produto escolhido
     */
    function adicionaCarrinho ( prod ) {

        const prodEscolhido = produtos.find( ( produto ) => produto.id === prod.id );
        const qtdMax = prodEscolhido.quantidade;

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
                produtoJaNoCarrinho.incrementaNoCarrinho( qtdMax );
                setCarrinho( [ ...carrinho ] );
            }
            else {
                produtoInserido.incrementaNoCarrinho( qtdMax );
                setCarrinho( [ ...carrinho, produtoInserido ] );
            }
        }
        else {
            produtoInserido.incrementaNoCarrinho( qtdMax );
            setCarrinho( [ ...carrinho, produtoInserido ] );
        }
    }

    /**
     * @Sumamry Remove o produto da lista de desejos
     * @param prod Produto a ser removido
     */
    async function removeProdutoListaDesejos ( prod ) {
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
            await axios.put( Api.url + Api.atualizaListaDesejos, data );
            setUpdate( true );
        }
        catch ( err ) {
            const error = 'Erro app -> removeProdutoListaDesejos; Erro: ' + err;
            console.log( error );
            throw err;
        }
    }

    /**
     * @Summary Verifica se o produto escolhido está disponivel no estoque
     * @param prod produto escolhido
     */
    function produtoDisponivel ( prod ) {
        const produto = produtos.find( ( item ) => item.id === prod.id )
        if ( produto.quantidade > 0 )
            return true;
        return false;
    }

    if ( listaDesejos.length > 0 ) {
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
                                        <Item.Meta>Preço: { exibePreco( prod.preco ) }</Item.Meta>
                                        <Item.Extra>Quantidade disponível: { prod.quantidade }</Item.Extra>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </GridColumn>
                        <GridColumn width={ 4 }>
                            <If condition={ produtoDisponivel( prod ) }>
                                <Button className='buttonsDisplay1' onClick={ () => adicionaCarrinho( prod ) } >Adicionar ao carrinho</Button>
                            </If>
                            <Button className='buttonsDisplay2' onClick={ () => handleDimmer( prod.id, true ) } >Remover da Lista</Button>
                        </GridColumn>
                    </ItemDimmer>

                ) ) }
            </Grid>
        );
    }
    return (
        <Header as='h1' textAlign='center' color='blue'>Sua Lista de Desejos está Vazio!</Header>
    );

}
export default ItensLista;
