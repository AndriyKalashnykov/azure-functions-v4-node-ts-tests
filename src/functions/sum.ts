import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function sum(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  if (request.method === "GET") {
    return {
      status: 200,
      body: "Use POST method with a JSON body containing 'a' and 'b' to calculate their sum.",
    };
  } else if (request.method === "POST") {
    try {
      const { a, b } = (await request.json()) as { a: number; b: number };
      if (typeof a !== "number" || typeof b !== "number") {
        return {
          status: 400,
          body: "Invalid input. Please provide two numbers 'a' and 'b' in the request body.",
        };
      }
      return {
        status: 200,
        jsonBody: { sum: a + b },
      };
    } catch (error) {
      return {
        status: 400,
        body: "Invalid request body. Please provide a valid JSON object.",
      };
    }
  } else {
    return {
      status: 405,
      body: "Method not allowed. Please use GET or POST.",
    };
  }
}

app.http("sum", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: sum,
});
