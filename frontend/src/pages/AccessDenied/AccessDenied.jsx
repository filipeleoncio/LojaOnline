import React from 'react'
import { useHistory } from 'react-router-dom';
import { PageCenter } from '../../components/PageCenter/PageCenter';
import { Button, Header } from 'semantic-ui-react';

const PagesAccessDenied = () => {
    // const { setToken } = useContext( StoreContext );
    const history = useHistory();

    function onSubmitHome () {
        // setToken( null );
        return history.push( '/' );
    }

    function onSubmitLogin () {
        // setToken( null );
        return history.push( '/login' );
    }

    return (
        <PageCenter>
            <Header>Acesso Negado</Header>
            <Button onClick={ onSubmitHome }>Pagina inicial</Button>
            <Button onClick={ onSubmitLogin }>Pagina de Login</Button>
        </PageCenter>
    );
}

export default PagesAccessDenied;
