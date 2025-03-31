// Modulos //

import express from "express";
import movies from "./movies.json" assert { type: "json" };
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import validation from "./routes/validation.js";
import filterMovies from "./filter/filter.js"
import cors from 'cors'

// Server //

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors())
app.use(express.static(join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "pages/inicio.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "pages/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(join(__dirname, "pages/register.html"));
});

app.get("/movies", (req, res) => {
  const filteredMovies = filterMovies(req.query, movies)

  if (filteredMovies.length !== 0) {
    let movies = filteredMovies;
    return res.render("movies", { movies });
  }

  res.render("movies", { movies });
});

app.use(validation);

export default app
