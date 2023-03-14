import React from "react";
import { Link, Outlet } from "react-router-dom";

const Header = ({ title }) => {
    return (
        <>
            <header className="header">
                <div className="nav">
                    <Link to="/">Decode</Link>
                    <Link to="/variables">Variables</Link>
                </div>
                <h1 className="header__title">{title}</h1>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
