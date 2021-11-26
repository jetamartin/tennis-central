import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Join from "./Join";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
  
function registerUser(values) {
  return {
    userinfo: {
      token: "DEF",
      userId: 4,
      username: "fJones",
      firstName: "Frank",
    },
  };
}

it("renders without crashing", function () {
  render(<Join />);
});

it("Allow the user to register", async () => {
  // create a history object - otherwise useHistory() will throw an error
  const history = createMemoryHistory();
  // create a spy to spy on the 'push' method of our history object
  const pushSpy = jest.spyOn(history, "push");

  // wrap our component in a Router which provides our history object to our Login component
  // via the useHistory() hook
  const { queryByText, getByLabelText, getByText, debug } = render(
    <Router history={history}>
      <Join registerUser={registerUser} />
    </Router>
  );
  const userName = getByLabelText("Username");
  const password = getByLabelText("Password");
  const confirmPassword = getByLabelText("Confirm Password");
  const firstName = getByLabelText("First Name");
  const lastName = getByLabelText("Last Name");
  const email = getByLabelText("Email");
  const submitBtn = queryByText("Submit");

  // fire our events

  fireEvent.change(userName, { target: { value: "fJones" } });
  fireEvent.change(password, { target: { value: "1234" } });
  fireEvent.change(confirmPassword, { target: { value: "1234" } });
  fireEvent.change(firstName, { target: { value: "Frank" } });
  fireEvent.change(lastName, { target: { value: "Jones" } });
  fireEvent.change(email, { target: { value: "fJones@email.com" } });
  fireEvent.click(submitBtn);

  // wait for our functions to be called
  await waitFor(() => {
    // Expect that our spy was called with '/'
    expect(pushSpy).toHaveBeenCalledWith("/");
  });
});
