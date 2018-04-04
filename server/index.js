require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");

const checkForSession = require("./middlewares/checkForSession");

const swagController = require("./controllers/swag_controller");
const authController = require("./controllers/auth_controller");
const cartController = require("./controllers/cart_controller");
const searchController = require("./controllers/search_controller");
const app = express();

app.use(json());

app.use(
  session({
    secret: process.env.CONNECTION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 100000
    }
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

//swag
app.get("/api/swag", swagController.readSwag);
app.post("/api/login", authController.login);

//auth
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

//cart
app.post("/api/cart", cartController.add);
app.post("/api/cart/checkout", cartController.checkout);
app.delete("/api/cart", cartController.delete);

//search
app.get("/api/search", searchController.search);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on Port: ${process.env.PORT || 3001}`);
});
