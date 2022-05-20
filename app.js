import "dotenv/config.js";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import permissionRoutes from "./routes/permissions.js";
import variableRoutes from "./routes/variables.js"
import localRoutes from "./routes/locales.js"

const MONGODB_URI = process.env.MONGODB_URI;

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Módulo Central",
      version: "0.1.0"
    },
    servers: [{url: "http://localhost:5000"}],
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(bodyParser.json());

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
//app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use("/locales", localRoutes);
app.use("/variables", variableRoutes);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
//app.use("/permissions", permissionRoutes);
app.use("/variables", variableRoutes);


// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const errors = status === 422 ? err.errors : undefined;
  res.status(status).json({
    message: err.message,
    errors: errors,
  });
});

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    console.log("Connected to database: " + MONGODB_URI);
    app.listen(5000);
  })
  .catch((err) => console.log(err));
