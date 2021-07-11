import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Join = () => (
  <div>
    <h1>Join</h1>
    <Formik
      initialValues={{
        username: '',
        password: '', 

        firstName: '',
        LastName: '',
        email: ''
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="username">Username</label>
        <Field id="username" name="userName" placeholder="jDoe" />

        <label htmlFor="password">Password</label>
        <Field id="password" name="password" placeholder="12345" />

        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="Jane" />

        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />

        <label htmlFor="email">Email</label>
        <Field id="email" name="email" placeholder="jDoe@email.com" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
 );

export default Join;