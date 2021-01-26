import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import PageCenter from '../../components/PageCenter/PageCenter'
import PageHeader from '../../components/PageHeader/PageHeader';

const PagesManagement = () => {
    const history = useHistory();

    /**
     * @Summary Lida com o clique dos botões
     * @param path caminho da página para qual sera redirecionado
     */
    function onButtonClick ( path ) {
        return history.push( path );
    }

    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Pagina de gerenciamento</Header>
            <Button onClick={ () => onButtonClick( '/cadastroUsuario' ) }>Cadastrar Usuário</Button>
            <Button onClick={ () => onButtonClick( '/cadastroProduto' ) }>Cadastrar Produto</Button>
        </PageCenter >
    );
}
export default PagesManagement;
