import React, { useContext } from "react";
import ProductFeatures from "./ProductFeatures";
import "./Home.css";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
  const userInfo = useContext(UserContext);
  return (
    <>
      <div className="image-box">
        {/* <Jumbotron> */}
        <div className="text-center lead ">
          <div className="header-spacing">
            <h1 className="green-yellow">Welcome to Tennis-Central</h1>
            <p className="subheader font-weight-light smaller-letters">
              {" "}
              A friendly place to find and connect with other Tennis Players
            </p>
          </div>
          <ProductFeatures />
          <Link to="join">
            <Button className="mr-4 green-yellow-btn" variant="outline-primary">
              Join
            </Button>
          </Link>
          <Link to="login">
            <Button className="ml-4 green-yellow-btn" variant="outline-primary">
              Login
            </Button>
          </Link>
        </div>

        {/* </Jumbotron> */}
      </div>
      <div></div>
    </>
  );
};
export default Home;
