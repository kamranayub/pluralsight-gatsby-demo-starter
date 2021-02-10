import React from 'react'
import Container from './container'
import Navigation from './navigation';
import styles from './header.module.css'
import logo from './logo.svg'

const Search = () => (
  <div className={styles.search}>
    <button type="submit"><i className="fa fa-search"></i></button>
    <input type="text" placeholder="Search" />
  </div>
)

export default () => (
  <div className={styles.wrapper}>
    <Container className={styles.header}>
      <img src={logo} className={styles.logo} alt="logo" />
      <span className={styles.tagline}>MANIACALLY TAKING TECH TO THE GLOBE</span>
      <div className={styles.middle}>
        <Search />
        <Navigation className={styles.navigation} />
      </div>
    </Container>
  </div>
)
