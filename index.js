const { ApolloServer, gql } = require("apollo-server");
const SessionAPI = require("./dataSource/sessions");
const typeDefs = gql`
  type Query {
    sessions: [Session]
    getSessionById(id: ID): Session
  }

  type Session {
    id: ID!
    title: String
    description: String @deprecated(reason: "description is not going further")
    startDate: String
    endDate: String
    level: String
  }
  type Mutation {
    addNewSession(session: SessionInput): Session
  }

  input SessionInput {
    title: String
    description: String
    startDate: String
    endDate: String
    level: String
  }
`;
const resolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessions();
    },
    getSessionById: (parent, { id }, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessionById(id);
    },
  },
  Mutation: {
    addNewSession: (parent, { session }, { dataSources }, info) => {
      console.log(session);
      return dataSources.sessionAPI.addNewSession(session);
    },
  },
};

const dataSources = () => ({ sessionAPI: new SessionAPI() });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  tracing: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
