import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Label, Image } from 'semantic-ui-react';
import { If } from '../../../components/If/If';
import StoreContext from '../../../components/store/Context';
import { Api } from '../../../utils/apiData';
import { check } from '../../../utils/check';
import roleNames from '../../../utils/permissionLevel';

/**
 * @Summary Estado inicial dos valores no input
 */
function initialStateValues () {
    return {
        userName: '',
        firtName: '',
        lastName: '',
        email: '',
        password: '',
        passwordC: '',
        role: 'USER'
    }
}

/**
 * @Summary Verifica se nome de usuário já esta cadastrado
 * @param userName
 */
async function userNameValido ( userName ) {
    if ( userName !== '' ) {
        try {
            const res = await axios.get( Api.url + Api.verificarUsername( userName ) );
            return !res.data;
        }
        catch ( err ) {
            const error = 'Erro app -> userNameValido; Erro: ' + err;
            console.log( error );
            throw err;
        }
    }
    return false;
}

/**
 * @Summary Retorna se o email passado por parâmetro é valido
 * @param email
 */
function emailValido ( email ) {
    return email === '' || /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test( email );
}

/**
 * @Summary Retorna se os password passados correspondem
 * @param password password inicial
 * @param passwordC password que deve corresponder ao inicial
 */
function passwordValido ( password, passwordC ) {
    return password === passwordC;
}

/**
 * @Summary Retorna se os campos do formulário estão válidos
 * @param userName nome do usuario
 * @param email email do usuario
 * @param password password inicial
 * @param passwordC password correspondente
 */
async function formularioValido ( userName, email, password, passwordC ) {
    return await userNameValido( userName ) && emailValido( email ) && passwordValido( password, passwordC );
}

const FormCadastroU = ( { setActiveDimmer } ) => {
    const [ values, setValues ] = useState( initialStateValues );
    const [ validaNome, setValidaNome ] = useState( '' );
    const history = useHistory();
    const { role } = useContext( StoreContext );

    useEffect( () => {
        /**
         * @Summary Atualiza sinal de disponibilidade de nome de usuário
         */
        async function atualizaCheck () {
            const username = values.userName;
            if ( username === '' ) {
                setValidaNome( '' );
            }
            else {
                const res = await userNameValido( username );
                setValidaNome( res ? check.green : check.red );
            }
        }
        atualizaCheck();
    }, [ values.userName ] );

    /**
     * @Summary Controla a mudança nos valores do input do formulário
     * @param event
     */
    function onChange ( event ) {
        const { value, name } = event.target;

        setValues( {
            ...values,
            [ name ]: value,
        } );
    }

    /**
     * @Summary Controla a mudança na role escolhida para o usuário a ser cadastrado
     * @param event
     */
    function onChangeRole ( event ) {
        setValues( {
            ...values,
            role: event.target.value
        } );
    }

    /**
     * @Summary Lida com o submit do formulário
     */
    async function onSubmit () {
        const valido = await formularioValido( values.userName, values.email, values.password, values.passwordC );
        if ( !valido ) {
            return null;
        }

        try {
            await axios.post( Api.url + Api.usuario, values );
        }
        catch ( err ) {
            const error = 'Erro app -> cadastrarUsuario; Erro: ' + err;
            console.log( error );
            throw err;
        }

        setActiveDimmer( true );
        setTimeout( () => history.push( '/' ), 1000 );
    }

    return (
        <Form onSubmit={ onSubmit }>
            <Form.Group>
                <Form.Field
                    control={ Input } label='Nome de usuário' placeholder='Nome de usuário'
                    name='userName' onChange={ onChange } value={ values.userName } required width={ 15 }
                />
                <Form.Field width={ 1 } >
                    <Image src={ validaNome } />
                </Form.Field>
            </Form.Group>
            <Form.Field
                control={ Input } label='Nome' placeholder='Nome'
                name='firtName' onChange={ onChange } value={ values.firtName } required
            />
            <Form.Field
                control={ Input } label='Sobrenome' placeholder='Sobrenome'
                name='lastName' onChange={ onChange } value={ values.lastName } required
            />
            <Form.Field
                control={ Input } label='E-mail' placeholder='teste@gmail.com' required
                name='email' onChange={ onChange } value={ values.email }
                error={ !emailValido( values.email ) && <Label content='E-mail inválido' pointing='above' /> }
            />
            <Form.Field
                control={ Input } label='Senha' placeholder='Senha' required
                name='password' type='password' onChange={ onChange } value={ values.password }
            />
            <Form.Field
                control={ Input } label='Confirme a senha' placeholder='Confirme a senha' required
                name='passwordC' type='password' onChange={ onChange } value={ values.passwordC }
                error={ !passwordValido( values.password, values.passwordC ) && <Label content='Senha não confere' pointing='above' /> }
            />
            <If condition={ role === roleNames.ADMIN }>
                <Form.Group grouped>
                    <Form.Field label='User' control='input' type='radio'
                        name='permission' value='USER' onChange={ onChangeRole }
                    />
                    <Form.Field label='Admin' control='input' type='radio'
                        name='permission' value='ADMIN' onChange={ onChangeRole }
                    />
                </Form.Group>
            </If>
            <Form.Field
                control={ Button } type='submit' content='Cadastrar'
            />
        </Form>
    );
}

export default FormCadastroU;
