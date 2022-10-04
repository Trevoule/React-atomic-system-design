import React from "react";
import ReactDOM from "react-dom";

import Color from "@ds.e/react/src/atoms/Color";
import Text from "@ds.e/react/src/atoms/Text";

import "@ds.e/scss/lib/Utilities.css";

ReactDOM.render(
  <div>
  <Color hexCode="#000" width="xl" height="xl"/>
  <Text>some text</Text>
  </div>,
  document.querySelector("#root")
);
