
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import GoogleLogin from 'react-google-login';
import { useMutation } from '@apollo/client';

import { createUserMutation } from '../../schema/';

const SignUp = () =>
    {
        const [createUser, { data }] = useMutation(createUserMutation);

        const [name, setName] = useState('Name');
        const [email, setEmail] = useState('Email');
        const [password, setPassword] = useState('Password');

        const onNameChange = (event) => { setName(event.target.value); };
        const onEmailChange = (event) => { setEmail(event.target.value); };
        const onPasswordChange = (event) => { setPassword(event.target.value); };

        const successHandler = async (res) =>
        {
            const tokenId = res?.tokenId;

            try { createUser({ variables: { tokenId } }); }
            catch(err) { console.log(err.message); };
        };
        
        const errorHandler = async (err) => { console.log(err.error); };

        const submitHandler = (event) =>
        {
            event.preventDefault();

            try
            {
                createUser({ variables: { name, email, password } });
                setName('Name'); setEmail('Email'); setPassword('Password');
            }
            catch(err) { console.log(err.message); };
        };

        try
        {
            if(data?.createUserMutation !== undefined) console.log(data);
            data?.createUserMutation.token && localStorage.setItem('token', data?.createUserMutation.token);
        }
        catch(err) { console.log(err.message); };

        return (
            <>
                <form onSubmit={ submitHandler }>
                    <input type='text' className='input' onChange={onNameChange} placeholder={name} />
                    <input type='text' className='input' onChange={onEmailChange} placeholder={email} />
                    <input type='password' className='input' onChange={onPasswordChange} placeholder={password} />
                    <button type="submit"> SignUp </button>

                    <GoogleLogin
                        clientId="248809747957-t28kdcifl2ujfhvqlqmhaubscpui2299.apps.googleusercontent.com"
                        buttonText="SignUp"
                        onSuccess={ successHandler }
                        onFailure={ errorHandler }
                        cookiePolicy={'single_host_origin'}
                    />
                </form>

                <Link to="/"> Login as a user </Link>
            </>
        );
    };

export default SignUp;