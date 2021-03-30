import React from 'react'
import '../styles/globals.css'
import GithubState from '../context/github/GithubState'
import { useState, useEffect } from "react";
import PropTypes from 'prop-types'

const useIsSsr = () => {
  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => {
    setIsSsr(false);
  }, []);

  return isSsr;
}

function MyApp({ Component, pageProps }) {

  const isSsr = useIsSsr();
  if (isSsr) return null;

  return <GithubState> <Component {...pageProps} /> </GithubState>
}

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType
};

export default MyApp
