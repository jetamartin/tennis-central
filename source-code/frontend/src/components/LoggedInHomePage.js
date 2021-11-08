import React, { useState, useEffect, useContext, useRef } from "react";
import ProductFeatures from "./ProductFeatures";
import "./Home.css";
import { Button } from "react-bootstrap";
import UserContext from "./UserContext";
import "./LoggedInHomePage.css";

import AnchorLink from "react-anchor-link-smooth-scroll";
import useSmoothScroll from "react-smooth-scroll-hook";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userInfo?.token) {
      setIsLoading(false);
    }
  }, []);

  const userInfo = useContext(UserContext);

  // *************************** useSmoothScroll settings start ***************************************
  // Unable to get it to work but will come back to it later...Otherwise delete

  // const ref = useRef<HTMLElement>(document.documentElement);
  const ref = useRef(document.body);
  // const { scrollTo } = useSmoothScroll({
  //   ref,
  // });

  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 100,
    direction: "y",
  });

  // *************************** useSmoothScroll settings end ***************************************

  return (
    <>

        <div className="image-box">
          <div className="text-center lead ">
            <div className="header-spacing">
              <h1 className="green-yellow">
                {userInfo.firstName}, welcome to Tennis-Central!{" "}
              </h1>
              <p className="subheader font-weight-light smaller-letters">
                {" "}
                A friendly place to find and connect with other Tennis Players
              </p>
            </div>
            <ProductFeatures />

            {/* <p className="text-center value-prop-header green-yellow">
              Tennis-Central provides a convienient way to...
            </p>

            <div className="text-center smaller-letters smaller-letter-spacing">
              <ul className="no-bullets text-center mb-2 font-weight-light">
                <div class="row text-center">
                  <div class="col-md-6 col-sm-12">
                    <li className="d-flex justify-content-start mb-2">
                      <div className="feature_icon">
                        <i class="bi bi-sliders"></i>
                      </div>
                      <div className="feature_desc">
                        <span>Find partners with similar skills</span>
                      </div>
                    </li>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <li className="d-flex justify-content-start mb-2">
                      <div className="feature_icon">
                        <i class="bi bi-calendar2-plus"></i>
                      </div>
                      <div className="feature_desc">
                        <span>Find partners with availability</span>
                      </div>
                    </li>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <li className="d-flex justify-content-start mb-2">
                      <div className="feature_icon">
                        <i class="bi bi-link"></i>
                      </div>
                      <div className="feature_desc">
                        <span>Easily contact partners</span>
                      </div>
                    </li>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <li className="d-flex justify-content-start mb-2">
                      <div className="feature_icon">
                        <i class="bi bi-person-plus"></i>
                      </div>
                      <div className="feature_desc">
                        <span>Add players to partner list</span>
                      </div>
                    </li>
                  </div>
                </div>
              </ul>
            </div>

            <p className="top-spacing bottom-spacing green-yellow">
              And best of all it's <span className="boldIt">FREE</span> to
              use!!!
            </p> */}
            {/* For use with "react-smooth-scroll-hook"...unable to get it to work...will remove if I can't get it to work */}
            {/* <Button className="ml-4 green-yellow-btn" variant="outline-primary"  onClick={() => scrollTo('#getting-started')}>
              Getting Started
            </Button> */}

            <AnchorLink offset={() => 75} href="#getting-started">
            <Button className="ml-4 green-yellow-btn" variant="outline-primary">
              Let's Get Started
            </Button>
          </AnchorLink>
          </div>
        </div>

        <section className="getting-started-section" id="getting-started">
          <div className="getting-started-text-area">
            <h3 className="text-center">Getting Started</h3>
            <p className="">
              Congrats! Now that you are logged in there are just a couple more
              things you'll need to do to get the most from Tennis-Central:
            </p>
            <ul>
              <li>
                Set your NTRP rating in the 'Skills and Prefs' of the
                'MyProfile' section.
              </li>
              <p>
                Your NTRP rating is{" "}
                <span className="fw-bold text-decoration-underline">
                  required
                </span>{" "}
                for the 'Find-a-Partner' search to return results.
              </p>
              <li>
                Fill in other 'MyProfile' forms to capture and save your search
                criteria for your 'Find-a-Partner search'.
              </li>
              <p>
                Filling in the 'MyProfile' forms will eliminate the need to
                re-enter your search criteria for each 'Find-a-partner search'
                by allowing you to load your search criteria from your saved
                'MyProfile' search criteria.
              </p>
              <li>
                Now you are ready to go to the 'Find-a-Partner' page and start
                searching for potential partners
              </li>
              <li>Spread the word about Tennis-Central</li>
              <p>
                Please spread the word about this Tennis-Central app with your
                tennis partners so we can grow this community making it easier
                for all of us to find partners and play more tennis.
              </p>
            </ul>
          </div>
        </section>
 
    </>
  );
};
export default Home;
