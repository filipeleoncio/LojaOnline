import React, { useContext, useEffect, useState } from 'react';
import StoreContext from '../../components/store/Context';
import { Dimmer, Header } from 'semantic-ui-react';
import './Home.css';
import CompProduto from '../../components/Produto/CompProduto';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';
import { timeout } from '../../utils/timeout';

const PagesHome = () => {
    const { logoutRealizado, setLogoutRealizado } = useContext( StoreContext );
    const [ activeDimmer, setActiveDimmer ] = useState( false );

    useEffect( () => {
        /**
         * @Summary Ativa o Dimmer caso o usuário efetue o Logout
         */
        async function setDimmer () {
            if ( logoutRealizado ) {
                setActiveDimmer( true );
                await timeout( 1000 );
                setActiveDimmer( false );
                setLogoutRealizado( false );
            }
        }
        setDimmer();
    }, [ logoutRealizado, setLogoutRealizado ] );

    return (
        <div>
            <PageCenter>
                <PageHeader />
                <Header className='homeTitle' as="h1">Loja</Header>
                <CompProduto />
            </PageCenter>
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Logout realizado com sucesso!</Header>
            </Dimmer>
        </div>
    );
}
export default PagesHome;
