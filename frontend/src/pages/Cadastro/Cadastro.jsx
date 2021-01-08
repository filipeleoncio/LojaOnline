import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Form, Header, Input, Label, Image, Dimmer } from 'semantic-ui-react';
import { If } from '../../components/If/If';
import { PageCenter } from '../../components/PageCenter/PageCenter'
import StoreContext from '../../components/store/Context';
import { Api } from '../../utils/apiData'
import roleNames from '../../utils/permissionLevel';
import { timeout } from '../../utils/timeout';

const check = {
    // green: 'https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-green-check-mark-icon-flat-style-png-image_1986021.jpg',
    green: 'https://banner2.cleanpng.com/20180329/cvq/kisspng-check-mark-computer-icons-clip-art-feedback-button-5abda2bf2e5f03.10222752152237740719.jpg',
    red: 'https://img.favpng.com/12/24/4/red-x-x-mark-computer-icons-clip-art-png-favpng-fQcTS7Ae10badG37Km4sybF3X.jpg'
}

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

export const Cadastro = () => {
    const [ values, setValues ] = useState( initialStateValues );
    const [ verify, setVerify ] = useState( initialStateVerify );
    // const [ newRole, setNewRole ] = useState( 'USER' );
    // const [ checkboxActive, setCheckboxActive ] = useState( false );
    const [ activeDimmer, setActiveDimmer ] = useState( false );
    const history = useHistory();
    const { role } = useContext( StoreContext );

    async function onChange ( event ) {
        const { value, name } = event.target;

        setValues( {
            ...values,
            [ name ]: value,
        } );


        //vira useEffect
        if ( name === 'userName' ) {
            if ( value === '' ) {
                setVerify( {
                    ...verify,
                    [ name ]: '',
                } );
            }
            else {
                const res = await verificaNomeDeUsuario( value );
                if ( res ) {
                    setVerify( {
                        ...verify,
                        [ name ]: check.red,
                    } );
                }
                else {
                    setVerify( {
                        ...verify,
                        [ name ]: check.green,
                    } );
                }
            }
        }
    }

    function onChangeRole ( event ) {
        setValues( {
            ...values,
            role: event.target.value
        } );
    }

    // function changeRole ( event ) {
    //     setCheckboxActive( !checkboxActive );
    //     // console.log( "fora:", checkboxActive );

    //     console.log( "fora: ", newRole );

    //     // await alteraCheckBoxActive( !checkboxActive );
    //     // const newRole = checkboxActive ? 'ADMIN' : 'USER';
    //     // console.log( "dentro:", checkboxActive );
    //     // await alteraValues( newRole );
    //     // console.log( "new role: ", values.role );
    // }


    // async function alteraValues ( newRole ) {
    //     return new Promise( ( resolve ) => setValues( { ...values, role: newRole }, resolve ) );
    // }

    // async function alteraCheckBoxActive ( newState ) {
    //     return new Promise( ( resolve ) => setCheckboxActive( newState, resolve ) );
    // }

    // useEffect( () => {
    //     console.log( "Values role(att): ", values.role );
    // }, [ setValues, values.role ]
    // );

    // async function alteraValues ( newRole ) {
    // const alteraValues = useCallback( async ( newRole ) => {
    //     return ( ( resolve ) => setValues( { ...values, role: newRole }, resolve ) );
    // } );

    // useEffect( () => {
    //     const role = checkboxActive ? 'ADMIN' : 'USER';
    //     console.log( checkboxActive );
    //     console.log( role );
    //     setNewRole( role );
    //     // await alteraValues( newRole );
    //     // setValues( {
    //     //     ...values,
    //     //     role: newRole,
    //     // } );

    // }, [ checkboxActive ]
    // );


    async function onSubmit ( event ) {
        if ( values.password !== values.passwordC || await verificaNomeDeUsuario( values.userName ) ) {
            return null;
        }

        // const newRole = checkboxActive ? 'ADMIN' : 'USER';

        // setValues( {
        //     ...values,
        //     role: newRole,
        // } );

        console.log( values );

        try {
            // if ( values.role === '' )
            //     console.log( "role:", role );
            await axios.post( Api.url + Api.usuario, values );
        }
        catch ( err ) {
            const error = 'Erro app -> cadastrarUsuario; Erro: ' + err;
            console.log( error );
            throw err;
        }

        setActiveDimmer( true );
        await timeout( 2000 );
        return history.push( '/' );
    }

    return (
        <div>
            <PageCenter>
                <Header as='h1' className="centralize">Cadastro</Header>
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
