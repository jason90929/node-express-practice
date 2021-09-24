module.exports = function () {
  let operations = {
    POST,
  };

  function POST(req, res, next) {
    console.log(`Login user: ${JSON.stringify(req.body)}`);
    res.status(201).send();
  }

  POST.apiDoc = {
    summary: "Login users",
    operationId: "login",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: "login",
        schema: {
          $ref: "#/definitions/User",
        },
      },
    ],
    responses: {
      200: {
        description: "Login success",
      },
    },
  };

  return operations;
};
