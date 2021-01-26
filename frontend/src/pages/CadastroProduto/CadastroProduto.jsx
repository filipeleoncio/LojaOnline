import React, { useState } from 'react';
import { Button, Header, Dimmer } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import PageCenter from '../../components/PageCenter/PageCenter'
import PageHeader from '../../components/PageHeader/PageHeader';
import FormCadastroProduto from './FormCadastroProduto/FormCadastroProduto';

/**
 * @Summary Valores iniciais para os inputs
 */
function initialStateValues () {
    return {
        nome: '',
        preco: '',
        descricao: '',
        quantidade: ''
    }
}

const PagesCadastroProduto = () => {
    const [ values, setValues ] = useState( initialStateValues );
    const [ activeDimmer, setActiveDimmer ] = useState( false );
    const history = useHistory();

    /**
     * @Summary Redireciona para a loja
     */
    function handleReturn () {
        return history.push( '/' );
    }

    /**
     * @Summary Reseta os valores para o cadastro de outro produto
     */
    function handleContinue () {
        setActiveDimmer( false );
        setValues( initialStateValues );
    }

    return (
        <div>
            <PageCenter>
                <PageHeader />
                <Header as='h1' textAlign='center'>Cadastro Produto</Header>
                <FormCadastroProduto values={ values } setValues={ setValues } setActiveDimmer={ setActiveDimmer } />
            </PageCenter >
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Produto cadastrado com sucesso!</Header>
                <div className='buttons'>
                    <Button onClick={ handleContinue } content='Cadastrar outro Produto' />
                    <Button onClick={ handleReturn } content='Retornar a Loja' />
                </div>
            </Dimmer>
        </div>
    )
}

export default PagesCadastroProduto;
