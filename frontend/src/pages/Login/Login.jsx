import React from 'react';
import PageCenter from '../../components/PageCenter/PageCenter';
import PageHeader from '../../components/PageHeader/PageHeader';
import UserLogin from '../../components/User/Login/Login';
import './Login.css';

function PagesLogin () {
    return (
        <PageCenter >
            <PageHeader />
            <div className="user-login">
                <h1 className="user-login__title">Login</h1>
                <UserLogin />
            </div>
        </PageCenter >
    );
}

export default PagesLogin;
