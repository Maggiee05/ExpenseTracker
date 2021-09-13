import React, { Component } from 'react';
import {
  TextInput, View, Image, Alert, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Text } from 'react-native-paper';
import styles from '../../style';
import loadProductInfo from '../../backend/get_wishlist';
import { UserContext } from '../navigator/context';
import { setWishlist, resetWishlist, getInfo } from '../../backend/database/wishlist_db';

/**
 * The wishlist screen
 * User can input a certain Amazon website.
 * Information will be scraped from the official website and stored into database.
 */
export default class WishlistScreen extends Component {
  static navigationOptions = {
    title: 'Wishlist',
  };

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      loading: false,
      currUser: '',
      showWebView: false,
    };
  }

  componentDidMount = async () => {
    const currUser = this.context;
    const info = await getInfo(currUser.user);
    this.setState({
      currUser,
      price: info.price,
      rate: info.rate,
      stock: info.stock,
      productName: info.productName,
      imageUrl: info.imageUrl,
      url: info.url,
    });
  }

  submitHandler = async () => {
    this.setState({ loading: true });
    const { url, currUser } = this.state;
    const item = await loadProductInfo(url);
    if (item === null) {
      this.setState({ loading: false });
      Alert.alert('ERROR! Please enter a valid url.');
    } else {
      this.setState({
        url: item.url,
        price: item.price,
        productName: item.productName,
        imageUrl: item.imageUrl,
        rate: item.rate,
        stock: item.stock,
        loading: false,
      });
    }

    setWishlist(this.state, currUser);
  }

  urlInputHandler = (text) => {
    this.setState({ url: text });
  }

  // ----- the web view handlers ------- below
  webHandler = () => {
    this.setState({ showWebView: true });
  }

  backHandler = () => { // back button
    this.setState({ showWebView: false });
    const { navigation } = this.props;
    navigation.navigate('Wishlist');
  }

  webLoading= () => ( // loading spinner
    <ActivityIndicator
      size="large"
      style={styles.webLoading}
    />
  )
  // ----- the web view handlers ------- above

  resetHandler = (user) => {
    const data = resetWishlist(user);
    this.setState(data);
  }

  render() {
    const {
      price, productName, rate, stock, imageUrl, url, loading, showWebView, currUser,
    } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Text style={{ fontWeight: 'bold', fontSize: 25 }}> Loading.... </Text>
        </View>
      );
    }
    if (showWebView) {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: url }}
            startInLoadingState
            renderLoading={() => this.webLoading()}
          />

          <View style={styles.webViewBackPosition}>
            <TouchableOpacity onPress={() => this.backHandler()} style={styles.backButton}>
              <Text style={styles.webViewBackTxt}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.urlInputBox}>
          <TextInput
            style={styles.urlInputText}
            placeholder="Please enter the url"
            autoCapitalize="none"
            onChangeText={this.urlInputHandler}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => { this.submitHandler(); }}
        >
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>

        <View style={{ marginTop: '8%', marginBottom: '5%' }}>
          <TouchableOpacity onPress={() => { this.webHandler(); }}>
            <Image
              style={styles.productImage}
              source={{ uri: imageUrl }}
            />
          </TouchableOpacity>
          <Text style={styles.infoText}>
            Name:
            {' '}
            {productName}
          </Text>

          <Text style={styles.infoText}>
            Price:
            {' '}
            {price}
          </Text>

          <Text style={styles.infoText}>
            Rate:
            {' '}
            {rate}
          </Text>

          <Text style={styles.infoText}>
            Stock:
            {' '}
            {stock}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => this.resetHandler(currUser)}
          style={styles.reset}
        >
          <Text style={{ fontWeight: '600', color: '#808080' }}> RESET</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

WishlistScreen.contextType = UserContext;
