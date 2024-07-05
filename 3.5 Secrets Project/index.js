//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { get } from 'http';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());

function checkPassword(req, res, next) {
  if (req.body.password === "ILoveProgramming") {
    next();
  } else {
    res.redirect("/");
  }
}



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
} );

// Protected route using the password check middleware
app.post('/check', checkPassword, (req, res) => {
  // Handle the request after password check
  res.sendFile(__dirname + "/public/secret.html");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

