import React from "react";
import ReactDOM from "react-dom";

import {Color, Text, Margin } from "@ds.e/react/lib";
import Select from "@ds.e/react/lib/molecules/Select/index"

import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/global.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Select.css"

const options = [{
  label: 'Strict Black',
  value: 'strict-black'
}, {
  label: 'Heavenly Green',
  value: 'heavenly-green'
}, {
  label: 'Sweet Pink',
  value: 'pink'
}]

ReactDOM.render(
    <Select options={options}/>,
  // <div>
  //   <Margin>
  // <Color hexCode="#000" width="xl" height="xl"/>
  // <Text>some text</Text>
  // </Margin>
  // </div>,
  document.querySelector("#root")
);
