import React from 'react'
import { Link } from 'react-router-dom';
import Logo from "../../img/Pokemon.png";
import styles from './Header.module.css'
 function Header() {
  return (

    <div className={styles.header}>
        <Link to="/" >
            <img className={styles.logo} src={Logo} alt="Pokeùon"/>
        </Link>
        
    </div>
  )
}
export default Header
