import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { fetchSearch } from '../src/api';
import { noFound } from '../src/data';
const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#ff6200" />
  </View>
);
const { height } = Dimensions.get('window');
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      searchTotal: '',
      isLoading: true,
      limit: 4,
    };
  }
  componentDidMount() {
    this.getSeacrhResult(this.props.route.params.typeSearch, this.state.limit);
    this.timerID = setInterval(() => this.finishedRender(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  finishedRender = async () => {
    this.setState({
      isLoading: false,
    });
  };
  getSeacrhResult = async (typeSearch, limit) => {
    const results = await fetchSearch(typeSearch, limit);
    this.setState({
      search: results.data,
      searchTotal: results.info.total,
    });
  };
  renderFooter = () => {
    if (this.state.refreshing) {
      return (
        <ActivityIndicator
          size="large"
          color="#ff6200"
          style={{ marginTop: 10 }}
        />
      );
    } else {
      return null;
    }
  };
  fetchMore = () => {
    if (this.state.refreshing) {
      return null;
    }
    this.setState(
      (prevState) => {
        return { refreshing: true, limit: prevState.limit + 8 };
      },
      () => {
        this.submitSearch(this.state.limit);
      }
    );
  };
  submitSearch(limit) {
    this.getMore(this.props.route.params.typeSearch, this.state.limit);
    this.setState({ refreshing: false });
  }
  getMore = async (typeSearch, limit) => {
    const results = await fetchSearch(typeSearch, limit);
    this.setState((prevState) => ({
      search: [...results.data],
    }));
  };
  render() {
    const { navigation } = this.props;
    return this.state.isLoading ? (
      <AppLoader />
    ) : (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10 }}>
          Total Results: {this.state.searchTotal}
        </Text>
        <View style={{ width: '100%', marginTop: 20, flex: 1, height: height }}>
          <FlatList
            numColumns={2}
            renderItem={({ item }) => {
              if (item.images !== null) {
                return (
                  <View
                    style={{
                      flex: 1,
                      height: 210,
                      marginHorizontal: 2,
                      marginVertical: 10,
                    }}>
                    <TouchableOpacity
                      style={styles.seacrhResult}
                      onPress={() => {
                        navigation.navigate('Post', {
                          screen: 'Post',
                          pictureSearch: item.images.web.url,
                          titleSearch: item.title,
                          id: item.accession_number,
                        });
                      }}>
                      <View style={styles.block}>
                        <Image
                          style={styles.image}
                          source={{
                            uri:
                              item.images !== null
                                ? item.images.web.url
                                : noFound.image,
                          }}
                        />
                        <View style={{ padding: 10 }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              width: 150,
                              textAlign: 'center',
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}>
                            {item.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
            data={this.state.search}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.fetchMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  seacrhResult: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
