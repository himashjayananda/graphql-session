const directors = [
  { id: 1, name: "Christopher Nolan" },
  { id: 2, name: "Steven Spielberg" },
  { id: 3, name: "James Cameron" },
  { id: 4, name: "Peter Jackson" },
];

const movies = [
  { id: 1, name: "Interstellar", directorId: 1 },
  { id: 2, name: "Dunkirk", directorId: 1 },
  { id: 3, name: "The Dark Knight", directorId: 1 },
  { id: 4, name: "Jurassic Park", directorId: 2 },
  { id: 5, name: "Ready Player One", directorId: 2 },
  { id: 6, name: "Saving Private Ryan", directorId: 2 },
  { id: 7, name: "Titanic", directorId: 3 },
  { id: 8, name: "Avatar", directorId: 3 },
  { id: 9, name: "The Fellowship of the Ring", directorId: 4 },
  { id: 10, name: "The Two Towers", directorId: 4 },
];

module.exports = { directors, movies };
