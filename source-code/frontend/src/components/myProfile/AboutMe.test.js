import React from "react";
import { render } from "@testing-library/react";
import AboutMe from "./AboutMe";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <AboutMe />
    </MemoryRouter>
  );
});