import React, { useState, useContext } from 'react';
import axios from 'axios';
import StoreContext from '../../../components/store/Context';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, Label } from 'semantic-ui-react';
import './Login.css';
import roleNames from '../../../utils/permissionLevel';
import { Api } from '../../../utils/apiData';
import { PageCenter } from '../../PageCenter/PageCenter';
import { PageHeader } from '../../PageHeader/PageHeader';

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

function initialState () {
    return { user: '', password: '' };
}

async function verificaLogin ( { user, password } ) {
    let dataLogin = {
        "username": user,
        "password": password
    }

    try {
        return await axios.post( Api.url + Api.autenticacao, dataLogin );
        // console.log( "jwt: ", data );
        // return ;
    }
    catch ( err ) {
        const error = 'Erro app -> verificaLogin; Erro: ' + err;
        console.log( error );
        // throw err;
        return { error: "Usuario ou senha incorreto." };
    }
}

const UserLogin = () => {
    const [ values, setValues ] = useState( initialState );
    const [ showError, setShowError ] = useState( false );
    const { setToken, setRole, setCarrinho } = useContext( StoreContext );
    const history = useHistory();

    function onChange ( event ) {
        // console.log( event.target );
        const { value, name } = event.target;

        setValues( {
            ...values,
            [ name ]: value,
        } );
        setShowError( false );
    }


    // function login({ user, password }) {

    //     if(user === 'admin' && password === 'admin'){
    //         return { token:'1234' };
    //     }
    //     return { error: 'Usuário ou senha inválido!'};
    // }

    async function onSubmit ( event ) {
        event.preventDefault();

        // const { token } = verificaLogin( values );
        // const { token } = await verificaLogin( values );
        const res = await verificaLogin( values );
        if ( res.data ) {
            const token = res.data.jwt;
            const role = res.data.role;
            // console.log( "token: ", token );
            // console.log( "codigo: ", getRoleCode( role ) );

            if ( token ) {
                setToken( token );
                setRole( getRoleCode( role ) );
                setCarrinho( [] );
                return history.push( '/' );
            }
        }
        setShowError( true );
        setValues( initialState );
    }

    function onClick () {
        return history.push( '/cadastro' );
    }

    return (
        <PageCenter >
            <PageHeader />
            <div className="user-login">
                <h1 className="user-login__title">Login</h1>
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
                    <Form.Field className="centralize">
                        <p onClick={ onClick } >Não possui uma conta? Faça seu cadastro</p>
                    </Form.Field>
                    <Form.Field className="user-login_button"
                        control={ Button } type='submit' content='Entrar'
                    />
                </Form>
            </div>
        </PageCenter >
    );
};

export default UserLogin;
