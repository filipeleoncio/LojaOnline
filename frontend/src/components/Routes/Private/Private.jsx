import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import StoreContext from '../../store/Context'

const RoutesPrivate = ( { component: Component, requiredRole, path, ...rest } ) => {
    // const RoutesPrivate = ( { component: Component, ...rest } ) => {
    const { role, token } = useContext( StoreContext );
    console.log( "role: ", role );
    console.log( "requiredRole: ", requiredRole );
    console.log( "component: ", Component );
    console.log( "path:", path );
    console.log( "token: ", token );
    return (
        <Route { ...rest }
            // render={ () => token
            //     ? <Component { ...rest } />
            //     : <Redirect to="/Login" />
            // }
            render={ () => role >= requiredRole
                ? <Component { ...rest } />
                : <Redirect to="/AccessDenied" />
            }
        />
    )
}

export default RoutesPrivate;
