import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import AuthService from '../../Services/AuthService';
require('./css/login.css');
const initialState = {
    username: "",
    password: "",
    submitted: false,
    alert: { type: null, message: null },
    visible: false
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.Auth = new AuthService();
    }
    componentWillMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/dashboard');
    }
    onChange = (e) => {
        let { name, value } = e.target;
        let value1 = value.trim();
        this.setState({
            [name]: value1
        })
    }
    handleEnterKeyPress = (e) => {
        this.setState({
            alert: { type: null, message: null }
        });
        if (e.charCode === '13') {
            this.handleSubmit(e);
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.setState({
            submitted: true
        })
        if (username && password) {
            this.Auth.login(username, password)
                .then(res => {
                    if (res) {
                        this.props.history.replace('/dashboard');
                    }
                })
                .catch(err => {
                    let alert = { type: null, message: "Username and Password was Wrong" }
                    this.setState({
                        alert,
                        visible: true
                    })
                })
        }

    }
    onDismiss = () => {
        this.setState({ visible: false });
    }
    render() {
        const { username, password, submitted } = this.state;
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Form className="login-container" onSubmit={this.handleSubmit}>
                            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                {this.state.alert.message}
                            </Alert>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" autoFocus name="username" value={username} id="username" placeholder="Username" onChange={this.onChange} />
                                {!username && submitted && <div className="text-danger">Enter Username</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" value={password} id="password" placeholder="Password" onChange={this.onChange} />
                                {!password && submitted && <div className="text-danger">Enter Password</div>}
                            </FormGroup>
                            <Button onClick={this.handleSubmit} color="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login;