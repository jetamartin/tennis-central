import React from "react";
import "./LoggedInHomePage.css";
const ProductFeatures = () => {
  return (
    <>
      <p className="text-center value-prop-header green-yellow">
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
        And best of all it's <span className="boldIt">FREE</span> to use!!!
      </p>
    </>
  );
};
export default ProductFeatures;
