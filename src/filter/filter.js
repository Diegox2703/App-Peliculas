function filterMovies (query, movies) {
    const { genre, year, rate } = query;

    let filteredByCategories = [];
  
    if (year) {
      let years;
      if (typeof year === "object") years = [...year]
      else years = [year]
      for (let i = 0; i < years.length; i++) {
        let wishedYear = years[i].split("-");
        let filteredByYear = movies.filter(movie => movie.year >= parseInt(wishedYear[0]) && movie.year <= parseInt(wishedYear[1]));
        filteredByCategories.push(...filteredByYear);
      }
    }
  
    if (rate) {
      if (rate === "<") {
        const filteredByRating = movies.filter((movie) => movie.rate < 7);
        filteredByCategories.push(...filteredByRating);
      } else {
        const filteredByRating = movies.filter((movie) => movie.rate > 7);
        filteredByCategories.push(...filteredByRating);
      }
    }
  
    if (genre) {
      let genres;
      if (typeof genre === 'object') genres = [...genre]
      else genres = [genre]
      for(let i = 0; i < genres.length; i++) {
        let filteredByGenre = movies.filter(movie => movie.genre.includes(genres[i]))
        filteredByCategories.push(...filteredByGenre)
      }
    }
  
    const filteredMovies = [...new Set(filteredByCategories)]

    return filteredMovies
}

export default filterMovies