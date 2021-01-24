import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import roleNames from '../../utils/permissionLevel';
import StoreContext from '../store/Context';
import ItemMenu from './ItemMenu/ItemMenu';

const PageHeader = () => {
    const { role } = useContext( StoreContext );

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
        <Menu widths={ 4 }>
            <ItemMenu path='/' input='Loja' />
            <ItemMenu path='/perfil' input='Usuário' />
            <ItemMenu path='/gerenciar' input='Admin' />
            <ItemMenu path={ menuPathLogin() } input={ menuInputLogin() } />
        </Menu>
        ///dimmer
    );
}

export default PageHeader;
