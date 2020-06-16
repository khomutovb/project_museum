import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import {
  image,
  recentImage,
  recentImage2,
  gallery,
  iconCategory,
} from '../src/data';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView
        style={{
          backgroundColor: '#fff',
          height: '100%',
        }}>
        <View>
          <ImageBackground
            /* source={image} */
            style={{
              width: '100%',
              height: 250,
              backgroundColor: '#000',
              borderBottomRightRadius: 65,
            }}>
            <ImageBackground
              source={image}
              style={{
                width: '89%',
                height: 310,
              }}>
              <View style={styles.DarkOverlay} />
              <View style={styles.searchContainer}>
                <Text style={styles.userGreet}>Art&Culture</Text>
                <Text style={styles.userText}>
                  Experience The Met, Anywhere
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={styles.searchBox}
                  placeholder="Search"
                  placeholderTextColor="#666"
                />
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: '#ff6200',
                    position: 'relative',
                    top: 8,
                    left: 10,
                    zIndex: 999,
                    width: 35,
                    height: 35,
                    borderRadius: 50,
                    marginLeft: -48,
                  }}>
                  <Feather
                    name="search"
                    size={22}
                    color="#fff"
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  position: 'absolute',
                  padding: 7,
                  top: 20,
                  left: 16,
                  zIndex: 99,
                }}
                onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={22} color="#fff" />
              </TouchableOpacity>
            </ImageBackground>
          </ImageBackground>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 40,
            position: 'relative',
            zIndex: 1,
          }}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
              Most popular
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <FlatList
              horizontal={true}
              data={gallery}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      paddingLeft: 4,
                      paddingRight: 4,
                      paddingBottom: 20,
                    }}>
                    <TouchableHighlight
                      onPress={() => {
                        navigation.navigate('Post', {
                          screen: 'Post',
                          picture: item,
                        });
                      }}
                      underlayColor="#000"
                      style={{
                        borderRadius: 10,
                        shadowColor: '#000',
                      }}>
                      <View>
                        <Image
                          source={item.image}
                          style={{
                            width: 170,
                            marginRight: 2,
                            height: 270,
                            borderRadius: 10,
                          }}
                        />
                        <View style={styles.imageOverlay} />
                        <Text style={styles.imageText}>{item.title}</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Category</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '90%',
              }}>
              <FlatList
                data={iconCategory}
                numColumns={3}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: '30%',
                        margin: 5,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      <TouchableOpacity
                        style={styles.categoryBlock}
                        onPress={() => {
                          navigation.navigate('Search', {
                            nameSearch: item.name,
                            typeSearch: item.type,
                            total: item.total,
                          });
                        }}>
                        <Image
                          source={item.src}
                          style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={{ fontSize: 14, color: '#fff' }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 40 }}>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                The collection
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#ff6200' }}>
                View All
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Image
                source={recentImage}
                style={{
                  width: '90%',
                  height: 340,
                  borderRadius: 10,
                  alignSelf: 'center',
                  position: 'relative',
                }}
              />
              <View
                style={{
                  width: '90%',
                  height: 340,
                  borderRadius: 10,
                  alignSelf: 'center',
                  position: 'absolute',
                  top: 0,
                  backgroundColor: '#000',
                  opacity: 0.2,
                }}
              />
              <View style={{ position: 'absolute', bottom: 0, padding: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Feather
                    name="info"
                    size={22}
                    color="#fff"
                    style={{ marginLeft: 10, position: 'relative', top: 4 }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      fontWeight: 'normal',
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    Twilight in the Wilderness
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: 'normal',
                    marginBottom: 4,
                    opacity: 0.9,
                    marginLeft: 16,
                  }}>
                  Esther, the wife of the Persian king Ahasuerus, effectively
                  concealed her Jewish identity until the prime minister Haman
                  hatched a plot to annihilate the kingdom’s Jews. To save her
                  people Esther persuades the king (at the center) to rescind
                  his order. He then turns against Haman, who slumps in his
                  seat, aware of his sudden fall from power and his bleak
                  future.
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Image
                source={recentImage2}
                style={{
                  width: '90%',
                  height: 340,
                  borderRadius: 10,
                  alignSelf: 'center',
                  position: 'relative',
                }}
              />
              <View
                style={{
                  width: '90%',
                  height: 340,
                  borderRadius: 10,
                  alignSelf: 'center',
                  position: 'absolute',
                  top: 0,
                  backgroundColor: '#000',
                  opacity: 0.2,
                }}
              />
              <View style={{ position: 'absolute', bottom: 0, padding: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Feather
                    name="info"
                    size={22}
                    color="#fff"
                    style={{ marginLeft: 10, position: 'relative', top: 4 }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fff',
                      fontWeight: 'normal',
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    Esther, Ahasuerus, and Haman
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: 'normal',
                    marginBottom: 4,
                    opacity: 0.9,
                    marginLeft: 16,
                  }}>
                  In his New York studio, Church painted this spectacular view
                  of a blazing sunset over wilderness near Mount Katahdin in
                  Maine, which he had sketched during a visit nearly two years
                  earlier. Although Church often extolled the grandeur of
                  pristine American landscape in his work, this painting appears
                  to have additional overtones. Created on the eve of the Civil
                  War, the painting's subject can be interpreted as symbolically
                  evoking the coming conflagration.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  DarkOverlay: {
    width: '90%',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 310,
    borderBottomRightRadius: 65,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  searchContainer: {
    paddingTop: 100,
    paddingLeft: 16,
  },
  userGreet: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
  },
  userText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff',
  },
  searchBox: {
    height: 40,
    marginTop: 16,
    backgroundColor: '#fff',
    paddingLeft: 24,
    padding: 12,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: '100%',
  },
  imageOverlay: {
    width: 170,
    height: 270,
    marginRight: 8,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.3,
  },
  imageText: {
    position: 'absolute',
    color: '#fff',
    marginTop: 4,
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    bottom: 10,
  },
  categoryBlock: {
    width: '100%',
    height: 70,
    backgroundColor: '#ff6200',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
