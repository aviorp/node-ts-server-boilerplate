export default {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Node Express Skeleton",
    description: "A Skeleton made for self use.",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  tags: [
    {
      name: "Users",
      description: "API for users in the system",
    },
    {
      name: "Auth",
      description: "User Authentications & register.",
    },
  ],
  paths: {
    "/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users in the api.",
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/Users",
            },
          },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Creates a new users in the api.",
        description: "Creates a new user in the api by username, password, and email.",
        parameters: [
          {
            name: "user",
            in: "body",
            description: "User object.",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          201: {
            description: "User Created",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get specific user by his id.",
        parameters: [
          {
            type: "string",
            name: "id",
            in: "path",
            required: true,
            description: "User that we want to get, represented by his id.",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/Users",
            },
          },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update specific user by his id.",
        parameters: [
          {
            type: "string",
            name: "id",
            in: "path",
            required: true,
            description: "User that we want to update, represented by his id.",
          },
          {
            name: "user",
            in: "body",
            description: "User that we want to update",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "User Updated.",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "delete specific user by his id.",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "string",
            description: "ID that we want to delete user with.",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          200: {
            description: "User Deleted.",
          },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register New User",
        parameters: [
          {
            name: "user",
            in: "body",
            description: "User that we want to create",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          201: {
            description: "User Created.",
            schema: {
              $ref: "#/definitions/User",
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login to the Server",
        parameters: [
          {
            name: "user",
            in: "body",
            description: "Send credentials and the server will send you a valid token.",
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          201: {
            description: "Valid Token.",
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: ["email", "_id", "password"],
      properties: {
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },

        phone: {
          type: "string",
        },
        image: {
          type: "string",
        },
      },
    },
    Users: {
      type: "array",
      $ref: "#/definitions/User",
    },
  },
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

// export default {
//   swagger: "2.0",
//   info: {
//     title: "My APIIII",
//     description: "Description",
//     version: "1.0.0"
//   },
//   host: "localhost:3300",
//   basePath: "/",
//   schemes: ["http"],
//   paths: {
//     "/": {
//       get: {
//         tags: ["Users"],
//         description: "Gets all the users in the api.",
//         parameters: [],
//         responses: {
//           "200": {
//             description: "Some description...",
//             schema: {
//               $ref: "#/definitions/User"
//             }
//           }
//         }
//       },
//       post: {
//         description: "",
//         parameters: [],
//         responses: {
//           "201": {
//             description: "Created"
//           }
//         }
//       }
//     },
//     "/{id}": {
//       get: {
//         description: "",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "string"
//           }
//         ],
//         responses: {
//           "200": {
//             description: "OK"
//           }
//         }
//       },
//       put: {
//         description: "",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "string"
//           },
//           {
//             name: "body",
//             in: "body",
//             schema: {
//               type: "object",
//               properties: {
//                 id: {
//                   example: "any"
//                 }
//               }
//             }
//           }
//         ],
//         responses: {
//           "201": {
//             description: "Created"
//           }
//         }
//       },
//       delete: {
//         description: "",
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             type: "string"
//           }
//         ],
//         responses: {
//           "200": {
//             description: "OK"
//           }
//         }
//       }
//     }
//   },
//   definitions: {
//     User: {
//       type: "object",
//       properties: {
//         name: {
//           type: "string",
//           example: "User"
//         },
//         properties: {
//           type: "object",
//           properties: {
//             id: {
//               type: "object",
//               properties: {
//                 type: {
//                   type: "string",
//                   example: "string"
//                 },
//                 description: {
//                   type: "string",
//                   example: "The user ID."
//                 }
//               }
//             },
//             name: {
//               type: "object",
//               properties: {
//                 type: {
//                   type: "string",
//                   example: "string"
//                 },
//                 description: {
//                   type: "string",
//                   example: "Name of the user."
//                 }
//               }
//             },
//             email: {
//               type: "object",
//               properties: {
//                 type: {
//                   type: "string",
//                   example: "string"
//                 },
//                 description: {
//                   type: "string",
//                   example: "Email of the user."
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// };
