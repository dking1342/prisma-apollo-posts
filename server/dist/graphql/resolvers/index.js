"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersResolver_1 = __importDefault(require("./UsersResolver"));
const PostsResolver_1 = __importDefault(require("./PostsResolver"));
const resolvers = {
    Query: Object.assign(Object.assign({}, UsersResolver_1.default.Query), PostsResolver_1.default.Query),
    Mutation: Object.assign(Object.assign({}, UsersResolver_1.default.Mutation), PostsResolver_1.default.Mutation)
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map