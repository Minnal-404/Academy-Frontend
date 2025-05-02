// src/components/layout/AcademyLayout.jsx
import React from 'react';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';

const AcademyLayout = () => {
    return (
        <div className="container vh-100">
            <div className='row'>

            <div className='col-4'>

                <Sidebar />
            </div>
            <div className=" col py-5 ">
                <Outlet />
            </div>
            </div>
        </div>
    );
};

export default AcademyLayout;
