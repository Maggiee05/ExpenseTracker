import loginDb from './login_db';

export default async function setBalance(user, addAmount) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');
  const amount = parseFloat(snapshot.toJSON().balance);
  loginDb.ref(refStr).update({
    balance: amount + parseFloat(addAmount),
  });
  const result = parseFloat(snapshot.toJSON().balance) + parseFloat(addAmount);
  return result;
}
