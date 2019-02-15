import React, { Component } from 'react';
import AuthService from '../../Services/AuthService';
import withAuth from '../../Services/withAuth';
import { Layout } from '../../Components/Layout/Layout';
require('./dashboard.css');

const Auth = new AuthService();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();

    }
    componentWillMount() {
        if (!this.Auth.loggedIn())
            this.props.history.replace('/login');
    }
    handleLogout = () => {
        Auth.logout();
        this.props.history.replace('/login');
    }
    render() {
        console.log(this.props)
        return (
            <Layout username={this.props.user.username} logout={this.handleLogout}>
                <div className="section-center">
                    <h2>Welcome to Dashboard</h2>
                </div>
            </Layout>
        )
    }
}

export default withAuth(Dashboard);