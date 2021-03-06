import loadProductInfo from '../get_wishlist';

test('getInStockWebsiteData', async () => {
  const data = await loadProductInfo('https://www.amazon.com/All-New-Echo-4th-Gen/dp/B07XKF5RM3/ref=sr_1_3?dchild=1&keywords=alexa&qid=1618241623&s=amazon-devices&sr=1-3');
  expect(data).not.toBeNull();
  expect(data.rate.trim()).toBe('4.7');
  expect(data.productName.trim()).toBe('All-new Echo (4th Gen) | With premium sound, smart home hub, and Alexa | Charcoal');
  expect(data.stock.trim()).toBe('In Stock');
});

test('getOutofStockWebsiteData', async () => {
  const data = await loadProductInfo('https://www.amazon.com/PlayStation-4-Console-1TB-Slim/dp/B074LRF639/ref=sr_1_2?dchild=1&keywords=playstation&qid=1618249966&sr=8-2');
  expect(data).not.toBeNull();
  expect(data.stock).toBe('Out of Stock');
});

test('getInvalidWebsiteData', async () => {
  const data = await loadProductInfo('adjlaskdlaskjdlakdjlks');
  expect(data).toBeNull();
});
