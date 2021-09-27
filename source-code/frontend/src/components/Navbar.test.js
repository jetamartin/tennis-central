import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
});
