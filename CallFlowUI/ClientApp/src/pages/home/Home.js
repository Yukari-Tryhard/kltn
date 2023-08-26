import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import SideNav from '../../common/components/SideNav.js';
import LogoutDialog from '../../common/components/LogoutDialog.js';
import useAuthen from '../../hook/useAuthen';
import { CallFlowUserClient } from '../../api/web-api-client.ts';

const Home = () => {
    const currentUser = useAuthen();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        // perform logout action
        setShowLogoutDialog(false);
    };

    return (
        <div className="flex flex-col h-screen bg-[#092963]">
            <div className="flex flex-row flex-grow h-full items-center">
                <div className="flex-none w-64 bg-[#092963] h-full drop-shadow-lg rounded-2xl">
                    <SideNav />
                </div>
                <div className="flex-grow h-[95%] rounded-2xl bg-white">
                    <div className="flex-row justify-end flex items-center py-2 px-4">
                        <img className="h-8 w-8 rounded-full mr-2 cursor-pointer" src={currentUser?.avatarUrl} alt="Avatar" onClick={() => setShowLogoutDialog(true)} />
                        <div className="text-gray-800 font-medium cursor-pointer">{currentUser?.userName}</div>
                        {/* Add the notification icon here */}
                        <svg className="h-6 w-6 ml-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a6 6 0 00-6 6h0a6 6 0 006 6h0a6 6 0 006-6h0a6 6 0 00-6-6z" />
                        </svg>
                    </div>

                    <div className="min-w-[0]">
                        <Outlet />
                    </div>
                </div>
            </div>
            {showLogoutDialog && <LogoutDialog onLogout={handleLogout} setShowLogoutDialog={setShowLogoutDialog} />}
        </div>
    );
};

export default Home;
