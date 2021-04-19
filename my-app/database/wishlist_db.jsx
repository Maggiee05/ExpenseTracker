import loginDb from './login_db';

/**
 * Update the product information in database
 */
function setWishlist(data, user) {
  const refStr = `users/${user}`;
  loginDb.ref(refStr).update({
    price: data.price,
    productName: data.productName,
    rate: data.rate,
    stock: data.stock,
    imageUrl: data.imageUrl,
    url: data.url,
  });
}

/**
 * Reset the wishlist
 * The default image if the Amazon logo, the default url is the Amazon Home Page
 */
function resetWishlist(user) {
  const refStr = `users/${user}`;
  const resetData = {
    price: '',
    rate: '',
    imageUrl: 'http://pngimg.com/uploads/amazon/amazon_PNG21.png',
    url: 'https://www.amazon.com/ref=nav_logo',
    productName: '',
    stock: '',
  };

  loginDb.ref(refStr).update(resetData);
  return resetData;
}

export { setWishlist, resetWishlist };
