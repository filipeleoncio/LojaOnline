import React from 'react';
import { Header } from 'semantic-ui-react';
import { CarrinhoCompras } from '../../components/CarrinhoCompras/CarrinhoCompras';
import { PageCenter } from '../../components/PageCenter/PageCenter';
import { PageHeader } from '../../components/PageHeader/PageHeader';

const PagesCarrinho = () => {
    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Carrinho</Header>
            <CarrinhoCompras />
        </PageCenter>
    );
}

export default PagesCarrinho;
