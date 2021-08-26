const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
    
                return userData;
            }
    
            throw new AuthError("You are not logged in!")
        }
    },

    Mutation: {
        addUser: async (args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async ({ email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const crctpw = await user.isCorrectPassword(password)
            if (!crctpw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
    }

};

module.exports = resolvers;