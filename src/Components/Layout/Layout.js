import React from 'react';
import Nav from '../Nav/Nav';

export const Layout = (props) => {
    return <div className="container">
        <Nav username={props.username} logout={props.logout} />
        <div className="wrapper">{props.children}</div>
    </div>
}