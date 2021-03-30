import {
    RESET_SEARCH,
    SEARCH_ORG,
    SEARCH_REPO,
    SET_LOADING_ORGS,
    SET_LOADING_REPOS,
    INCREMENT_ORG_COUNTER,
    INCREMENT_REPO_COUNTER,
    RESET_COUNTERS,
    SET_TEXT,
    SET_HOME_TEXT,
    SET_TAB_KEY
} from '../types';

const githubReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_REPO:
            return {
                ...state,
                repos: action.payload,
                loadingRepos: false
            };
        case SEARCH_ORG:
            return {
                ...state,
                orgs: action.payload,
                loadingOrgs: false
            };
        case RESET_SEARCH:
            return {
                ...state,
                orgs: {
                    total_count: 0,
                    items: []
                },
                repos: {
                    total_count: 0,
                    items: []
                },
                searching: false,
                loadingOrgs: false,
                loadingRepos: false,
                homeText: 'Please, enter a login, name or a company you are locking for!',
                text: ''
            };
        case RESET_COUNTERS:
            return {
                ...state,
                repoCounter: 4,
                orgCounter: 4
            };
        case SET_LOADING_ORGS:
            return {
                ...state,
                loadingOrgs: true,
                searching: true
            };
        case SET_LOADING_REPOS:
            return {
                ...state,
                loadingRepos: true,
                searching: true
            };
        case SET_TEXT:
            return {
                ...state,
                text: action.payload
            };
        case SET_TAB_KEY:
            return {
                ...state,
                tabKey: action.payload
            };
        case SET_HOME_TEXT:
            return {
                ...state,
                homeText: action.payload
            };
        case INCREMENT_ORG_COUNTER:
            return {
                ...state,
                orgCounter: action.payload
            };
        case INCREMENT_REPO_COUNTER:
            return {
                ...state,
                repoCounter: action.payload
            };
        default:
            return state;
    }
};

export default githubReducer