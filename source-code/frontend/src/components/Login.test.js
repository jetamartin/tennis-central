import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

function loginUser() {
  console.log('In loginUser')
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
  debugger;
  const { queryByText, getByLabelText, getByText, debug } = render(
    <Login loginUser={loginUser} />
  );
  const userNameInput = getByLabelText("Username");
  const passwordInput = getByLabelText("Password");
  const submitBtn = queryByText("Submit");
  console.log(submitBtn);
  
  await waitFor(() => {
    fireEvent.change(userNameInput, { target: { value: "jMartin" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(submitBtn);
  });
  await waitFor(() => {
    expect(queryByText("Logout jMartin")).toBeInTheDocument();
    debug();
  });

  debugger;
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
