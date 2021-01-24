import React from 'react';
import { Header } from 'semantic-ui-react';
import './Loja.css';
import ItensLoja from './ItensLoja/ItensLoja';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';

const PagesHome = () => {
    return (
        <div>
            <PageCenter>
                <PageHeader />
                <Header className='homeTitle' as="h1">Loja</Header>
                <ItensLoja />
            </PageCenter>
        </div>
    );
}
export default PagesHome;
