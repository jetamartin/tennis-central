import React from 'react';
import { Formik, Field, Form } from 'formik';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MatchAvail = () => (
  <div>
    <h1>Match Availability</h1>
    <Formik
      initialValues={{
  
      }}
      onSubmit={async (values) => {
        await sleep(500);
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          {/* 
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
          <div id="checkbox-group">Monday</div>
          <div role="group" aria-labelledby="monday-group">
            <label>
              <Field type="checkbox" name="Monday" value="eAM" />
              Early Morning (5am - 9am)
            </label>
            <label>
              <Field type="checkbox" name="Monday" value="AM" />
              Morning (9am - Noon)
            </label>
            <label>
              <Field type="checkbox" name="Monday" value="PM" />
              Afternoon (Noon - 5pm)
            </label>
            <label>
              <Field type="checkbox" name="Monday" value="EVE" />
              Evening (5pm - 10pm)
            </label>
          </div>

          <div id="checkbox-group">Tuesday</div>
          <div role="group" aria-labelledby="tuesday-group">
            <label>
              <Field type="checkbox" name="Tuesday" value="eAM" />
              Early Morning (5am - 9am)
            </label>
            <label>
              <Field type="checkbox" name="Tuesday" value="AM" />
              Morning (9am - Noon)
            </label>
            <label>
              <Field type="checkbox" name="Tuesday" value="PM" />
              Afternoon (Noon - 5pm)
            </label>
            <label>
              <Field type="checkbox" name="Tuesday" value="EVE" />
              Evening (5pm - 10pm)
            </label>
          </div>

          <div id="checkbox-group">Wednesday</div>
          <div role="group" aria-labelledby="wednesday-group">
            <label>
              <Field type="checkbox" name="Wednesday" value="eAM" />
              Early Morning (5am - 9am)
            </label>
            <label>
              <Field type="checkbox" name="Wednesday" value="AM" />
              Morning (9am - Noon)
            </label>
            <label>
              <Field type="checkbox" name="Wednesday" value="PM" />
              Afternoon (Noon - 5pm)
            </label>
            <label>
              <Field type="checkbox" name="Wednesday" value="EVE" />
              Evening (5pm - 10pm)
            </label>
          </div>

          <div id="checkbox-group">Thursday</div>
          <div role="group" aria-labelledby="thursday-group">
            <label>
              <Field type="checkbox" name="Thursday" value="eAM" />
              Early Morning (5am - 9am)
            </label>
            <label>
              <Field type="checkbox" name="Thursday" value="AM" />
              Morning (9am - Noon)
            </label>
            <label>
              <Field type="checkbox" name="Thursday" value="PM" />
              Afternoon (Noon - 5pm)
            </label>
            <label>
              <Field type="checkbox" name="Thursday" value="EVE" />
              Evening (5pm - 10pm)
            </label>
          </div>

          <div id="checkbox-group">Friday</div>
          <div role="group" aria-labelledby="friday-group">
            <label>
              <Field type="checkbox" name="Friday" value="eAM" />
              Early Morning (5am - 9am)
            </label>
            <label>
              <Field type="checkbox" name="Friday" value="AM" />
              Morning (9am - Noon)
            </label>
            <label>
              <Field type="checkbox" name="Friday" value="PM" />
              Afternoon (Noon - 5pm)
            </label>
            <label>
              <Field type="checkbox" name="Friday" value="EVE" />
              Evening (5pm - 10pm)
            </label>
          </div>

          <div id="checkbox-group">Saturday</div>
          <div role="group" aria-labelledby="saturday-group">
            <label>
              <Field type="checkbox" name="Saturday" value="eAM" />
              Early Morning (5am - 9am)
            </label>
            <label>
              <Field type="checkbox" name="Saturday" value="AM" />
              Morning (9am - Noon)
            </label>
            <label>
              <Field type="checkbox" name="Saturday" value="PM" />
              Afternoon (Noon - 5pm)
            </label>
            <label>
              <Field type="checkbox" name="Saturday" value="EVE" />
              Evening (5pm - 10pm)
            </label>
          </div>

          <div id="checkbox-group">Sunday</div>
          <div role="group" aria-labelledby="sunday-group">
            <label>
              <Field type="checkbox" name="Sunday" value="eAM" />
              Early Morning (5am - 9am)
            </label>
            <label>
              <Field type="checkbox" name="Sunday" value="AM" />
              Morning (9am - Noon)
            </label>
            <label>
              <Field type="checkbox" name="Sunday" value="PM" />
              Afternoon (Noon - 5pm)
            </label>
            <label>
              <Field type="checkbox" name="Sunday" value="EVE" />
              Evening (5pm - 10pm)
            </label>
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default MatchAvail; 