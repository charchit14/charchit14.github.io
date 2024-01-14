// Importing modules
import express, { Express } from "express";
import cors from "cors";
import "reflect-metadata";
import config from "./configs";
import routes from "./routes";
import databaseConnection from "./database/connection";
// import logHandler from "./middlewares/LogHandler";
import errorHandler from "./middlewares/ErrorHandler";
import pathNotFound from "./middlewares/PathNotFound";


// Initializing server
const app: Express = express();
const PORT = config.serverPort;


// Connecting to the database
databaseConnection();


// Midllewares
// Middleware to handle cors
app.use(
  cors()
);

// Middleware to parse request body
app.use(express.json());

// Middleware to parse url encoded request body
app.use(express.urlencoded({ extended: false }));

// Middleware to handle logging
// app.use(logHandler);

// Middleware to handle routes
app.use(routes);

// Middleware to handle 404 routes responses
app.use(pathNotFound);

// Middleware to handle errors
app.use(errorHandler);


// Initializing the server on port 5005
app.listen(PORT, () => {
  console.log(`The server is up and running on http://localhost:${PORT}`);
});
