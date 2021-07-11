import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Link } from "react-router-dom";

const SkillsPrefs = () => (
  <div>
  <h1>Skills & Preferences</h1>
  <Formik
    initialValues={{

    }}
    onSubmit={async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      alert(JSON.stringify(values, null, 2));
    }}
  >
    <Form>
      <label htmlfor="ntrp">What is your NTRP rating?</label>
      <Field as="select" name="ntrp">
        <option value="">Rating #</option>
        <option value='2' >2.0</option>
        <option value="2.5">2.5</option>
        <option value="3.0">3.0</option>
        <option value="3.5">3.5</option>
      </Field>
      <Link to={{  pathname: "https://www.usta.com/content/dam/usta/pdfs/NTRP%20General%20Characteristics.pdf" }} target="_blank">How to determine your rating</Link>
      <div id="checkbox-group">Types of matches you'd consider playing?</div>
      <div role="group" aria-labelledby="checkbox-group">
            <label>
              <Field type="checkbox" name="matchType" value="singles" />
              Singles
            </label>
            <label>
              <Field type="checkbox" name="matchType" value="doubles" />
              Doubles
            </label>
            <label>
              <Field type="checkbox" name="matchType" value="mixed" />
              Mixed Doubles
            </label>
          </div>

        <div id="session-type-group">What type of session would you consider? </div>
          <div role="group" aria-labelledby="session-type-group">
            <label>
              <Field type="radio" name="picked" value="Practice" />
              Practice Sessions Only
            </label>
            <label>
              <Field type="radio" name="picked" value="Matches" />
              Matches Only 
            </label>
            <label>
              <Field type="radio" name="picked" value="Either" />
              Either Practice or Matches 
            </label>
            {/* <div>Picked: {values.picked}</div> */}
          </div>

          <div id="opponents-gender-group">Preferred Opponents Gender? </div>
          <div role="group" aria-labelledby="opponents-gender-group">
            <label>
              <Field type="radio" name="picked" value="Male" />
              Male
            </label>
            <label>
              <Field type="radio" name="picked" value="Female" />
              Female 
            </label>
            <label>
              <Field type="radio" name="picked" value="Either" />
              Either Gender 
            </label>
            {/* <div>Picked: {values.picked}</div> */}
          </div>
          <div>
          <div id="opponents-gender-group">Acceptable NTRP rating range of your partner? </div>
          <label htmlFor="low-rating">Lowest Rating</label>
          <Field as="select" id='low-rating' name="low-rating">
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
            <option value="5.5">5.5</option>
            <option value="6.0">6.0</option>
            <option value="6.5">6.5</option>
            <option value="7.0">7.0</option>
          </Field>
          <label htmlFor="high-rating">Highest Rating</label>
          <Field as="select" id="high-rating" name="hig-rating">
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
            <option value="5.5">5.5</option>
            <option value="6.0">6.0</option>
            <option value="6.5">6.5</option>
            <option value="7.0">7.0</option>
          </Field>
          <label htmlFor="high-rating">Max travel distance (miles) to play a match?</label>
          <Field as="select" id="max-distance" name="max-distance">
            <option value="5">less than 5 miles</option>
            <option value="10">less than 10 miles</option>
            <option value="15">less than 15 miles</option>
            <option value="20">less than 20 miles</option>
            <option value="30">less than 30 miles</option>
           </Field>

          </div>


      <button type="submit">Submit</button>
    </Form>
  </Formik>
</div>
);



export default SkillsPrefs; 