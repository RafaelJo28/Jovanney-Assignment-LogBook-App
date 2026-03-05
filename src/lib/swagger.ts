import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment Log Book API",
      version: "1.0.0",
      description: "REST API for managing assignments built with Next.js",
    },
    servers: [{ url: "http://localhost:3000", description: "Development Server" }],
    components: {
      schemas: {
        Assignment: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            title: { type: "string", example: "REST API with Next.js" },
            subject: { type: "string", example: "Web Development" },
            description: { type: "string" },
            dueDate: { type: "string", format: "date", example: "2025-04-01" },
            status: { type: "string", enum: ["pending", "in-progress", "completed"] },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateAssignment: {
          type: "object",
          required: ["title", "subject", "dueDate"],
          properties: {
            title: { type: "string" },
            subject: { type: "string" },
            description: { type: "string" },
            dueDate: { type: "string", format: "date" },
            status: { type: "string", enum: ["pending", "in-progress", "completed"], default: "pending" },
            priority: { type: "string", enum: ["low", "medium", "high"], default: "medium" },
          },
        },
        UpdateAssignment: {
          type: "object",
          properties: {
            title: { type: "string" },
            subject: { type: "string" },
            description: { type: "string" },
            dueDate: { type: "string", format: "date" },
            status: { type: "string", enum: ["pending", "in-progress", "completed"] },
            priority: { type: "string", enum: ["low", "medium", "high"] },
          },
        },
        Error: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
    },
    paths: {
      "/api/assignments": {
        get: {
          tags: ["Assignments"],
          summary: "Get all assignments",
          responses: {
            "200": {
              description: "List of assignments",
              content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, count: { type: "integer" }, data: { type: "array", items: { $ref: "#/components/schemas/Assignment" } } } } } },
            },
          },
        },
        post: {
          tags: ["Assignments"],
          summary: "Create a new assignment",
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CreateAssignment" } } } },
          responses: {
            "201": { description: "Assignment created", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { $ref: "#/components/schemas/Assignment" } } } } } },
            "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
      },
      "/api/assignments/{id}": {
        get: {
          tags: ["Assignments"],
          summary: "Get assignment by ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Assignment found", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { $ref: "#/components/schemas/Assignment" } } } } } },
            "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
        put: {
          tags: ["Assignments"],
          summary: "Update an assignment",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateAssignment" } } } },
          responses: {
            "200": { description: "Assignment updated", content: { "application/json": { schema: { type: "object", properties: { success: { type: "boolean" }, data: { $ref: "#/components/schemas/Assignment" } } } } } },
            "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
            "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
        delete: {
          tags: ["Assignments"],
          summary: "Delete an assignment",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            "200": { description: "Deleted successfully" },
            "404": { description: "Not found", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);