import React from 'react'
import Container from './container'
import Navigation from './navigation';
import styles from './header.module.css'
import logo from './logo.svg'
import avatar from './avatar.svg'

const Search = () => (
  <div className={styles.search}>
    <button type="submit"><i className="fa fa-search"></i></button>
    <input type="text" placeholder="Search" />
  </div>
)

const Divider = () => (
  <div className={styles.divider}></div>
)

const SignInButton = () => (
  <div className={styles.signInButton}>
    <a href="#">
      <img src={avatar} alt="sign in" />
      Sign-in
    </a>
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
      <div className={styles.end}>
        <Divider />
        <SignInButton />
      </div>
    </Container>
  </div>
)
