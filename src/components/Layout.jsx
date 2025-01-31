import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import App from '../App';

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <App />
        </div>
    );
};

export default Layout;