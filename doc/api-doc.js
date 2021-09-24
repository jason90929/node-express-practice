const apiDoc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "app API.",
    version: "1.0.0",
  },
  definitions: {
    Todo: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        message: {
          type: "string",
        },
      },
      required: ["id", "message"],
    },
    User: {
      type: "object",
      properties: {
        username: {
          type: "string",
          description: 'email',
        },
        password: {
          type: "string",
        },
      },
      required: ["username", "password"],
    },
  },
  paths: {},
};

module.exports = apiDoc;
