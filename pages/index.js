import React, { useContext } from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/Header/Header';
import GithubContext from '../context/github/githubContext';
import { Tabs, BackTop, Typography } from 'antd';
import isMobile from 'ismobilejs';
import OrgsList from '../components/OrgsList/OrgsList';
import ReposList from '../components/ReposList/ReposList';

const { TabPane } = Tabs;
const { Title } = Typography;

export default function Home() {

  const githubContext = useContext(GithubContext);

  const { repos, orgs, searching } = githubContext

  const Body = () => {
    return (
      isMobile(window.navigator).phone ?
        <div>
          <Tabs defaultActiveKey="1" centered size={'large'}>
            <TabPane tab={`USERS-REPOS (${repos.total_count})`} key="1">
              <ReposList />
            </TabPane>
            <TabPane tab={`COMPANIES (${orgs.total_count})`} key="2">
              <OrgsList />
            </TabPane>
          </Tabs>
        </div>
        :
        <div className={styles.tabsWrapper}>
          <div style={{ width: 310 }}>
            <Tabs defaultActiveKey="1" size={'middle'}>
              <TabPane tab={`USERS-REPOS (${repos.total_count})`} key="1">
                <ReposList />
              </TabPane>
            </Tabs>
          </div>

          <div style={{ width: 310 }}>
            <Tabs defaultActiveKey="1" size={'small'}>
              <TabPane tab={`COMPANIES (${orgs.total_count})`} key="1">
                <OrgsList />
              </TabPane>
            </Tabs>
          </div>
        </div>
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        {searching ?
          <Body />
          :
          <div className={styles.landing}>
            <Title level={4} style={{ textAlign: 'center' }}>
              {githubContext.homeText}
            </Title>
          </div>
        }
        <BackTop />
      </main>
    </div >
  )
}
