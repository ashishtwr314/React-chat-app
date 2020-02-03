import React from "react";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <Menu className="navbar" size="small">
      <Menu.Item name="home" />
      <Menu.Item name="About" />
      <Menu.Item name="Contact" />

      <Menu.Menu position="right">
        <Menu.Item>
          <Button>Sign Up</Button>
        </Menu.Item>
        <Menu.Item>
          <Button>Login</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
