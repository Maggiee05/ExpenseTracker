import { Base64 } from 'js-base64';
import loginDb from './login_db';

/**
 * The profile screen database backend function
 * Set the current user's status based on the comparison between the goal and actual balance
 */
async function setStatus(user, goalAmount, newCurrency) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');

  const { balance, goal, currency } = snapshot.toJSON();
  let rest = 0;
  let currencyFinal = '';
  if (goalAmount === 0) {
    rest = goal - balance;
    currencyFinal = currency;
  } else {
    rest = goalAmount - balance;
    currencyFinal = newCurrency;
  }
  let status = '';
  if (rest < 0) {
    status = "You've reached your goal. Good Job!";
  } else {
    status = `You have ${currencyFinal}${rest} remaining. Keep going!`;
  }
  loginDb.ref(refStr).update({
    status,
    goal,
  });
  return status;
}

/**
 * Get the current user's goal amount and status from database
 */
async function getGoalStatus(user) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');

  const { status, goal } = snapshot.toJSON();
  if (goal !== 0) {
    return [status, goal];
  }
  return ['', ''];
}

/**
 * Delete the current user's account in database
 */
function deleteAccount(user) {
  const refStr = `users/${user}`;
  loginDb.ref(refStr).remove()
    .then(() => {
      console.log(`Account ${user} is removed.`);
    })
    .catch((error) => {
      console.log(`Remove failed: ${error.message}`);
    });
}

/**
 * Set new password of a certain user, hashed
 */
function setPassword(user, password) {
  const refStr = `users/${user}`;
  loginDb.ref(refStr).update({
    password: Base64.encode(password),
  });
}

/**
 * Get the original password of the user from database, hashed
 */
async function getPassword(user) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');

  const { password } = snapshot.toJSON();
  return Base64.decode(password);
}

/**
 * Change the currency
 */
async function changeCurrency(user, flag) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');
  const { currency } = snapshot.toJSON();
  if (flag === 0) {
    return currency;
  }
  let newCurrency = '¥';
  if (currency === '¥') {
    newCurrency = '$';
  }
  loginDb.ref(refStr).update({
    currency: newCurrency,
  });
  return newCurrency;
}

/**
 * Check if the current date is the end of the month
 */
function checkEndofMonth(month, date) {
  const days30 = [2, 4, 6, 9, 11];
  const days31 = [1, 3, 5, 7, 8, 10, 12];
  if (days30.includes(month) && date === 30) {
    return true;
  } if (days31.includes(month) && date === 31) {
    return true;
  }
  return false;
}

export {
  setStatus, getGoalStatus, deleteAccount, setPassword,
  getPassword, changeCurrency, checkEndofMonth,
};
