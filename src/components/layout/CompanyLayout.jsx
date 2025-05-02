import React from 'react';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';
import Filter from '../Filter';

const CompanyLayout = () => {
    return (
        <div className="container vh-100">
            <div className='row'>
                <Filter />

            </div>
            <div className="row">
                <Outlet />
            </div>
        </div>
    );
};

export default CompanyLayout;
