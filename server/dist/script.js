"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_server_1 = require("apollo-server");
const typedef_1 = __importDefault(require("./graphql/typedef"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const auth_1 = require("./utils/auth");
dotenv_1.default.config();
const main = async () => {
    try {
        const app = express_1.default();
        const PORT = process.env.PORT;
        const GRAPHQL_PORT = process.env.GRAPHQL_PORT;
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(cors_1.default());
        const server = new apollo_server_1.ApolloServer({
            typeDefs: typedef_1.default,
            resolvers: resolvers_1.default,
            context: ({ req }) => {
                let { user, errors } = auth_1.isAuth(req);
                return { user, errors };
            },
        });
        server.listen({ port: GRAPHQL_PORT })
            .then(({ url }) => console.log(`server listening at ${url}`))
            .catch(err => console.log(`apollo error: ${err.message}`));
        app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
    }
    catch (error) {
        console.log('--------- server error -------------', error.message);
    }
};
main();
//# sourceMappingURL=script.js.map