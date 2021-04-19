import React, { Component } from 'react';
import {
  Text, TextInput, View, Image, Alert, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../style';
import loadProductInfo from '../get_wishlist';
import { UserContext } from '../navigator/context';
import loginDb from '../database/login_db';
import { setWishlist, resetWishlist } from '../database/wishlist_db';

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

  componentDidMount() {
    const currUser = this.context;
    this.getInfo(currUser.user);
  }

  // get the product information and set to state
  getInfo = async (currUser) => {
    const refStr = `users/${currUser}`;
    const snapshot = await loginDb.ref(refStr).once('value');
    this.setState({
      currUser,
      price: snapshot.toJSON().price,
      rate: snapshot.toJSON().rate,
      stock: snapshot.toJSON().stock,
      productName: snapshot.toJSON().productName,
      imageUrl: snapshot.toJSON().imageUrl,
      url: snapshot.toJSON().url,
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

  webHandler = () => {
    this.setState({ showWebView: true });
  }

  backHandler = () => {
    this.setState({ showWebView: false });
    const { navigation } = this.props;
    navigation.navigate('Wishlist');
  }

  webLoading= () => (
    <ActivityIndicator
      size="large"
      style={styles.webLoading}
    />
  )

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

          <View style={{
            alignSelf: 'flex-end',
            marginTop: '10%',
            marginRight: '15%',
            position: 'absolute',
          }}
          >
            <TouchableOpacity onPress={() => this.backHandler()} style={styles.backButton}>
              <Text style={{ fontWeight: 'bold', alignSelf: 'center', marginTop: '23%' }}>Back</Text>
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
