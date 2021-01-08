import React from 'react'
// import StoreContext from '../../components/store/Context'
import { useHistory } from 'react-router-dom';
import { PageCenter } from '../../components/PageCenter/PageCenter';
import { Button, Header } from 'semantic-ui-react';

// function PagesProfile () {
//     const { setToken } = useContext( StoreContext );
//     const history = useHistory();

//     function onSubmitHome () {
//         return history.push( '/' );
//     }

//     return (
//         <div>
//             <h1>Pagina do Usuario</h1>
//             <button type="submit" onClick={ onSubmitHome }>Pagina inicial</button>
//         </div>
//     );
// }

const PagesProfile = () => {
    // const { setToken } = useContext( StoreContext );
    const history = useHistory();

    function onSubmitHome () {
        return history.push( '/' );
    }

    return (
        <PageCenter>
            <Header>Pagina do Usuario</Header>
            <Button onClick={ onSubmitHome }>Pagina inicial</Button>
        </PageCenter>
    );
}

export default PagesProfile;
