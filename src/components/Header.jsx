import React from "react";
import { Link, Outlet } from "react-router-dom";

const Header = ({ title }) => {
    return (
        <>
            <header className="header">
                <div className="nav">
                    <Link to="/vin-decoder">Decode</Link>
                    <Link to="/vin-decoder/variables">Variables</Link>
                </div>
                <h1 className="header__title">{title}</h1>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
