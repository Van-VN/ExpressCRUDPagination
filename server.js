const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./src/router/web.router");
const app = express();
const port = 8000;
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(router);
app.use(fileUpload({ createParentPath: true }));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
