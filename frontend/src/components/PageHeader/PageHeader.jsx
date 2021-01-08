import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import roleNames from '../../utils/permissionLevel';
import StoreContext from '../store/Context';
import { MenuItemCustom } from './MenuItemCustom';

export const PageHeader = () => {
    const { role } = useContext( StoreContext );
    // const history = useHistory();

    function menuPathLogin () {
        if ( role === roleNames.DEFAULT )
            return '/Login';
        return '/';
    }

    function menuInputLogin () {
        if ( role === roleNames.DEFAULT )
            return 'Login';
        return 'Logout';
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
