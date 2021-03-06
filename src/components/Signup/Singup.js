import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Checkbox,
  Form,
  Dimmer,
  Loader,
  Segment,
  Header
} from "semantic-ui-react";
import "./Signup.css";
import Navbar from "../Navbar/Navbar";
import firebase from "../../firebase/firebase";

class Singup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordCnf: "",
      checked: false,
      loader: false,
      error: ""
    };
  }
  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  passwordCnf = () => this.state.password === this.state.passwordCnf;
  passwordLen = () => {
    if (this.state.password.length > 6) {
      return true;
    } else {
      return false;
    }
  };

  checkboxHandler = e => {
    let checked = !e.target.parentNode.classList.contains("checked");
    this.setState({
      checked: checked
    });
  };

  SubmitHandler = () => {
    if (!this.passwordCnf()) {
      this.setState({ error: "Passwords do not match" });
      return;
    } else if (!this.passwordLen()) {
      this.setState({
        error: "Password length should be more than 6 characters"
      });
      return;
    } else if (!this.state.checked) {
      this.setState({
        error: "Please accept the Terms and Conditions"
      });
      return;
    } else {
      if (this.state.error !== "") {
        return;
      }
      this.setState({
        loader: true
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(result => {
          const { firstName, lastName, email } = this.state;
          firebase
            .firestore()
            .collection("users")
            .add({
              firstName: firstName,
              lastName: lastName,
              email: email
            })
            .then(result => {
              this.setState(
                {
                  loader: false
                },
                () => {
                  this.props.history.push("/login", {
                    newLogin: true
                  });
                }
              );
            })
            .catch(err => {
              console.log("Failed to add to database");
            });
        })
        .catch(err => {
          console.log(err);
          this.setState(
            {
              loader: false
            },
            () => {
              console.log(err);
              return;
            }
          );
        });
    }
  };

  render() {
    const loading = (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
    return (
      <React.Fragment>
        <Navbar />
        <div className="signup-container">
          <Header textAlign="center" as="h4" color="red">
            {this.state.error}
          </Header>
          <Segment fluid>
            {this.state.loader ? loading : null}

            <Form onSubmit={this.SubmitHandler}>
              <Form.Field>
                <label>First name</label>
                <input
                  required
                  name="firstName"
                  onChange={e => this.onChangeHandler(e)}
                  placeholder="First Name"
                />
              </Form.Field>

              <Form.Field>
                <label>Last name</label>
                <input
                  required
                  name="lastName"
                  onChange={e => this.onChangeHandler(e)}
                  placeholder="Last Name"
                />
              </Form.Field>

              <Form.Field>
                <label>Email Id</label>
                <input
                  type="email"
                  required
                  name="email"
                  onChange={e => this.onChangeHandler(e)}
                  placeholder="Email id"
                />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  onChange={e => this.onChangeHandler(e)}
                  placeholder="Password"
                />
              </Form.Field>

              <Form.Field>
                <label>Confirm Password</label>
                <input
                  type="password"
                  required
                  name="passwordCnf"
                  onChange={e => this.onChangeHandler(e)}
                  placeholder="Repeat Password"
                />
              </Form.Field>

              <Form.Field>
                <Checkbox
                  onChange={e => this.checkboxHandler(e)}
                  required
                  label="I agree to the Terms and condition"
                />
              </Form.Field>
              <Button type="submit">Signup</Button>
            </Form>
          </Segment>
        </div>
      </React.Fragment>
    );
  }
}

export default Singup;
