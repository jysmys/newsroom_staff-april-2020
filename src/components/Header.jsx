import React from "react";
import { Menu, Container } from "semantic-ui-react";
import auth from "../modules/auth";
import { Redirect, NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const Header = (props) => {
  const logOut = async () => {
    try {
      await auth.signOut();
      props.dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
    }
  };

  const authenticatedAs = useSelector((state) => state.authenticatedAs);
  const uid = useSelector((state) => state.uid);

  const redirect = !authenticatedAs && <Redirect to={{ pathname: "/" }} />;

  return (
    <Container className="header-container">
      {redirect}
      <Menu className="header" stackable>
        <Menu.Item>
          <h1>Daily News Sense</h1>
        </Menu.Item>
        {authenticatedAs && (
          <>
            <Menu.Item id="write-nav" className="nav-btn">
              <NavLink to="/write" className="navbar-text">
                Write
              </NavLink>
            </Menu.Item>
            {authenticatedAs == "editor" && (
              <Menu.Item id="review-nav" className="nav-btn">
                <NavLink to="/review" className="navbar-text">
                  Review
                </NavLink>
              </Menu.Item>
            )}

            <Menu.Item position="right" id="logout" onClick={() => logOut()}>
              <h4>
                Log out <br />
                {uid}
              </h4>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default connect()(Header);
