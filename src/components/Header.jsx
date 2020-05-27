import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import auth from "../modules/auth";
import { Redirect, Link } from "react-router-dom";

const Header = (props) => {
  const logOut = async () => {
    try {
      await auth.signOut();
      props.setAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  const redirect = !props.authenticated && <Redirect to={{ pathname: "/" }} />;

  return (
    <Container className="header">
      {redirect}
      <Menu className="header" stackable>
        <Menu.Item>
          <h1>Daily News Sense</h1>
        </Menu.Item>
        {props.authenticated && (
          <>
            <Menu.Item active>
              <Link to="/subscription">
                <Button>Buy Subscription</Button>
              </Link>
            </Menu.Item>
            <Menu.Item active>Write</Menu.Item>
            <Menu.Item position="right" id="logout" onClick={() => logOut()}>
              <h4>
                Log out <br />
                {props.uid}
              </h4>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Container>
  );
};
export default Header;
