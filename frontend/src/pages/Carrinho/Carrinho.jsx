import React from 'react';
import { Header } from 'semantic-ui-react';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';
import ItensCarrinho from './ItensLista/ItensCarrinho';

const PagesCarrinho = () => {
    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Carrinho</Header>
            <ItensCarrinho />
        </PageCenter>
    );
}

export default PagesCarrinho;
