import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Header, Input, Label, Image, Dimmer } from 'semantic-ui-react';
import { If } from '../../components/If/If';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';
import StoreContext from '../../components/store/Context';
import { Api } from '../../utils/apiData';
import { check } from '../../utils/check';
import roleNames from '../../utils/permissionLevel';
import { timeout } from '../../utils/timeout';

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

function initialStateVerify () {
    return {
        userName: '',
        email: ''
    }
}

/**
 * @Summary Verifica se nome de usuário já esta cadastrado
 * @param userName
 */
async function verificaNomeDeUsuario ( userName ) {
    if ( userName !== '' ) {
        try {
            const res = await axios.get( Api.url + Api.verificarUsername( userName ) );
            return res.data;
        }
        catch ( err ) {
            const error = 'Erro app -> verificaNomeDeUsuario; Erro: ' + err;
            console.log( error );
            throw err;
        }
    }
    return null;
}

const Cadastro = () => {
    const [ values, setValues ] = useState( initialStateValues );
    const [ verify, setVerify ] = useState( initialStateVerify );
    const [ activeDimmer, setActiveDimmer ] = useState( false );
    const history = useHistory();
    const { role } = useContext( StoreContext );

    useEffect( () => {
        /**
         * @Summary Atualiza sinal de disponibilidade de nome de usuário/email
         * @param verify Variável que contém os valores
         */
        async function atualizaCheck ( verify ) {
            const username = values.userName;
            if ( username === '' ) {
                setVerify( {
                    ...verify,
                    'userName': '',
                } );
            }
            else {
                const res = await verificaNomeDeUsuario( username );
                if ( res ) {
                    setVerify( {
                        ...verify,
                        'userName': check.red,
                    } );
                }
                else {
                    setVerify( {
                        ...verify,
                        'userName': check.green,
                    } );
                }
            }
        }
        atualizaCheck();
    }, [ values.userName ] );

    function onChange ( event ) {
        const { value, name } = event.target;

        setValues( {
            ...values,
            [ name ]: value,
        } );
    }

    function onChangeRole ( event ) {
        setValues( {
            ...values,
            role: event.target.value
        } );
    }

    async function onSubmit () {
        if ( values.password !== values.passwordC || await verificaNomeDeUsuario( values.userName ) ) {
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
        await timeout( 1000 );
        return history.push( '/' );
    }

    return (
        <div>
            <PageCenter>
                <PageHeader />
                <Header as='h1' textAlign='center'>Cadastro</Header>
                <Form onSubmit={ onSubmit }>
                    <Form.Group>
                        <Form.Field
                            control={ Input } label='Nome de usuário' placeholder='Nome de usuário'
                            name='userName' onChange={ onChange } value={ values.userName } required width={ 15 }
                        />
                        <Form.Field width={ 1 } >
                            <Image src={ verify.userName } />
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
                    />
                    <Form.Field
                        control={ Input } label='Senha' placeholder='Senha' required
                        name='password' type='password' onChange={ onChange } value={ values.password }
                    />
                    <Form.Field
                        control={ Input } label='Confirme a senha' placeholder='Confirme a senha' required
                        name='passwordC' type='password' onChange={ onChange } value={ values.passwordC }
                        error={ values.password !== values.passwordC && values.passwordC !== '' && <Label content='Senha não confere' pointing='above' /> }
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
            </PageCenter >
            <Dimmer active={ activeDimmer } page>
                <Header as='h2' inverted>Cadastro realizado com sucesso!</Header>
            </Dimmer>
        </div>
    )
}
export default Cadastro;
