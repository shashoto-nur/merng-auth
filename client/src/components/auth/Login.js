
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import GoogleLogin from 'react-google-login';
import { useLazyQuery } from '@apollo/client';

import { loginUserQuery } from '../../queries/authQueries';

const Login = () =>
    {
        const [loginUser, { loading, data }] = useLazyQuery(loginUserQuery);
        const history = useHistory();

        const [email, setEmail] = useState('Email');
        const [password, setPassword] = useState('Password');

        const onEmailChange = (event) => { setEmail(event.target.value); };
        const onPasswordChange = (event) => { setPassword(event.target.value); };

        const successHandler = async (res) =>
        {
            const tokenId = res?.tokenId;

            try { loginUser({ variables: { tokenId }}); }
            catch(err) { console.log(err.message); };
        };

        const errorHandler = async (err) => { console.log(err.error); };

        const submitHandler = (event) =>
        {
            event.preventDefault();

            try
            {
                loginUser({ variables: { email, password } });
                setEmail('Email'); setPassword('Password');
            }
            catch(err) { console.log(err.message); };
        };

        try
        {
            if(data?.loginUserQuery?.token !== undefined && data?.loginUserQuery?.token)
            {
                localStorage.setItem('token', data?.loginUserQuery.token);
                console.log(data?.loginUserQuery.status);
                history.push("/");
            }
            else if(data?.loginUserQuery?.status !== undefined)
                console.log(data?.loginUserQuery?.status);
        }
        catch(err) { console.log(err.message); };

        if (loading) console.log('Logging in');
        return (
            <>
                <form onSubmit={ submitHandler }>
                    <input type='text' className='input' onChange={onEmailChange} placeholder={email} />
                    <input type='password' className='input' onChange={onPasswordChange} placeholder={password} />
                    <button type="submit"> Login </button>

                    <GoogleLogin
                        clientId="248809747957-t28kdcifl2ujfhvqlqmhaubscpui2299.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={ successHandler }
                        onFailure={ errorHandler }
                        cookiePolicy={'single_host_origin'}
                    />
                </form>

                <Link to="/signup"> Create an account </Link>
            </>
        );
    };

export default Login;