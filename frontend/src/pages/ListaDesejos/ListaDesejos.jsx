import React from 'react';
import { Header } from 'semantic-ui-react';
import ItensLista from './ItensLista/ItensLista';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';

const PagesListaDesjeos = () => {
    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Lista de Desejos</Header>
            <ItensLista />
        </PageCenter>
    );
}

export default PagesListaDesjeos;
