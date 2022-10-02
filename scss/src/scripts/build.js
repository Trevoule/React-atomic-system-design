const fs = require("fs");
const path = require("path");
const sass = require("node-sass");

const result = sass.renderSync({
  // data - sass to be compared
  data: fs.readFileSync(path.resolve("src/global.scss")).toString(),
  outputStyle: "expanded",
  outFile: "global.scss",
  //   tells sass where to find scss
  includePaths: [path.resolve("src")],
});

console.log(result.css.toString());

// writing to the path
// content written as well

fs.writeFileSync(path.resolve("src/lib/global.css"), result.css.toString());
