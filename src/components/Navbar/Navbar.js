import React from "react";
import { Menu, Dropdown, Button, Icon } from "semantic-ui-react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <Menu className="navbar" size="small">
      <Menu.Item
        onClick={props.toggleSidebar}
        className="mobile-only dont-hide"
        id="sidebar-toggle"
      >
        <Icon name="bars" />
      </Menu.Item>

      <Menu.Item>
        <Link to="/"> Home </Link>
      </Menu.Item>

      <Menu.Item>
        <a href="#tech-used">Technologies Used</a>
      </Menu.Item>

      <Menu.Item>
        <a href="#about-dev">About Developer</a>
      </Menu.Item>
      {props.email ? (
        <Menu.Menu position="right">
          <Menu.Item className="dont-hide">
            <Link>
              <Button onClick={props.logout}>Logout</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item className="dont-hide">
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </Menu.Item>
          <Menu.Item className="dont-hide">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default Navbar;
