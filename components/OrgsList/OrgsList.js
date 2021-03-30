import React, { useContext } from 'react'
import { List, Avatar, Button } from 'antd';
import { LOAD_MORE_ORG } from '../../context/types';
import GithubContext from '../../context/github/githubContext';

const OrgsList = () => {

    const githubContext = useContext(GithubContext);
    const { orgs, searchOrg, text, loadingOrgs, resetSearch } = githubContext


    const onLoadMore = () => {
        searchOrg(text, LOAD_MORE_ORG)
    };

    const loadMore =
        orgs.items.length > 1 ? (
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
            data-testid="orgs-list"
            size="small"
            loading={loadingOrgs}
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={orgs.items}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar size={'large'} src={item.avatar_url} />
                        }
                        title={item.login}
                        description={""}
                    />
                </List.Item>
            )}
        />
    );
}

export default OrgsList