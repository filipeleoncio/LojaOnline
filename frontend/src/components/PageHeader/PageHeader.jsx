import React, { useContext, useState } from 'react';
import { Dimmer, Header, Menu } from 'semantic-ui-react';
import roleNames from '../../utils/permissionLevel';
import StoreContext from '../store/Context';
import ItemMenu from './ItemMenu/ItemMenu';

const PageHeader = () => {
    const { role } = useContext( StoreContext );
    const [ activeDimmer, setActiveDimmer ] = useState( false );

    function menuPathLogin () {
        if ( role >= roleNames.USER )
            return '/';
        return '/login';
    }

    function menuInputLogin () {
        if ( role >= roleNames.USER )
            return 'Logout';
        return 'Login';
    }

    return (
        <>
            <Menu widths={ 4 }>
                <ItemMenu path='/' input='Loja' />
                <ItemMenu path='/perfil' input='Usuário' />
                <ItemMenu path='/gerenciar' input='Admin' />
                <ItemMenu path={ menuPathLogin() } input={ menuInputLogin() } setActiveDimmer={ setActiveDimmer } />
            </Menu>
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Logout realizado com sucesso!</Header>
            </Dimmer>
        </>
    );
}

export default PageHeader;
