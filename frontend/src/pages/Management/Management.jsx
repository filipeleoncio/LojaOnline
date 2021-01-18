import React from 'react';
// import StoreContext from '../../components/store/Context'
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import PageCenter from '../../components/PageCenter/PageCenter'
import PageHeader from '../../components/PageHeader/PageHeader';

const PagesManagement = () => {
    const history = useHistory();

    function onSubmit ( path ) {
        return history.push( path );
    }

    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Pagina de gerenciamento</Header>
            <Button onClick={ () => onSubmit( '/cadastro' ) }>Cadastrar Usuário</Button>
            <Button onClick={ () => onSubmit( '/cadastrarProduto' ) }>Cadastrar Produto</Button>
        </PageCenter >
    );
}
export default PagesManagement;
