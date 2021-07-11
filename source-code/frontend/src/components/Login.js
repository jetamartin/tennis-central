import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="username">Username</label>
        <Field id="username" name="username" placeholder="JaneDoe" />

        <label htmlFor="password">Password</label>
        <Field id="password" name="password" placeholder="Password123" />


        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
 );

export default Login;