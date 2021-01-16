import React from 'react'
// import StoreContext from '../../components/store/Context'
import { useHistory } from 'react-router-dom';
import { PageCenter } from '../../components/PageCenter/PageCenter';
import { Button, Header } from 'semantic-ui-react';
import { PageHeader } from '../../components/PageHeader/PageHeader';

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

    function onButtonClick () {
        return history.push( '/perfil/carrinho' );
    }

    return (
        <PageCenter>
            <PageHeader />
            <Header as='h1' textAlign='center'>Pagina do Usuario</Header>
            <Button onClick={ onButtonClick }>Carrinho de Compras</Button>
        </PageCenter>
    );
}

export default PagesProfile;
