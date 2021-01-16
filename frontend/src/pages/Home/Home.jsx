import React, { useContext, useEffect } from 'react'
import StoreContext from '../../components/store/Context'
import { Header } from 'semantic-ui-react'
import './Home.css';
import axios from 'axios';
import { Api } from '../../utils/apiData'
import { CompProduto } from '../../components/Produto/CompProduto'
import { PageCenter } from '../../components/PageCenter/PageCenter'
import { PageHeader } from '../../components/PageHeader/PageHeader';
import Produto from '../../classes/Produto'
// import { CarrinhoCompras } from '../../components/CarrinhoCompras/CarrinhoCompras';

const PagesHome = () => {
    const { setProdutos } = useContext( StoreContext );


    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get( Api.url + Api.produto );
                const resProdutos = res.data;
                // console.log( listaProdutos );
                const listaProdutos = resProdutos.map( ( produto ) => {
                    const prodObj = new Produto(
                        produto.id,
                        produto.nome,
                        produto.preco,
                        produto.imgSrc,
                        produto.descricao,
                        produto.quantidade
                    );
                    return prodObj;
                } );

                // setProdutos( res.data );
                setProdutos( listaProdutos );
            }
            catch ( err ) {
                const error = 'Erro app -> buscandoProdutos; Erro: ' + err;
                console.log( error );
                throw err;
            }
        };
        fetchData();
    }, [ setProdutos ] );

    return (
        <PageCenter>
            <PageHeader />
            <Header className='homeTitle' as="h1">Loja</Header>
            <CompProduto />
        </PageCenter>
    );
}
export default PagesHome;
