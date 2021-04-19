import { setBalance, setMonthlyBalance, getBalance } from '../database/tracker_db';
import { getMonthly, getCategory } from '../database/report_db';
import { getGoalStatus } from '../database/profile_db';

test('Total Balance Changed', async () => {
  const oldData = await getBalance('user1');
  expect(oldData).not.toBeNull();
  const newDataInc = await setBalance('user1', 100, 'Housing');
  expect(newDataInc).toBe(oldData + 100);
  const newDataDec = await setBalance('user1', -100, 'Housing');
  expect(newDataDec).toBe(oldData);
});

test('Monthly Balance Changed', async () => {
  const oldData = await (await getMonthly('user1')).datasets[0].data[1];
  expect(oldData).not.toBeNull();
  await setMonthlyBalance('user1', 1000, 1); // January + 1000
  const newDataInc = await (await getMonthly('user1')).datasets[0].data[1];
  expect(newDataInc).toBe(oldData + 1000);
  await setMonthlyBalance('user1', -1000, 1); // January - 1000, original value
  const newDataDec = await (await getMonthly('user1')).datasets[0].data[1];
  expect(newDataDec).toBe(oldData);
});

test('Category Balance Changed', async () => {
  const expenseTotal = await getCategory('user1', 0);
  const incomeTotal = await getCategory('user1', 1);
  const balance = await getBalance('user1');
  expect(balance).toBe(incomeTotal[1] - expenseTotal[1]);
});

test('Get Status', async () => {
  const status = await getGoalStatus('user1');
  expect(status).not.toBeNull();
});
