const { skip } = require('graphql-resolvers');

module.exports.isAuthenticated = (_, __, { email }) => {
    if (!email) {
        throw new Error ('Access denied! no token provided, Please login');
    }
    return skip;
}