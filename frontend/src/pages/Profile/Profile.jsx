import React from 'react';
import { useHistory } from 'react-router-dom';
import PageCenter from '../../components/PageCenter/PageCenter';
import { Button, Header } from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader/PageHeader';

const PagesProfile = () => {
    const history = useHistory();

    function onButtonClick ( path ) {
        return history.push( path );
    }

    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Pagina do Usuario</Header>
            <Button onClick={ () => onButtonClick( '/perfil/carrinho' ) }>Carrinho de Compras</Button>
            <Button onClick={ () => onButtonClick( '/perfil/listaDesejos' ) }>Lista de Desejos</Button>

        </PageCenter>
    );
}

export default PagesProfile;
