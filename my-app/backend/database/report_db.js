import loginDb from './login_db';

/**
 * Get the monthly balance from the database, used for ploting monthly line chart
 */
async function getMonthly(user) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');
  const data = snapshot.toJSON().monthlyBalance;

  const vals = Object.values(data);

  const result = {};

  result.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  result.datasets = [{
    data: vals,
  }];
  result.legend = ['Monthly report'];

  return result;
}

/**
 * Get the categorical data from database, used for plotting categorical pie chart
 * flag: 0 for expense, 1 for income
 */
async function getCategory(user, flag) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');
  const data = snapshot.toJSON().category;

  const categories = Object.keys(data); // The category attributes
  const vals = Object.values(data); // The amount of each corresponding category

  const categoryData = [];
  let total = 0;
  const colors = ['#f0e68c', '#9acd32', '#f08080', '#ebd8fd', '#dc143c', '#ffa500', '#b0c4de', '#cd853f'];
  for (let i = 0; i < categories.length; i += 1) {
    // filtering the positive amounts for income chart, negative for expense chart
    if (((flag === 1) && (vals[i] > 0)) || ((flag === 0) && (vals[i] < 0))) {
      const dict = {};
      dict.name = categories[i];
      dict.population = Math.abs(vals[i]);
      // chart customization
      dict.color = colors[i];
      dict.legendFontColor = '#7F7F7F';
      dict.legendFontSize = 14;
      categoryData.push(dict);
      total += Math.abs(vals[i]);
    }
  }

  return [categoryData, total];
}

export { getMonthly, getCategory };
