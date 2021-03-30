import React, { useState, useContext } from 'react'
import { Input, Button, Alert } from 'antd';
import GithubContext from '../../context/github/githubContext';
import styles from './search.module.css'


const CSearch = () => {

    const githubContext = useContext(GithubContext);

    const { text, loadingRepos, loadingOrgs } = githubContext
    const [validation, setValidation] = useState(false)

    const validate = text => {
        if (text.trim().length < 1) {
            setValidation(true)
            return false
        } else {
            setValidation(false)
            return true
        }
    }

    const handleSearch = async value => {
        await githubContext.setText(value)
        githubContext.searchAll(text)
    }

    return (
        <div>
            <div className={styles.wrapper}>

                <Input
                    value={text}
                    onChange={(e) => githubContext.setText(e.target.value)}
                    placeholder="Enter a name"
                    data-testid="search-input"
                />
                <Button
                    loading={loadingOrgs || loadingRepos ? true : false}
                    type="primary"
                    onClick={() => (validate(text)) && handleSearch(text)}
                    data-testid="search-button"
                >Search</Button>
            </div>
            {
                validation && <Alert
                    message="This field cannot be empty"
                    type="error"
                    showIcon data-testid="search-error"
                />
            }
        </div>
    )
}

export default CSearch