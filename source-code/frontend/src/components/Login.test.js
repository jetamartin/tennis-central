import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

function loginUser() {
  return {
    userinfo: {
      token: "ABC",
      userId: 3,
      username: "jMartin",
      firstName: "Jet",
    },
  };
}

it("renders without crashing", function () {
  render(<Login />);
});


it("Allow the user to successfully login", async () => {
  // createa history object - otherwise useHistory() will throw an error
  const history = createMemoryHistory()
  // create a spy to spy on the 'push' method of our history object
  const pushSpy = jest.spyOn(history, 'push')

  // wrap our component in a Router which provides our history object to our Login component
  // via the useHistory() hook
  const { queryByText, getByLabelText, getByText, debug } = render(
    <Router history={history}>
      <Login loginUser={loginUser} />
    </Router>
  );

  const userNameInput = getByLabelText("Username");
  const passwordInput = getByLabelText("Password");
  const submitBtn = queryByText("Submit");

  // fire our events
  fireEvent.change(userNameInput, { target: { value: "jMartin" } });
  fireEvent.change(passwordInput, { target: { value: "1234" } });
  fireEvent.click(submitBtn);

  // wait for our functions to be called
  await waitFor(() => {
    // Expect that our spy was called with '/' 
    expect(pushSpy).toHaveBeenCalledWith('/')
  });
});

// it("works when you click on the right arrow", function() {
//   const { queryByTestId, queryByAltText } = render(<Carousel />);

//   // expect the first image to show, but not the second
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

//   // move forward in the carousel
//   const rightArrow = queryByTestId("right-arrow");
//   fireEvent.click(rightArrow);

//   // expect the second image to show, but not the first
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
// });
