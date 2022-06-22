import express from "express";
import * as config from "./config.json";
import { routes } from "./routes";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import Store from "connect-mongo";
require("./strategies/discord");

const app = express();
const port = config.port || 3001;

mongoose.connect(config.mongo_uri);

app.use(
  session({
    secret: config.discord_client.client_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    store: Store.create({ mongoUrl: config.mongo_uri }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.listen(port, () => console.log(`Server running in port ${port}`));
