import React from "react";
import { render } from "@testing-library/react";
import MatchAvail from "./MatchAvail";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <MatchAvail />
    </MemoryRouter>
  );
});