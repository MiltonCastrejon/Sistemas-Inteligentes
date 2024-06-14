// routers/routes.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@nextui-org/react";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <>
            <Button className="justify-center my-5 bg-gradient-to-br from-primary-5000 to-primary-700 text-white shadow-lg w-48" variant="shadow" color="primary" onClick={handleLogout}>Cerrar Sesion</Button>
        </>
    );
};

export default Logout;
