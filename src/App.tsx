import { useState, useCallback, useEffect } from "react"
import "./styles/global.scss"
import styles from "./styles/App.module.scss"
import { API_BASE_URL, CONFIG_METHOD_GET } from "./services/api"
import { AutoComplete } from "./components/AutoComplete"

type PokemonType = {
  name: string
  url: string
} 

function App() {
  const [pokemons, setPokemons] = useState<string[]>([])

  const getPokemons = useCallback(async () => {
    try {
      const fetchPokemons = await fetch(API_BASE_URL, CONFIG_METHOD_GET)
      const pokemonData = await fetchPokemons.json()
      const pokemonList = pokemonData.results.map(
        (pokemon: PokemonType) => pokemon.name
      )

      setPokemons(pokemonList)
    } catch (error) {
      console.error("Error getting pokemons", error)
    }
  }, [pokemons])

  useEffect(() => {
    getPokemons()
  }, [])

  return (
    <div className="App">
      <div className={styles.pageContainer}>
        <h2>Pokemon Search</h2>
        <AutoComplete list={pokemons} placeholder="Search a Pokemon"/>
      </div>
    </div>
  )
}

export default App
