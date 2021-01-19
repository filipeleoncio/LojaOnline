import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../components/store/Context';
import { Dimmer, Header } from 'semantic-ui-react';
import './Home.css';
import axios from 'axios';
import { Api } from '../../utils/apiData';
import CompProduto from '../../components/Produto/CompProduto';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';
import Produto from '../../classes/Produto';
import { timeout } from '../../utils/timeout';

const imgBase = 'data:image/jpeg;base64,';

const PagesHome = () => {
    const { setProdutos, logoutRealizado, setLogoutRealizado } = useContext( StoreContext );
    const [ activeDimmer, setActiveDimmer ] = useState( false );

    useEffect( () => {
        /**
         * @Summary Ativa o Dimmer caso o usuário efetue o Logout
         */
        async function setDimmer () {
            if ( logoutRealizado ) {
                setActiveDimmer( true );
                await timeout( 1000 );
                setActiveDimmer( false );
                setLogoutRealizado( false );
            }
        }

        setDimmer();
    }, [ logoutRealizado, setLogoutRealizado ] );

    useEffect( () => {
        /**
         * @Summary Busca os produtos no banco
         */
        const fetchData = async () => {
            try {
                const res = await axios.get( Api.url + Api.produto );
                const resProdutos = res.data;
                const listaProdutos = resProdutos.map( ( produto ) => {
                    const prodObj = new Produto(
                        produto.id,
                        produto.nome,
                        produto.preco,
                        imgBase + produto.file,
                        produto.descricao,
                        produto.quantidade
                    );
                    return prodObj;
                } );
                setProdutos( listaProdutos );
            }
            catch ( err ) {
                const error = 'Erro app -> buscandoProdutos; Erro: ' + err;
                console.log( error );
                throw err;
            }
        };
        fetchData();
    } );

    return (
        <div>
            <PageCenter>
                <PageHeader />
                <Header className='homeTitle' as="h1">Loja</Header>
                <CompProduto />
            </PageCenter>
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Logout realizado com sucesso!</Header>
            </Dimmer>
        </div>
    );
}
export default PagesHome;
