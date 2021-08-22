const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const cors = require('cors');
const data = require('./data');

const app = express();

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    movie: {
      type: MovieType,
      description: 'A single movie',
      args: {
        id: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: (parent, args) =>
        data.movies.find(movie => movie.id === args.id),
    },
    movies: {
      type: new GraphQLList(MovieType),
      description: 'List of movies',
      resolve: () => data.movies,
    },
    directors: {
      type: new GraphQLList(DirectorType),
      description: 'List of directors',
      resolve: () => data.directors,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Root mutations',
  fields: () => ({
    addMovie: {
      type: MovieType,
      description: 'Add movie',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const movie = {
          id: data.movies.length + 1,
          name: args.name,
          directorId: args.directorId,
        };
        data.movies.push(movie);
        return movie;
      },
    },
    addDirector: {
      type: DirectorType,
      description: 'Add a director',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const director = {
          id: data.directors.length + 1,
          name: args.name,
        };
        data.directors.push(director);
        return director;
      },
    },
  }),
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'This represents a movie directed by a director',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    directorId: { type: GraphQLNonNull(GraphQLInt) },
    director: {
      type: DirectorType,
      resolve: movie => {
        return data.directors.find(
          director => director.id === movie.directorId,
        );
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  description: 'This represents a director of a movie',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: director => {
        return data.movies.filter(movie => movie.directorId === director.id);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(4000, () => console.log('Server running.'));
