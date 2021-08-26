"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = __importDefault(require("argon2"));
const crypto_1 = require("crypto");
const auth_1 = require("../../utils/auth");
const verification_1 = require("../../utils/verification");
const prisma = new client_1.PrismaClient();
const users = {
    Query: {
        getUsers: async () => {
            try {
                const user = await prisma.user.findMany({
                    include: {
                        posts: true
                    }
                });
                if (user) {
                    return {
                        users: user
                    };
                }
                else {
                    return {
                        errors: [
                            {
                                field: 'user',
                                message: 'no users found'
                            }
                        ]
                    };
                }
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: 'fetch',
                            message: error.message
                        }
                    ]
                };
            }
        },
        getUser: async (_, { userId }) => {
            try {
                let user = await prisma.user.findUnique({
                    where: {
                        uuid: userId
                    },
                    include: {
                        posts: true
                    }
                });
                if (user) {
                    return {
                        data: user
                    };
                }
                else {
                    return {
                        errors: [{
                                field: 'user',
                                message: 'user not found'
                            }]
                    };
                }
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: 'fetch',
                            message: error.message
                        }
                    ]
                };
            }
        },
    },
    Mutation: {
        register: async (_, { email, username, password }) => {
            try {
                const isExist = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                let inputs = { email, username, password, isExist: Boolean(isExist) };
                let { valid, valErrors } = verification_1.verification(inputs);
                if (!valid) {
                    return {
                        errors: valErrors
                    };
                }
                const hash = await argon2_1.default.hash(password);
                const user = await prisma.user.create({
                    data: {
                        uuid: crypto_1.randomUUID().toString(),
                        email,
                        username: username,
                        password: hash,
                        posts: {
                            create: []
                        }
                    },
                });
                if (user) {
                    let token = auth_1.generateToken(user);
                    let registerUser = Object.assign(Object.assign({}, user), { token });
                    return {
                        data: registerUser
                    };
                }
                else {
                    return {
                        errors: [
                            {
                                field: 'user',
                                message: 'user was not created'
                            }
                        ]
                    };
                }
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: 'fetch',
                            message: error.message
                        }
                    ]
                };
            }
        },
        login: async (_, { email, password }) => {
            try {
                let inputs = { email, password };
                let { valid, valErrors } = verification_1.verification(inputs);
                if (!valid) {
                    return {
                        errors: valErrors
                    };
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!user) {
                    return {
                        errors: [
                            {
                                field: 'email',
                                message: 'user does not exist'
                            }
                        ]
                    };
                }
                const isValidPassword = await argon2_1.default.verify(user.password, password);
                if (!isValidPassword) {
                    return {
                        errors: [
                            {
                                field: 'password',
                                message: 'password is incorrect'
                            }
                        ]
                    };
                }
                const token = auth_1.generateToken(user);
                let loginUser = Object.assign(Object.assign({}, user), { token });
                return {
                    data: loginUser
                };
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: 'fetch',
                            message: error.message
                        }
                    ]
                };
            }
        },
        updateUser: async (_, args, context) => {
            try {
                let { valid, valErrors } = auth_1.authCheck(args.email, context);
                if (!valid) {
                    return {
                        errors: valErrors
                    };
                }
                let currentUser = await prisma.user.findUnique({
                    where: {
                        email: args.email
                    }
                });
                if (currentUser) {
                    let username = args.username ? args.username : currentUser.username;
                    let user = await prisma.user.update({
                        where: {
                            email: args.email
                        },
                        data: {
                            username
                        }
                    });
                    return {
                        data: user
                    };
                }
                else {
                    return {
                        errors: [
                            {
                                field: 'user',
                                message: 'user not found'
                            }
                        ]
                    };
                }
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: 'fetch',
                            message: error.message
                        }
                    ]
                };
            }
        },
        deleteUser: async (_, { email }, context) => {
            try {
                let { valid, valErrors } = auth_1.authCheck(email, context);
                if (!valid) {
                    return {
                        errors: valErrors
                    };
                }
                const user = await prisma.user.delete({
                    where: {
                        email
                    }
                });
                return {
                    data: user
                };
            }
            catch (error) {
                return {
                    errors: [
                        {
                            field: 'fetch',
                            message: error.message
                        }
                    ]
                };
            }
        },
    }
};
exports.default = users;
//# sourceMappingURL=UsersResolver.js.map