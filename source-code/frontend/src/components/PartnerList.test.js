import React from "react";
import { render } from "@testing-library/react";
import PartnerList from "./PartnerList";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <PartnerList />
    </MemoryRouter>
  );
});