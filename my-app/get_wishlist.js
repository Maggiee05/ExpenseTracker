import cheerio from 'cheerio';
import fetch from 'node-fetch';

/**
 * Backend for scraping data from certain website
 * Has attribute: url (user-input url), name (name of the product),
 * and imgUrl, rate, price, stock (of the product)
 */
export default async function loadProductInfo(searchUrl) {
  let response = null;
  try {
    response = await fetch(searchUrl);
  } catch (error) {
    return response;
  }

  const $ = cheerio.load(await response.text());

  let getStock = 'In Stock';
  let getRate = $('span:contains("out of")').text().split(' ')[0];
  const getPrice = $('#priceblock_ourprice').text().slice(1, -1);

  if (getPrice === '') {
    getStock = 'Out of Stock';
    getRate = '';
  }

  return {
    url: searchUrl,
    productName: $('title').text().trim().split('.com: ')[1],
    imageUrl: $('.celwidget').children('img').attr('src'),
    rate: getRate,
    price: getPrice,
    stock: getStock,
  };
}
