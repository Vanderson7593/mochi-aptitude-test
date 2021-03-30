import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import PropTypes from 'prop-types';
import axios from 'axios'
import {
    SET_LOADING_ORGS,
    SET_LOADING_REPOS,
    RESET_SEARCH,
    SEARCH_ORG,
    SEARCH_REPO,
    INCREMENT_REPO_COUNTER,
    INCREMENT_ORG_COUNTER,
    FULL_SEARCH,
    LOAD_MORE_ORG,
    LOAD_MORE_REPO,
    RESET_COUNTERS,
    SET_TEXT,
    SET_HOME_TEXT,
    SET_TAB_KEY
} from '../types';


const GithubState = ({ children }) => {
    const initialState = {
        text: '',
        repos: {
            total_count: 0,
            items: []
        },
        orgs: {
            total_count: 0,
            items: []
        },
        repoCounter: 4,
        orgCounter: 4,
        loadingRepos: false,
        loadingOrgs: false,
        searching: false,
        tabKey: 1,
        homeText: 'Please, enter a login, name or a company you are locking for!'
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Repo
    const searchRepo = (text, type) => {

        function doDispatch(res) {
            dispatch({
                type: SEARCH_REPO,
                payload: res.data,
            })
        }

        setLoadingRepos()

        if (type === LOAD_MORE_REPO) {

            let auxCounter = state.repoCounter + 4
            incrementRepoCounter();
            setTabKey(1)
            axios.get(`https://api.github.com/search/repositories?q=${text}%20in:name,description&per_page=${auxCounter}&page=1`)
                .then(res => doDispatch(res))
                .catch(() => {
                    resetSearch()
                    setHomeText("Something went wrong, please verify your internet connection and try again!")
                })
        } else {
            resetCounters()

            axios.get(`https://api.github.com/search/repositories?q=${text}%20in:name,description&per_page=4&page=1`)
                .then(res => doDispatch(res))
                .catch(() => {
                    resetSearch()
                    setHomeText("Something went wrong, please verify your internet connection and try again!")
                })
        }
    };

    // Search Org
    const searchOrg = (text, type) => {

        function doDispatch(res) {
            dispatch({
                type: SEARCH_ORG,
                payload: res.data,
            })
        }

        setLoadingOrgs()
        if (type === LOAD_MORE_ORG) {
            let auxCounter = state.orgCounter + 4
            incrementOrgCounter()
            setTabKey(2)
            axios.get(`https://api.github.com/search/users?q=${text}+type:org&per_page=${auxCounter}&page=1`)
                .then(res => doDispatch(res))
                .catch(() => {
                    resetSearch()
                    setHomeText("Something went wrong, please verify your internet connection and try again!")
                })

        } else {
            resetCounters()
            axios.get(`https://api.github.com/search/users?q=${text}+type:org&per_page=4&page=1`)
                .then(res => doDispatch(res))
                .catch(() => {
                    resetSearch()
                    setHomeText("Something went wrong, please verify your internet connection and try again!")
                })
        }
    };

    // Search Both
    const searchAll = (text) => {
        searchOrg(text, FULL_SEARCH)
        searchRepo(text, FULL_SEARCH)
    }

    // Increment repo page counter 
    const incrementRepoCounter = () => dispatch({
        type: INCREMENT_REPO_COUNTER,
        payload: state.repoCounter + 4
    });

    // Increment org page counter 
    const incrementOrgCounter = () => {
        dispatch({
            type: INCREMENT_ORG_COUNTER,
            payload: state.orgCounter + 4
        });
    }

    // Reset counters 
    const resetCounters = () => dispatch({
        type: RESET_COUNTERS
    });

    // Clear Repos and Orgs
    const resetSearch = () => dispatch({ type: RESET_SEARCH });

    // Set Loading
    const setLoadingOrgs = () => dispatch({ type: SET_LOADING_ORGS });

    // Set Loading
    const setLoadingRepos = () => dispatch({ type: SET_LOADING_REPOS });

    // Set Text
    const setText = text => dispatch({ type: SET_TEXT, payload: text });

    // Set Text
    const setHomeText = text => dispatch({ type: SET_HOME_TEXT, payload: text });

    // Set Tab Key
    const setTabKey = text => dispatch({ type: SET_TAB_KEY, payload: text });

    return (
        <GithubContext.Provider
            value={{
                orgs: state.orgs,
                repos: state.repos,
                loadingOrgs: state.loadingOrgs,
                loadingRepos: state.loadingRepos,
                repoCounter: state.repoCounter,
                orgCounter: state.orgCounter,
                text: state.text,
                homeText: state.homeText,
                searching: state.searching,
                tabKey: state.tabKey,
                searchRepo,
                setText,
                searchOrg,
                searchAll,
                resetSearch
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

GithubState.propTypes = {
    children: PropTypes.node,
};

export default GithubState;