import React, { useState } from 'react';
import { Header, Dimmer } from 'semantic-ui-react';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';
import FormCadastroUsuario from './FormCadastroUsuario/FormCadastroUsuario';

const Cadastro = () => {
    const [ activeDimmer, setActiveDimmer ] = useState( false );

    return (
        <div>
            <PageCenter>
                <PageHeader />
                <FormCadastroUsuario setActiveDimmer={ setActiveDimmer } />
            </PageCenter >
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Cadastro realizado com sucesso!</Header>
            </Dimmer>
        </div>
    )
}
export default Cadastro;
