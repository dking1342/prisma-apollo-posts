"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const auth_1 = require("../../utils/auth");
const prisma = new client_1.PrismaClient();
const posts = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await prisma.post.findMany({
                    orderBy: {
                        createdAt: "desc"
                    }
                });
                if (posts) {
                    return {
                        posts: posts
                    };
                }
                else {
                    return {
                        errors: [
                            {
                                field: 'posts',
                                message: 'no posts found'
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
        getPost: async (_, { postId }) => {
            try {
                const post = await prisma.post.findUnique({
                    where: {
                        uuid: postId
                    }
                });
                if (post) {
                    return {
                        data: post
                    };
                }
                else {
                    return {
                        errors: [
                            {
                                field: 'post',
                                message: 'post not found'
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
    },
    Mutation: {
        createPost: async (_, { title, body, userId }, context) => {
            try {
                let user = await prisma.user.findUnique({ where: { uuid: userId } });
                if (!user) {
                    return {
                        errors: [
                            {
                                field: 'user',
                                message: 'User not found'
                            }
                        ]
                    };
                }
                let { valid, valErrors } = auth_1.authCheck(user === null || user === void 0 ? void 0 : user.email, context);
                if (!valid) {
                    return {
                        errors: valErrors
                    };
                }
                const post = await prisma.post.create({
                    data: {
                        title,
                        body: body ? body : '',
                        uuid: crypto_1.randomUUID(),
                        User: {
                            connect: {
                                uuid: userId
                            }
                        }
                    }
                });
                if (post) {
                    return {
                        data: post
                    };
                }
                else {
                    return {
                        errors: [
                            {
                                field: 'post',
                                message: 'post was not created'
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
        updatePost: async (_, { title, body, postId, userId }, context) => {
            try {
                let user = await prisma.user.findUnique({ where: { uuid: userId } });
                if (!user) {
                    return {
                        errors: [
                            {
                                field: 'user',
                                message: 'User not found'
                            }
                        ]
                    };
                }
                let { valid, valErrors } = auth_1.authCheck(user === null || user === void 0 ? void 0 : user.email, context);
                if (!valid) {
                    return {
                        errors: valErrors
                    };
                }
                const currentPost = await prisma.post.findUnique({
                    where: {
                        uuid: postId
                    }
                });
                if (currentPost) {
                    let postTitle = title ? title : currentPost.title;
                    let postBody = body ? body : currentPost.body;
                    let post = await prisma.post.update({
                        where: {
                            uuid: postId
                        },
                        data: {
                            title: postTitle,
                            body: postBody,
                        },
                    });
                    if (post) {
                        return {
                            data: post
                        };
                    }
                    else {
                        return {
                            errors: [
                                {
                                    field: 'post',
                                    message: 'post not updated'
                                }
                            ]
                        };
                    }
                }
                else {
                    return {
                        errors: [
                            {
                                field: 'post',
                                message: 'no post found to be updated'
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
        deletePost: async (_, { postId, userId }, context) => {
            try {
                let user = await prisma.user.findUnique({ where: { uuid: userId } });
                if (!user) {
                    return {
                        errors: [
                            {
                                field: 'user',
                                message: 'User not found'
                            }
                        ]
                    };
                }
                let { valid, valErrors } = auth_1.authCheck(user === null || user === void 0 ? void 0 : user.email, context);
                if (!valid) {
                    return {
                        errors: valErrors
                    };
                }
                const post = await prisma.post.delete({
                    where: {
                        uuid: postId
                    }
                });
                return {
                    data: post
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
        }
    }
};
exports.default = posts;
//# sourceMappingURL=PostsResolver.js.map