import {React, useContext } from "react";
import UserContext from "../../utils/UserContext";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./style.css"



function UserInfo(props) {
    const { name, portrait } = useContext(UserContext);
    
    // console.log(" id ",id," name ",name," portrait ",portrait);

    const inviteRedirect = () => {
      window.location.assign("/invites");
    }


    return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src={portrait}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            {name}
          </Navbar.Brand>
          <button className="inviteBtn" onClick={inviteRedirect}><i class="fas fa-envelope-open-text"></i></button>
          <Button className="right" variant="secondary" onClick={props.logout}>Logout</Button>
        </Navbar>
    );
};


export default UserInfo;