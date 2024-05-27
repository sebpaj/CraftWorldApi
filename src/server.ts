import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// Define a schema
const schema = buildSchema(`
  type Query {
    materials: [String!]!
    sources: [String!]!

  }
`);

// Define a resolver
const root = {
  materials: () => ["Wood", "Stone"],
  sources: () => ["Oak Forest", "Quarry"],
};

const app = express();

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
