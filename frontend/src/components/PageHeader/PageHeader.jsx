import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import roleNames from '../../utils/permissionLevel';
import StoreContext from '../store/Context';
import MenuItemCustom from './MenuItemCustom';

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
            <MenuItemCustom path='/' input='Loja' />
            <MenuItemCustom path='/perfil' input='Usuário' />
            <MenuItemCustom path='/gerenciar' input='Admin' />
            <MenuItemCustom path={ menuPathLogin() } input={ menuInputLogin() } />
        </Menu>
    );
}

export default PageHeader;
