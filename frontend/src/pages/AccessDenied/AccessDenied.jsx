import React from 'react'
import { PageCenter } from '../../components/PageCenter/PageCenter';
import { Header } from 'semantic-ui-react';
import { PageHeader } from '../../components/PageHeader/PageHeader';

const PagesAccessDenied = () => {
    // const { setToken } = useContext( StoreContext );
    // const history = useHistory();

    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Acesso Negado</Header>
            <Header as='h3' textAlign='center'>Você não tem permissão para acessar essa página</Header>
        </PageCenter>
    );
}

export default PagesAccessDenied;
