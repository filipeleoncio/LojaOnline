import React from 'react'
// import StoreContext from '../../components/store/Context'
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import { PageCenter } from '../../components/PageCenter/PageCenter'
import { PageHeader } from '../../components/PageHeader/PageHeader';

// function PagesManagement () {
const PagesManagement = () => {
    // const { setToken } = useContext( StoreContext );
    const history = useHistory();

    function onSubmitCadastro () {
        return history.push( '/cadastro' );
    }

    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Pagina de gerenciamento</Header>
            <Button onClick={ onSubmitCadastro }>Cadastrar Usuário</Button>
        </PageCenter >
    );
}
export default PagesManagement;
