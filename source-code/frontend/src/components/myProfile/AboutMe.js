import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AboutMe = () => (
  <div>
    <h1>About Me</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '', 
        email: '',
        telNum: '',
        streetAddress: '',
        city: '', 
        zipCode: '',
        month: '',
        day: '', 
        year: ''
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <fieldset>
          <legend>Contact</legend>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="Jane" />

            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />

          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="jDoe@email.com" />

            <label htmlFor="telNum">Telephone#</label>
            <Field id="telNum" name="telNum" placeholder="818-222-4531" />
          </div>


        </fieldset>

        <fieldset>
          <legend>Location</legend>

          <label htmlFor="streetAddress">Street Address</label>
          <Field id="streetAddress" name="streetAddress" placeholder="123 Easy Street" />

          <label htmlFor="city">City</label>
          <Field id="city" name="city" placeholder="Los Angeles" />

          <label htmlFor="zip">Zip Code</label>
          <Field id="zip" name="zip" placeholder="92120" />

        </fieldset>


        <fieldset>
          <legend>Demographics</legend>

          <Field as="select" name="month">
              <option value='' >Month</option>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
            </Field>

  
          <Field as="select" name="month">
              <option value="">Day</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
          </Field>


          <Field as="select" name="year">
              <option value="">Year</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
          </Field>


          <div id="gender-radio-group">Gender</div>
            <div role="group" aria-labelledby="gender-radio-group">
              <label>
                <Field type="radio" name="picked" value="Male" />
                Male
              </label>
              <label>
                <Field type="radio" name="picked" value="Female" />
                Female
              </label>
              {/* <div>Picked: {values.picked}</div> */}
            </div>


          </fieldset>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
 );

export default AboutMe; 