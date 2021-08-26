import userResolver from './UsersResolver';
import postResolver from './PostsResolver';

const resolvers = {
    Query: {
        ...userResolver.Query,
        ...postResolver.Query,
    },
    Mutation:{
        ...userResolver.Mutation,
        ...postResolver.Mutation
    }
};

export default resolvers;