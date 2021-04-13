import setBalance from '../database/tracker_db';

test('getBalance Not Changed', async () => {
  const data = await setBalance('user1', '0');
  expect(data).not.toBeNull();
  expect(data).toBe(10860);
});

test('getBalance Change', async () => {
  const oldData = await setBalance('user1', '0');
  expect(oldData).not.toBeNull();
  const newDataInc = await setBalance('user1', '100');
  expect(newDataInc).toBe(oldData + 100);
  const newDataDec = await setBalance('user1', '-100');
  expect(newDataDec).toBe(oldData);
});
