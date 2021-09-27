import React from "react"; 
import { render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom"; 

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('it renders without crashing', () => {
  render(<MemoryRouter><App /></MemoryRouter>  )
})


