import {
  HttpRequest,
  HttpRequestInit,
  InvocationContext,
} from "@azure/functions";
import { sum } from "../functions/sum";

describe("sum function", () => {
  const mockContext: InvocationContext = {} as InvocationContext;

  it("should return a message for GET requests", async () => {
    const requestInit: HttpRequestInit = {
      method: "GET",
      url: "http://localhost:7071/api/sum",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const mockRequest = new HttpRequest(requestInit);
    const response = await sum(mockRequest, mockContext);

    expect(response.status).toBe(200);
    expect(response.body).toBe(
      "Use POST method with a JSON body containing 'a' and 'b' to calculate their sum."
    );
  });

  it("should return the sum for valid POST requests", async () => {
    const requestInit: HttpRequestInit = {
      method: "POST",
      url: "http://localhost:7071/api/sum",
      headers: {
        "Content-Type": "application/json",
      },
      body: { string: JSON.stringify({ a: 5, b: 3 }) },
    };
    const mockRequest = new HttpRequest(requestInit);
    const response = await sum(mockRequest, mockContext);

    expect(response.status).toBe(200);
    expect(response.jsonBody).toEqual({ sum: 8 });
  });

  it("should return 400 for POST requests with invalid input", async () => {
    const requestInit: HttpRequestInit = {
      method: "POST",
      url: "http://localhost:7071/api/sum",
      headers: {
        "Content-Type": "application/json",
      },
      body: { string: JSON.stringify({ a: "5", b: 3 }) },
    };
    const mockRequest = new HttpRequest(requestInit);
    const response = await sum(mockRequest, mockContext);

    expect(response.status).toBe(400);
    expect(response.body).toBe(
      "Invalid input. Please provide two numbers 'a' and 'b' in the request body."
    );
  });

  it("should return 400 for POST requests with invalid JSON body", async () => {
    const requestInit: HttpRequestInit = {
      method: "POST",
      url: "http://localhost:7071/api/sum",
      headers: {
        "Content-Type": "application/json",
      },
      body: { string: "invalid-json" },
    };
    const mockRequest = new HttpRequest(requestInit);
    jest
      .spyOn(mockRequest, "json")
      .mockRejectedValue(new Error("Invalid JSON"));

    const response = await sum(mockRequest, mockContext);

    expect(response.status).toBe(400);
    expect(response.body).toBe(
      "Invalid request body. Please provide a valid JSON object."
    );
  });

  it("should return 405 for unsupported HTTP methods", async () => {
    const requestInit: HttpRequestInit = {
      method: "PUT",
      url: "http://localhost:7071/api/sum",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const mockRequest = new HttpRequest(requestInit);
    const response = await sum(mockRequest, mockContext);

    expect(response.status).toBe(405);
    expect(response.body).toBe("Method not allowed. Please use GET or POST.");
  });
});
