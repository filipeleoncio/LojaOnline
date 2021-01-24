import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { check } from '../../../utils/check';
import { Api } from '../../../utils/apiData';
import { Button, Form, Input, Image } from 'semantic-ui-react';

/**
 * @Summary Verifica se nome do produto ja está cadastrado
 * @param nomeProduto
 */
async function nomeProdutoValido ( nomeProduto ) {
    if ( nomeProduto !== '' ) {
        try {
            const res = await axios.get( Api.url + Api.verificaNomeProduto( nomeProduto ) );
            return !res.data;
        }
        catch ( err ) {
            const error = 'Erro app -> nomeProdutoValido; Erro: ' + err;
            console.log( error );
            throw err;
        }
    }
    return false;
}

const FormCadastroProduto = ( { values, setValues, setActiveDimmer } ) => {
    const [ img, setImg ] = useState( '' );
    const [ verificaNome, setVerificaNome ] = useState( '' );

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
                const res = await nomeProdutoValido( nomeProduto );
                setVerificaNome( res ? check.green : check.red );
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

        /**
         * @Summary Armazena os dados do produto
         */
        let formData = new FormData();
        formData.append( 'nome', values.nome );
        formData.append( 'preco', values.preco );
        formData.append( 'descricao', values.descricao );
        formData.append( 'quantidade', values.quantidade );
        formData.append( 'file', img );

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        if ( !( await nomeProdutoValido( values.nome ) ) ) {
            return null;
        }

        try {
            await axios.post( Api.url + Api.produto, formData, config );
        }
        catch ( err ) {
            const error = 'Erro app -> cadastrarProduto; Erro: ' + err;
            console.log( error );
            throw err;
        }

        setActiveDimmer( true );
    }

    return (
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
    );
}

export default FormCadastroProduto;
