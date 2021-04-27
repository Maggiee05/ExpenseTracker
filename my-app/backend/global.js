/**
 * Default categories selections
 * With add, delete and get functions
 */
let categories = ['Housing', 'Eating', 'Education', 'Investment',
  'Salary', 'Entertaining', 'Medical', 'Transportation'];

const addCategory = (item) => {
  categories.push(item);
  return categories;
};

const deleteCategory = (item) => {
  const result = categories.filter((e) => e !== item);
  categories = result;
  return categories;
};

const getCategory = () => categories;

const categoryList = {
  addCategory,
  deleteCategory,
  getCategory,
  categories,
};

module.exports = categoryList;
