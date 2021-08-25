"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersResolver_1 = __importDefault(require("./UsersResolver"));
const resolvers = {
    Query: Object.assign({}, UsersResolver_1.default.Query),
    Mutation: Object.assign({}, UsersResolver_1.default.Mutation)
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map