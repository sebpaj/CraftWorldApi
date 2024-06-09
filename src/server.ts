import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { resolveLocations } from "./resolvers";

// Define a schema
const schema = buildSchema(`
  type Location {
    name: String!
    material: String!
  }

  type Query {
    locations: [Location!]!

  }
`);

// Define a resolver
const root = {
  locations: () => resolveLocations(),
};

const app = express();
app.use(cors());

// Set up the GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
