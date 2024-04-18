import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de la API",
            description: "Documentacion de las APIs",
        },
        tags: [
        {
            name: "Productos",
            description: "Productos de la tienda",
        },
        {
            name: "Carritos",
            description: "Carritos de compras de la tienda",
        },
        ],
    },
    apis: [`./src/docs/**/*.yaml`],
};
const specs = swaggerJsdoc(swaggerOptions);

export default specs;
