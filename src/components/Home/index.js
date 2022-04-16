import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);

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
  useEffect(() => {
    allPokemon();
  }, [offset]);
  const listPok =
    pokemon.length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      pokemon.data.results.map((item, ind) => {
        return (
          <div className={styles.flexContainer} key={ind}>
            <div>{item.name} </div>
            <div >
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

    const showButton = pokemon.length === 0 ? <></> : <div className={styles.pagination}>
    <button onClick={prevPage}> Preview</button>
    <button onClick={nextPage}>Next</button>
  </div>
  return (
    <div >
      <div>
          {listPok}
    </div>
      {showButton}
    </div>
  );
}
export default Home;
