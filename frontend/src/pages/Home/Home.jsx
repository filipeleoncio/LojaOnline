import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../../components/store/Context'
import { useHistory } from 'react-router-dom';
import roleNames from '../../utils/permissionLevel';
import { Button, Header } from 'semantic-ui-react'
// import { If } from '../../components/If/If';
import './Home.css';
import axios from 'axios';
import { Api } from '../../utils/apiData'
import { Produto } from '../../components/Produto/Produto'
import { PageCenter } from '../../components/PageCenter/PageCenter'
import { PageHeader } from '../../components/PageHeader/PageHeader';

const PagesHome = () => {
    const { setToken, setRole } = useContext( StoreContext );
    const [ produtos, setProdutos ] = useState( [] );
    const history = useHistory();

    function onSubmitLogin () {
        // setToken( null );
        return history.push( '/login' );
    }

    function onSubmitUser () {
        return history.push( '/perfil' );
    }

    function onSubmitAdmin () {
        return history.push( '/gerenciar' );
    }

    function onSubmitHome () {
        setToken( null );
        setRole( roleNames.DEFAULT );
        return history.push( '/' );
    }

    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = await axios.get( Api.url + Api.produto );
                // console.log( res.data );
                setProdutos( res.data );
                // console.log( produtos );
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
            <Produto produtos={ produtos } />
        </PageCenter>
    );
}
export default PagesHome;
