import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dimmer, Header, Menu } from 'semantic-ui-react';
import roleNames from '../../../utils/permissionLevel';
import StoreContext from '../../store/Context';

const ItemMenu = ( { path, input } ) => {
    const { setRole, setToken, setUsuario, setCarrinho } = useContext( StoreContext );
    const [ activeDimmer, setActiveDimmer ] = useState( false );
    const history = useHistory();

    useEffect( () => {
        console.log( "dimmer: ", activeDimmer );
    }, [ activeDimmer ] );

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
        return history.push( path );
    }

    return (
        <>
            <Menu.Item onClick={ onClick }>
                <Header as='h1'>{ input }</Header>
            </Menu.Item>
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Logout realizado com sucesso!</Header>
            </Dimmer>
        </>
    );
}

export default ItemMenu;
