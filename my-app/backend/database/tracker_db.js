import loginDb from './login_db';

/**
 * Get the current user's balance from the database
 */
async function getBalance(user) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');
  const result = parseFloat(snapshot.toJSON().balance);
  return result;
}

/**
 * Update the balance attribute in the database
 * Based on the user-selected category and user-input amount
 */
async function setBalance(user, addAmount, category) {
  // Modify the balance
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');
  const amount = parseFloat(snapshot.toJSON().balance);
  loginDb.ref(refStr).update({
    balance: amount + addAmount,
  });

  // Add or update certain category with amount into database
  const data = snapshot.toJSON().category;
  let toUpdate = {};
  if (data === '') {
    toUpdate[category] = addAmount;
  } else if (category in data) {
    data[category] += addAmount;
    toUpdate = data;
  } else {
    data[category] = addAmount;
    toUpdate = data;
  }

  loginDb.ref(refStr).update({
    category: toUpdate,
  });

  const result = await getBalance(user);
  return result;
}

/**
 * Update the monthlyBalance attribute in the database
 * Based on the user-input amount and the current month, index from 0
 */
async function setMonthlyBalance(user, addAmount, month) {
  // the month index is (actual month - 1) due to the React Native convention
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');
  const data = snapshot.toJSON().monthlyBalance;
  data[month] += addAmount;
  loginDb.ref(refStr).update({ monthlyBalance: data });
}

/**
 * Reset the expense tracker
 */
function resetTracker(user) {
  const refStr = `users/${user}`;
  loginDb.ref(refStr).update({ balance: 0, category: '', monthlyBalance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
}

export {
  setBalance, setMonthlyBalance, getBalance, resetTracker,
};
