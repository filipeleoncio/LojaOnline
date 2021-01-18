import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from '../../store/Context';

const RoutesPrivate = ( { component: Component, requiredRole, path, ...rest } ) => {
    const { role } = useContext( StoreContext );
    return (
        <Route { ...rest }
            render={ () => role >= requiredRole
                ? <Component { ...rest } />
                : <Redirect to="/AccessDenied" />
            }
        />
    )
}

export default RoutesPrivate;
