import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../components/store/Context';
import { Dimmer, Header } from 'semantic-ui-react';
import './Home.css';
import axios from 'axios';
import { Api } from '../../utils/apiData';
import { CompProduto } from '../../components/Produto/CompProduto';
import { PageCenter } from '../../components/PageCenter/PageCenter';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import Produto from '../../classes/Produto';
import { timeout } from '../../utils/timeout';
// import defaultImage from '../../images/defaultImage.jpg';

const PagesHome = () => {
    const { setProdutos, logoutRealizado, setLogoutRealizado } = useContext( StoreContext );
    const [ activeDimmer, setActiveDimmer ] = useState( false );

    useEffect( () => {
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
        <div>
            <PageCenter>
                <PageHeader />
                <Header className='homeTitle' as="h1">Loja</Header>
                <CompProduto />
                {/* <Image src={ defaultImage } /> */ }
            </PageCenter>
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Logout realizado com sucesso!</Header>
            </Dimmer>
        </div>
    );
}
export default PagesHome;
