import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import roleNames from '../../utils/permissionLevel';
import StoreContext from '../store/Context';

export const MenuItemCustom = ( { path, input } ) => {
    const { setRole, setToken, setCarrinho, setLogoutRealizado } = useContext( StoreContext );
    const history = useHistory();

    function onClick () {
        if ( input === 'Logout' ) {
            setToken( null );
            setRole( roleNames.DEFAULT );
            setCarrinho( [] );
            setLogoutRealizado( true );
        }
        return history.push( path );
    }

    return (
        <Menu.Item onClick={ onClick }>
            <Header as='h1'>{ input }</Header>
        </Menu.Item>
    );
}
