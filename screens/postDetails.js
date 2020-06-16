import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  CameraRoll,
  Share,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { fetchById } from '../src/api';
const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#ff6200" />
  </View>
);
export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureInfo: [],
      creators: [],
      isLoading: true,
      disabled: false,
    };
  }
  //get id params from movieTitle item navigation
  componentDidMount() {
    this.getPictureById(
      this.props.route.params.id !== undefined
        ? this.props.route.params.id
        : this.props.route.params.picture.id
    );
  }
  getPictureById = async (idPicture) => {
    const results = await fetchById(idPicture);
    this.setState({
      pictureInfo: results.data,
      creators: results.data.creators,
      fileUrl: results.data.images.web.url,
      fileName: results.data.images.web.filename,
      fileUrlFull: results.data.images.print.url,
      fileNameFull: results.data.images.print.filename,
      isLoading: false,
    });
  };
  download = async () => {
    this.setState({
      disabled: true,
    });
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      FileSystem.downloadAsync(
        this.state.fileUrl,
        FileSystem.documentDirectory + this.state.fileName
      )
        .then(({ uri }) => {
          const asset = MediaLibrary.saveToLibraryAsync(uri);
          MediaLibrary.saveToLibraryAsync(asset);
          try {
            Alert.alert('Image was successfully downloaded!');
            this.setState({
              disabled: false,
            });
          } catch (err) {
            Alert.alert('Something went wrong :(');
            this.setState({
              disabled: false,
            });
          }
        })
        .catch((error) => {
          this.setState({ error });
          Alert.alert('Something went wrong :(');
        });
    } else {
      Alert.alert('Something went wrong :(');
    }
  };

  downloadPrint = async () => {
    this.setState({
      disabled: true,
    });
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      FileSystem.downloadAsync(
        this.state.fileUrlFull,
        FileSystem.documentDirectory + this.state.fileNameFull
      )
        .then(({ uri }) => {
          const asset = MediaLibrary.saveToLibraryAsync(uri);
          MediaLibrary.saveToLibraryAsync(asset);
          try {
            Alert.alert('Image full hd was successfully downloaded!');
            this.setState({
              disabled: false,
            });
          } catch (err) {
            Alert.alert('Something went wrong :(');
            this.setState({
              disabled: false,
            });
          }
        })
        .catch((error) => {
          this.setState({ error });
          Alert.alert('Something went wrong :(');
        });
    } else {
      Alert.alert('Something went wrong :(');
    }
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.state.pictureInfo.url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  render() {
    return this.state.isLoading ? (
      <AppLoader />
    ) : (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <ImageBackground
          source={
            this.props.route.params.pictureSearch !== undefined
              ? { uri: this.props.route.params.pictureSearch }
              : this.props.route.params.picture.image
          }
          style={styles.image}
          imageStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text style={styles.tagLine}>
            {this.props.route.params.titleSearch !== undefined
              ? this.props.route.params.titleSearch
              : this.props.route.params.picture.title}
          </Text>
          <Text style={styles.placeName}>
            {this.state.pictureInfo.collection}
          </Text>
        </ImageBackground>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          underlayColor="#ff6200">
          <Feather name="heart" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 13, marginTop: 20 }}>
          {this.state.pictureInfo.creators.map((creator) => {
            return (
              <View>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                  {creator.description.split('(')[0]}
                  <Text style={{ fontSize: 14, fontWeight: 'normal' }}>
                    {creator.description.match(/\(.*\)/, '')}
                  </Text>
                </Text>
              </View>
            );
          })}
          <View>
            <Text style={{ paddingTop: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>Culture: </Text>
              {this.state.pictureInfo.culture}
            </Text>
            <Text style={{ paddingTop: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>Technique: </Text>{' '}
              {this.state.pictureInfo.technique}
            </Text>
            {this.state.pictureInfo.measurements !== null ? (
              <Text style={{ paddingTop: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.pictureInfo.measurements.split(' ')[0]}
                </Text>
                {this.state.pictureInfo.measurements
                  .split(';')[0]
                  .replace('Framed:', '')}
              </Text>
            ) : (
              <View></View>
            )}
            {this.state.pictureInfo.current_location !== null ? (
              <View>
                <Text
                  style={{
                    paddingTop: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  Location
                </Text>
                <Text style={{ paddingTop: 5 }}>
                  {this.state.pictureInfo.current_location
                    .replace(/[0-9]/g, '')
                    .substr(1)}
                </Text>
              </View>
            ) : (
              <View></View>
            )}

            {this.state.pictureInfo.fun_fact !== null ? (
              <View>
                <Text
                  style={{
                    paddingTop: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}>
                  Fan Fact
                </Text>
                <Text style={{ paddingTop: 5 }}>
                  {this.state.pictureInfo.fun_fact}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
            <Text
              style={{
                paddingTop: 5,
                fontSize: 16,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              DESCRIPTION
            </Text>
            <Text style={{ paddingTop: 5 }}>
              {this.state.pictureInfo.wall_description}
            </Text>
            <Text
              style={{
                paddingTop: 5,
                fontSize: 16,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Share and download
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                disabled={this.state.disabled}
                onPress={this.onShare}
                underlayColor="#fff"
                style={{
                  marginVertical: 10,
                  width: 50,
                  height: 35,
                  backgroundColor: '#ff6200',
                  borderRadius: 10,
                  marginRight: 5,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="share-2" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={this.state.disabled}
                onPress={this.download}
                underlayColor="#fff"
                style={{
                  marginVertical: 10,
                  width: 50,
                  height: 35,
                  backgroundColor: '#ff6200',
                  borderRadius: 10,
                  marginRight: 5,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="download" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={this.state.disabled}
                onPress={this.downloadPrint}
                underlayColor="#fff"
                style={{
                  marginVertical: 10,
                  width: 110,
                  height: 35,
                  backgroundColor: '#ff6200',
                  borderRadius: 10,
                  marginRight: 5,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Feather name="download" size={24} color="#fff" />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      marginLeft: 5,
                    }}>
                    Full HD
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 450,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  tagLine: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    marginBottom: 30,
    marginVertical: 6,
  },
  placeName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    marginBottom: 30,
  },
  btn: {
    position: 'absolute',
    right: 12,
    top: 425,
    backgroundColor: '#ff6200',
    padding: 12,
    borderRadius: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
