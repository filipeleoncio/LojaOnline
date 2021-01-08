import React from 'react'
// import StoreContext from '../../components/store/Context'
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import { PageCenter } from '../../components/PageCenter/PageCenter'

// function PagesManagement () {
const PagesManagement = () => {
    // const { setToken } = useContext( StoreContext );
    const history = useHistory();

    function onSubmit () {
        return history.push( '/' );
    }

    function onSubmitCadastro () {
        return history.push( '/cadastro' );
    }

    return (
        <PageCenter>
            <Header>Pagina de gerenciamento</Header>
            <Button onClick={ onSubmitCadastro }>Cadastrar Usuário</Button>
            <Button onClick={ onSubmit }>Pagina inicial</Button>
        </PageCenter >
    );
}
export default PagesManagement;
