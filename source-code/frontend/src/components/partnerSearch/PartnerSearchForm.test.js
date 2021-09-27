import React from "react";
import { render } from "@testing-library/react";
import PartnerSearchForm from "./PartnerSearchForm";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <PartnerSearchForm />
    </MemoryRouter>
  );
});