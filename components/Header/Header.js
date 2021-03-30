import React from 'react';
import { Typography } from 'antd';
import Search from '../Search/Search'
import styles from './header.module.css'

const { Title } = Typography

const Header = () => {
    return (
        <>
            <Title>Search for <br className={styles.mobileBreak} /> GitHub Users</Title>
            <Search />
        </>
    )
}


export default Header