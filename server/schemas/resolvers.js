const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("password");
            }
    
            throw new AuthenticationError("You are not logged in!");
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({
                $or: [{ username: username }, { email: email }],
            });
      
            if (!user) {
              throw new AuthenticationError('Incorrect email and password!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect email and password!');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
    },
};


module.exports = resolvers;