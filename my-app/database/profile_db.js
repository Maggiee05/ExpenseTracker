import loginDb from './login_db';

/**
 * The profile screen database backend function
 * Set the current user's status based on the comparison between the goal and actual balance
 */
async function setStatus(user, goal) {
  const refStr = `users/${user}`;
  const snapshot = await loginDb.ref(refStr).once('value');

  const { balance } = snapshot.toJSON();
  const rest = goal - balance;
  let status = '';
  if (rest < 0) {
    status = "You've reached your goal. Good Job!";
  } else {
    status = `You have $${rest} remaining. Keep going!`;
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

  const { status } = snapshot.toJSON();
  const { goal } = snapshot.toJSON();
  if (goal !== 0) {
    return [status, goal];
  }
  return [status, ''];
}

export { setStatus, getGoalStatus };
