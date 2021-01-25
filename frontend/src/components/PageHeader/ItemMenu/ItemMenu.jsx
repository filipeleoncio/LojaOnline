import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import roleNames from '../../../utils/permissionLevel';
import StoreContext from '../../store/Context';

const ItemMenu = ( { path, input, setActiveDimmer } ) => {
    const { setRole, setToken, setUsuario, setCarrinho } = useContext( StoreContext );
    const history = useHistory();

    async function onClick () {
        if ( input === 'Logout' ) {
            setActiveDimmer( true );

            setTimeout( () => {
                setToken( null );
                setRole( roleNames.DEFAULT );
                setUsuario( null );
                setCarrinho( [] );
                setActiveDimmer( false );
                return history.push( path );
            }, 1000 );
        }
        else
            return history.push( path );
    }

    return (
        <Menu.Item onClick={ onClick }>
            <Header as='h1'>{ input }</Header>
        </Menu.Item>
    );
}

export default ItemMenu;
