import React from "react";
import { render } from "@testing-library/react";
import SkillsPrefs from "./SkillsPrefs";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <SkillsPrefs />
    </MemoryRouter>
  );
});
