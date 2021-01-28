import React, { useState, useContext } from 'react';
import axios from 'axios';
import StoreContext from '../../../components/store/Context';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Label } from 'semantic-ui-react';
import cn from './FormLogin.module.css';
import roleNames from '../../../utils/permissionLevel';
import { Api } from '../../../utils/apiData';

/**
 * @Summary Retorna o código associado a role
 * @param role role corresponte
 */
function getRoleCode ( role ) {
    switch ( role ) {
        case "USER":
            return roleNames.USER;
        case "ADMIN":
            return roleNames.ADMIN;
        default:
            return roleNames.DEFAULT;
    }
}

/**
 * @Summary Valores iniciais dos inputs
 */
function initialState () {
    return { user: '', password: '' };
}


/**
 * @Summary Autentica o login
 * @param user Usuário
 * @param password Senha
 */
async function verificaLogin ( { user, password } ) {
    let dataLogin = {
        "username": user,
        "password": password
    }

    try {
        return await axios.post( Api.url + Api.autenticacao, dataLogin );
    }
    catch ( err ) {
        const error = 'Erro app -> verificaLogin; Erro: ' + err;
        console.log( error );
        return { error: 'Usuario ou senha incorretos' };
    }
}

/**
 * @Summary Retorna os dados do usuário
 * @param username Nome do usuário correspondente
 */
async function retornaUsuario ( username ) {
    try {
        return await axios.get( Api.url + Api.buscaUsuarioPorNome( username ) );
    }
    catch ( err ) {
        const error = 'Erro app -> retornaUsuario; Erro: ' + err;
        console.log( error );
        throw err;
    }
}

const FormLogin = () => {
    const [ values, setValues ] = useState( initialState );
    const [ showError, setShowError ] = useState( false );
    const { setToken, setRole, setCarrinho, setUsuario } = useContext( StoreContext );
    const history = useHistory();

    /**
     * @Summary Lida com a mudança dos inputs
     * @param event
     */
    function onChange ( event ) {
        const { value, name } = event.target;

        setValues( {
            ...values,
            [ name ]: value,
        } );
        setShowError( false );
    }

    /**
     * @Summary Lida com o submit do formulário
     * @param event
     */
    async function onSubmit ( event ) {
        event.preventDefault();

        const res = await verificaLogin( values );
        if ( res.data ) {
            const token = res.data.jwt;
            const role = res.data.role;

            const resUsuario = await retornaUsuario( values.user );
            const usuario = resUsuario.data;

            setToken( token );
            setUsuario( usuario );
            setRole( getRoleCode( role ) );
            setCarrinho( [] );
            return history.push( '/' );
        }
        setShowError( true );
        setValues( initialState );
    }

    /**
     * @Summary Lida com o clique no botão de cadastro
     */
    function onClick () {
        return history.push( '/cadastroUsuario' );
    }

    return (
        <Form onSubmit={ onSubmit }>
            <Form.Field
                control={ Input } label='Usuário' name='user' required
                type='text' onChange={ onChange } value={ values.user }
                error={ showError }
            />
            <Form.Field
                control={ Input } label='Senha' name='password' required
                type='password' onChange={ onChange } value={ values.password }
                error={ showError && <Label content='Usuario ou senha incorretos' /> }
            />
            <Form.Field className={ cn.fazerCadastro }>
                <p onClick={ onClick } >Não possui uma conta? Faça seu cadastro</p>
            </Form.Field>
            <Form.Field className={ cn.loginButton }
                control={ Button } type='submit' content='Entrar'
            />
        </Form>
    );
};

export default FormLogin;
