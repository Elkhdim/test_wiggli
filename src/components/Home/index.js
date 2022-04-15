import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const nextPage = () => {
    setOffset(offset + 20);
  };
  const prevPage = () => {
    if (offset >= 20) return setOffset(offset - 20);
  };
  const allPokemon = () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}?limit=20`)
      .then((res) => {
        setPokemon(res);
      });
  };

  const searchItems = (event) => {
    setSearchInput(event);
    if (searchInput.length > 0) {
      const filterPok = pokemon.data.results.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filterPok);
    } else {
      setFilteredResults(pokemon);
    }
  };
  useEffect(() => {
    allPokemon();
    //searchItems();
  }, [searchInput, offset]);

  const listPok =
    pokemon.length === 0 ? (
      <h1>Loading...</h1>
    ) : searchInput.length > 1 ? (
      filteredResults.map((item, ind) => {
        return (
          <div className={styles.flexContainer} key={ind}>
            <div>{item.name} </div>
            <div>
              <Link
                className={styles.btn}
                to={{ pathname: `/viewPokemon/${item.name}` }}
              >
                View
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      pokemon.data.results.map((item, ind) => {
        return (
          <div className={styles.flexContainer} key={ind}>
            <div>{item.name} </div>
            <div>
              <Link
                className={styles.btn}
                to={{ pathname: `/viewPokemon/${item.name}` }}
              >
                View
              </Link>
            </div>
          </div>
        );
      })
    );

  const showButton =
    pokemon.length === 0 ? (
      <></>
    ) : (
      <div className={styles.pagination}>
        <button onClick={prevPage}> Preview</button>
        <button onClick={nextPage}>Next</button>
      </div>
    );
  return (
    <div className={styles.container}>
      <div>
        <input
          onChange={(ev) => searchItems(ev.target.value)}
          placeholder="Search..."
          className={styles.inp}
          type="text"
        />
      </div>
      <div>{listPok}</div>
      {showButton}
    </div>
  );
}
export default Home;
