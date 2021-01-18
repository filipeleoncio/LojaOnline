import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { check } from '../../utils/check';
import { Api } from '../../utils/apiData';
import { Button, Form, Header, Input, Image, Dimmer } from 'semantic-ui-react';
import { timeout } from '../../utils/timeout';
import { useHistory } from 'react-router-dom';
import PageCenter from '../../components/PageCenter/PageCenter'
import PageHeader from '../../components/PageHeader/PageHeader';

function initialStateValues () {
    return {
        nome: '',
        preco: '',
        descricao: '',
        quantidade: ''
    }
}

/**
 * @Summary Verifica se nome do produto ja está cadastrado
 * @param nomeProduto
 */
async function verificaNomeDoProduto ( nomeProduto ) {
    if ( nomeProduto !== '' ) {
        try {
            const res = await axios.get( Api.url + Api.verificaNomeProduto( nomeProduto ) );
            return res.data;
        }
        catch ( err ) {
            const error = 'Erro app -> verificaNomeDoProduto; Erro: ' + err;
            console.log( error );
            throw err;
        }
    }
    return null;
}

const PagesCadastroProduto = () => {
    const [ values, setValues ] = useState( initialStateValues );
    const [ img, setImg ] = useState( '' );
    const [ verificaNome, setVerificaNome ] = useState( '' );
    const [ activeDimmer, setActiveDimmer ] = useState( false );
    const history = useHistory();

    useEffect( () => {
        /**
         * @Summary Atualiza sinal de disponibilidade de nome de produto
         */
        async function atualizaCheck () {
            const nomeProduto = values.nome;
            if ( nomeProduto === '' ) {
                setVerificaNome( '' );
            }
            else {
                const res = await verificaNomeDoProduto( nomeProduto );
                if ( res ) {
                    setVerificaNome( check.red );
                }
                else {
                    setVerificaNome( check.green );
                }
            }
        }
        atualizaCheck();
    }, [ values.nome ] );

    function onChange ( event ) {
        const { value, name } = event.target;

        setValues( {
            ...values,
            [ name ]: value,
        } );
    }

    function onChangeFile ( event ) {
        setImg( event.target.files[ 0 ] );
    }

    async function onSubmit () {
        if ( await verificaNomeDoProduto( values.nome ) ) {
            return null;
        }

        try {
            await axios.post( Api.url + Api.produto, values );
        }
        catch ( err ) {
            const error = 'Erro app -> cadastrarProduto; Erro: ' + err;
            console.log( error );
            throw err;
        }

        setActiveDimmer( true );
        await timeout( 1000 );
        return history.push( '/' );
    }

    return (
        <div>
            <PageCenter>
                <PageHeader />
                <Header as='h1' textAlign='center'>Cadastro Produto</Header>
                <Form onSubmit={ onSubmit }>
                    <Form.Group>
                        <Form.Field
                            control={ Input } label='Nome do produto' placeholder='Nome do produto'
                            name='nome' onChange={ onChange } value={ values.nome } required width={ 15 }
                        />
                        <Form.Field width={ 1 } >
                            <Image src={ verificaNome } />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field
                        control={ Input } label='Preço' placeholder='Preço'
                        name='preco' onChange={ onChange } value={ values.preco } required
                    />
                    <Form.Field
                        control={ Input } label='Descrição' placeholder='Descrição'
                        name='descricao' onChange={ onChange } value={ values.descricao } required
                    />
                    <Form.Field
                        control={ Input } label='Quantidade disponível' placeholder='Quantidade disponível' required
                        name='quantidade' onChange={ onChange } value={ values.quantidade }
                    />
                    <Form.Field
                        control={ Input } type='file' label='Imagem' required
                        name='img' onChange={ onChangeFile }
                    />
                    <Form.Field
                        control={ Button } type='submit' content='Cadastrar'
                    />
                </Form>

            </PageCenter >
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Produto cadastrado com sucesso!</Header>
            </Dimmer>
        </div>
    )
}

export default PagesCadastroProduto
