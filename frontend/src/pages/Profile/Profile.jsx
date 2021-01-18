import React from 'react';
import { useHistory } from 'react-router-dom';
import PageCenter from '../../components/PageCenter/PageCenter';
import { Button, Header } from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader/PageHeader';

const PagesProfile = () => {
    const history = useHistory();

    function onButtonClick () {
        return history.push( '/perfil/carrinho' );
    }

    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Pagina do Usuario</Header>
            <Button onClick={ onButtonClick }>Carrinho de Compras</Button>
        </PageCenter>
    );
}

export default PagesProfile;
