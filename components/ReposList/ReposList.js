import React, { useContext } from 'react'
import { List, Avatar, Button } from 'antd';
import { LOAD_MORE_REPO } from '../../context/types';
import GithubContext from '../../context/github/githubContext';

const ReposList = () => {

    const githubContext = useContext(GithubContext);

    const { repos, searchRepo, text, loadingRepos, resetSearch } = githubContext

    const onLoadMore = () => {
        searchRepo(text, LOAD_MORE_REPO)
    };

    const loadMore = repos.items.length > 1 ?
        (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button style={{ marginRight: 20 }} onClick={onLoadMore}>Load more</Button>
                <Button danger onClick={() => { resetSearch() }} type={'primary'}>Reset</Button>
            </div>
        ) : null;

    return (
        <List
            data-testid="repos-list"
            size="small"
            loading={loadingRepos}
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={repos.items}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar size={'large'} src={item.owner.avatar_url} />
                        }
                        title={item.name}
                        description={item.owner.login}
                    />
                </List.Item>
            )}
        />
    );
}

export default ReposList