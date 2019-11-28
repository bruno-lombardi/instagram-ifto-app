import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';

import { Post, Header, Avatar, Content, Name, Loading } from './styles';
import LazyImage from '../../components/LazyImage';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) {
      return;
    }
    setLoading(true);
    const response = await fetch(
      `http://localhost:3333/api/v1/post?limit=5&page=${pageNumber}`,
    );

    const postData = await response.json();
    setTotal(postData.totalPages);
    setPosts(shouldRefresh ? postData.data : [...posts, ...postData.data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshList() {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={post => post.id}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 30 }}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar
                source={{
                  uri:
                    'https://ifto-instagram.s3.amazonaws.com/posts/small-1574903084371.jpg',
                }}
              />
              <Name>Bruno Lombardi</Name>
            </Header>

            <LazyImage
              shouldLoad={viewable.includes(item.id)}
              aspectRatio={item.aspectRatio}
              source={{ uri: item.image }}
              smallSource={{ uri: item.imageSmall }}
            />

            <Content>
              <Name>Bruno Lombardi</Name> {item.content}
            </Content>
          </Post>
        )}
      />
    </View>
  );
}
