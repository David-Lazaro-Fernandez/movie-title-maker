import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movie Title Maker API Documentation",
            version: "1.0.0",
            description: "API documentation for the Movie Title Maker project",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            schemas: {
                MovieTeamMember: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Name of the team member"
                        },
                        role: {
                            type: "string",
                            description: "Role in the movie"
                        }
                    }
                }
            }
        },
        paths: {
            "/api": {
                get: {
                    tags: ["Example"],
                    summary: "Get example response",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Hello from Express with TypeScript!"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/files/upload": {
                post: {
                    tags: ["File Processing"],
                    summary: "Upload and process files (alternative endpoint)",
                    requestBody: {
                        content: {
                            "multipart/form-data": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        files: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                                format: "binary"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        "200": {
                            description: "Files processed successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/MovieTeamMember"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwaggerDocs = (app: any) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
