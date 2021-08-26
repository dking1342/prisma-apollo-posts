"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
const posts = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await prisma.post.findMany();
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
        createPost: async (_, { title, body, userId }) => {
            try {
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
        updatePost: async (_, args) => {
            try {
                const currentPost = await prisma.post.findUnique({
                    where: {
                        uuid: args.postId
                    }
                });
                if (currentPost) {
                    let title = args.title ? args.title : currentPost.title;
                    let body = args.body ? args.body : currentPost.body;
                    let post = await prisma.post.update({
                        where: {
                            uuid: args.postId
                        },
                        data: {
                            title,
                            body,
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
        deletePost: async (_, { postId }) => {
            try {
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