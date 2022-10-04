import React from "react";
import ReactDOM from "react-dom";

import {Color, Text, Margin } from "@ds.e/react/lib";

import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/global.css";
import "@ds.e/scss/lib/Text.css";

ReactDOM.render(
  <div>
    <Margin>
  <Color hexCode="#000" width="xl" height="xl"/>
  <Text>some text</Text>
  </Margin>
  </div>,
  document.querySelector("#root")
);
