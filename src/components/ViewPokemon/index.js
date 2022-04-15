import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ViewPokemon.module.css";

function ViewPokemon() {
  const { name } = useParams();
  const [pokemonInf, setPokemonInf] = useState([]);
  const [can_evolve, setCan_evolve] = useState([]);
  const [pok_ev, setPok_ev] = useState([]);

  const pokemonInfo = () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setPokemonInf(res);
      });
  };
  const can_evovle_pok = () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .then((res) => {
        axios.get(`${res.data.evolution_chain.url}`).then((response) => {
          setPok_ev([
            response.data.chain.species.name,
            response.data.chain.evolves_to[0].species.name,
            response.data.chain.evolves_to[0].evolves_to[0].species.name,
          ]);
        });
        setCan_evolve(res.data.evolution_chain.url);
      });
  };

  useEffect(() => {
    pokemonInfo();
    can_evovle_pok();
  }, []);
  function getTypeId(url) {
    var matches = url.match(/\d+/g);
    return matches[matches.length - 1];
  }
  const listPokInfo =
    pokemonInf.length === 0 ? (
      <h1>Loading..</h1>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Name of pokemon</th>
            <th>Image</th>
            <th>pokemon family</th>

            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pokemonInf.data.name}</td>
            <td>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInf.data.id}.png`}
                alt=""
              />
            </td>
            <td>
              <p>{pok_ev[0]}</p>
              <p>{pok_ev[1]}</p>
              <p>{pok_ev[2]}</p>
            </td>
            <td>
              {pokemonInf.data.types.map((item_type, index) => {
                return (
                  <div className={styles.typePok} key={index}>
                    <Link
                      to={{
                        pathname: `/type/${getTypeId(item_type.type.url)}`,
                      }}
                      className={styles.btn}
                    >
                      {item_type.type.name}{" "}
                    </Link>
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    );

  return <div className={styles.bd}>{listPokInfo}</div>;
}
export default ViewPokemon;
