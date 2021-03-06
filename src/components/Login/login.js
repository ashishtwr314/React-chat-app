import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Checkbox,
  Form,
  Message,
  Segment,
  Dimmer,
  Loader,
  Header,
} from "semantic-ui-react";
import "./login.css";
import Navbar from "../Navbar/Navbar";
import firebase from "../../firebase/firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loader: false,
      error: "",
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  SubmitHandler = () => {
    this.setState({
      loader: true,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        this.setState({
          error: err.message,
          loader: false,
        });
      });
  };

  handleDemoLogin = () => {
    this.setState({
      loader: true,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword("user1@gmail.com", "password")
      .then((result) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        this.setState({
          error: err.message,
          loader: false,
        });
      });
  };

  render() {
    const newLoginMessage = (
      <div className="newLoginMessage">
        <Message>
          <Message.Header>Welcome on Board Caption !</Message.Header>
          <p>
            We are happy to see you here. Login and start enjoying the App...
          </p>
        </Message>
      </div>
    );

    const loading = (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

    return (
      <React.Fragment>
        <Navbar />
        {this.props.location.state
          ? this.props.location.state.newLogin
            ? newLoginMessage
            : null
          : null}

        <div className="login-container">
          <h1 className="ui header">Login</h1>
          <Header textAlign="center" as="h4" color="red">
            {this.state.error}
          </Header>
          <Segment>
            {this.state.loader ? loading : null}

            <Form onSubmit={this.SubmitHandler}>
              <Form.Field>
                <label>Email Id</label>
                <input
                  required
                  name="email"
                  onChange={(e) => this.onChangeHandler(e)}
                  placeholder="Email id"
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  onChange={(e) => this.onChangeHandler(e)}
                  placeholder="Password"
                />
              </Form.Field>
              <Form.Field>
                <Checkbox label="Remember Me" />
              </Form.Field>
              <Button type="submit">Login</Button>
            </Form>
            <Button
              className="demo-login"
              onClick={() => this.handleDemoLogin()}
            >
              Demo Login
            </Button>
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
