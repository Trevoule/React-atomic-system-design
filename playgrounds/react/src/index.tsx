import React from "react";
import ReactDOM from "react-dom";

import Color from "@ds.e/react/src/atoms/Color";

import "@ds.e/scss/lib/Utilities.css";

ReactDOM.render(
  <Color hexCode="#000" width="xl" height="xl"/>,
  document.querySelector("#root")
);
