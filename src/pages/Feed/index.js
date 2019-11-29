import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import {
  Post,
  Header,
  Avatar,
  Content,
  Name,
  Loading,
  AddPostButton,
} from './styles';
import LazyImage from '../../components/LazyImage';
import api from '../../services/api';
import { onSignOut } from '../../services/auth';

const SignOutButton = ({ onPress, ...props }) => (
  <TouchableOpacity {...props} onPress={onPress}>
    <EntypoIcon name="log-out" size={24} color="#1a202c" />
  </TouchableOpacity>
);

function Feed({ navigation }) {
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
    const response = await api.get('api/v1/post', {
      params: {
        limit: 5,
        page: pageNumber,
      },
    });
    const postData = response.data;
    setTotal(postData.totalPages);
    setPosts(shouldRefresh ? postData.data : [...posts, ...postData.data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  async function handleSignOut() {
    await onSignOut();
    navigation.navigate('SignedOut');
  }

  useEffect(() => {
    loadPage();
    navigation.setParams({
      signOut: handleSignOut,
    });
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
    <>
      <View>
        <FlatList
          data={posts}
          keyExtractor={post => post.id}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          onViewableItemsChanged={handleViewableChanged}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 25,
            minimumViewTime: 400,
          }}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <Post>
              <Header>
                <Avatar
                  source={{
                    uri: 'https://api.adorable.io/avatars/48/.png',
                  }}
                />
                <Name>
                  {item.author
                    ? `${item.author.firstName} ${item.author.lastName}`
                    : 'Sem Autor'}
                </Name>
              </Header>

              <LazyImage
                shouldLoad={viewable.includes(item.id)}
                aspectRatio={item.aspectRatio}
                source={{ uri: item.image }}
                smallSource={{ uri: item.imageSmall }}
              />

              <Content>
                <Name>
                  {item.author
                    ? `${item.author.firstName} ${item.author.lastName}`
                    : 'Sem Autor'}
                </Name>{' '}
                {item.content}
              </Content>
            </Post>
          )}
        />
      </View>
      <AddPostButton
        onPress={() => {
          navigation.navigate('NewPost');
        }}
      />
    </>
  );
}

Feed.navigationOptions = ({ navigation }) => ({
  headerRight: <SignOutButton onPress={navigation.getParam('signOut')} />,
  headerRightContainerStyle: {
    marginRight: 12,
  },
});

export default Feed;
