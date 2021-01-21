import React from 'react';
import { Header } from 'semantic-ui-react';
import ListaDesejosComponent from '../../components/ListaDesejosComponent/ListaDesejosComponent';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';

const PagesListaDesjeos = () => {
    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Lista de Desejos</Header>
            <ListaDesejosComponent />
        </PageCenter>

    );
}

export default PagesListaDesjeos;
