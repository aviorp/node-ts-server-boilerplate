#!/usr/bin/env zx

import swaggerAutogen from "swagger-autogen";
const doc = {
  swagger: "2.0",
  info: {
    title: "My APIIII",
    description: "Description"
  },
  host: "localhost:3300",
  definitions: {
    User: {
      required: ["email", "_id", "password"],
      properties: {
        username: {
          type: "string"
        },
        password: {
          type: "string"
        },
        firstName: {
          type: "string"
        },
        lastName: {
          type: "string"
        },

        phone: {
          type: "string"
        },
        image: {
          type: "string"
        }
      }
    },
    Users: {
      type: "array",
      $ref: "#/definitions/User"
    }
  },
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"]
};

const outputFile = "../docs/output.json";
const endpointsFiles = ["../src/routes/userRoute.ts"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
