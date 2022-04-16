import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./Type.module.css";

function Type() {
  const [typePok, setTypePok] = useState([]);
  const [page, setPage] = useState(21);
  const [counPok, setCountPok] = useState(0);

  const nextPage = () => {
    if (page <= counPok) {
      setPage(page + 21);
    }
  };
  const prevPage = () => {
    if (page > 21) {
      setPage(page - 21);
    }
  };
  const { id } = useParams();

  const pokemonInfo = () => {
    return axios.get(`https://pokeapi.co/api/v2/type/${id}`).then((res) => {
      setTypePok(res);
      setCountPok(res.data.pokemon.length);
    });
  };
  useEffect(() => {
    pokemonInfo();
  }, [page]);
  function getTypeId(url) {
    var matches = url.match(/\d+/g);
    return matches[matches.length - 1];
  }
  const showButton =
    typePok.length === 0 ? (
      <></>
    ) : (
      <div className={styles.pagination}>
        <button onClick={prevPage}> Preview</button>
        <button onClick={nextPage}>Next</button>
      </div>
    );
  const pok_arr = [];
  if (typePok.length !== 0) {
    for (let i = page - 21; i < page; i++) {
      if (typePok.data.pokemon[i] !== undefined) {
        pok_arr.push(typePok.data.pokemon[i]);
      }
    }
  }

  const pok =
    typePok.length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      <div className={styles.row}>
        {pok_arr.map((item, index) => {
          return (
            <Link
            key={index}
              className={styles.btn}
              to={{ pathname: `/viewPokemon/${item.pokemon.name}` }}
            >
              <div  className={styles.column}>
                <div className={styles.card}>
                  <img
                    alt="Avatar"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getTypeId(
                      item.pokemon.url
                    )}.png`}
                  />
                  <div className={styles.container}>
                    <h5>
                      <b>Name: {item.pokemon.name} </b>
                    </h5>
                    <p>Type: {typePok.data.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );

  return (
    <div>
      <div>{pok}</div>
      {showButton}
    </div>
  );
}
export default Type;
