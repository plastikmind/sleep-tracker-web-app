const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const usersRouter = require("./routers/usersRouter");
const authRouter = require("./routers/authRouter");
const indexRouter = require("./routers/indexRouter");
const sleepsRouter = require("./routers/sleepsRouter");

require("./auth.js");

// middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? "true" : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(express.static("../client/build"));
app.use("/static", express.static("../client/build"));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/sleeps", sleepsRouter);
app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   res.send("hello earthling!");
// });

app.listen(5000, () => {
  console.log("server has started");
});
