import Ajv from "ajv";

const presentationSchema = {
    type: "object",
    properties: {
        presentation: {
            type: "object",
            required: ["name", "slides"],
            properties: {
                name: { type: "string" },
                slides: {
                    type: "array",
                    items: {
                        type: "object",
                        required: ["id", "background", "content"],
                        properties: {
                            id: { type: "string" },
                            background: {
                                type: "object",
                                required: ["type", "color"],
                                properties: {
                                    type: { type: "number" },
                                    color: { type: "string" },
                                },
                            },
                            content: {
                                type: "array",
                                items: {
                                    type: "object",
                                    required: ["id", "position", "size", "type"],
                                    properties: {
                                        id: { type: "string" },
                                        position: {
                                            type: "object",
                                            required: ["x", "y"],
                                            properties: {
                                                x: { type: "number" },
                                                y: { type: "number" },
                                            },
                                        },
                                        size: {
                                            type: "object",
                                            required: ["w", "h"],
                                            properties: {
                                                w: { type: "number" },
                                                h: { type: "number" },
                                            },
                                        },
                                        type: { type: "number" },
                                        textcontent: { type: "string" },
                                        font: { type: "string" },
                                        fontsize: { type: "number" },
                                        fontcolor: { type: "string" },
                                        url: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const ajv = new Ajv();
const validate = ajv.compile(presentationSchema);

export const validatePresentation = (data: unknown) => {
    const isValid = validate(data);
    return { isValid, errors: validate.errors };
};
