import { useState } from "react"
import './MovieApp.css'


export const MovieApp = () => {

  const [search, setSearch] = useState('')
  const [movieList, setMovieList] = useState([])

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = '16c0c2bea49379a2c88f95a07b7e7a3e'

  const handleInputChange = ({ target }) => {
    setSearch(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchMovie()
  }

  const fetchMovie = async () => {
    try {

      const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`)
      const data = await response.json()
      setMovieList(data.results)

    } catch (error) {
      console.error('Ha ocurrido un error: ', error)
    }
  }

  return (
    <div className="container">
      <h1>Buscador de películas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Escribe una película"
          value={search}
          onChange={handleInputChange}
        />
        <button className="search-button"> Buscar </button>
      </form>
      {movieList &&
        <div className="movie-list">
          {movieList.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.tittle} />
              <h2>{movie.title}</h2>
              <p className="overview">{movie.overview}</p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
