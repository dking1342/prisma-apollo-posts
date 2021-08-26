"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
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
        createUser: async (_, { email, name }) => {
            try {
                const user = await prisma.user.create({
                    data: {
                        uuid: crypto_1.randomUUID().toString(),
                        email: email,
                        name: name,
                        posts: {
                            create: []
                        }
                    },
                });
                if (user) {
                    return {
                        data: user
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
        updateUser: async (_, args) => {
            try {
                let currentUser = await prisma.user.findUnique({
                    where: {
                        uuid: args.userId
                    }
                });
                if (currentUser) {
                    let name = args.name ? args.name : currentUser.name;
                    let user = await prisma.user.update({
                        where: {
                            uuid: args.userId
                        },
                        data: {
                            name
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
        deleteUser: async (_, { userId }) => {
            try {
                const user = await prisma.user.delete({
                    where: {
                        uuid: userId
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