const countertests = (mealsListarray) => {
  document.body.innerHTML = '<div id ="meals"> </div>';
  const meals = document.getElementById('meals');

  const mealsList = document.createElement('li');
  const mealslistarray = Array.from(document.querySelectorAll('#meals li'));
  mealsListarray.forEach((item) => {
    mealsList.innerHTML = `${item.name} `;
    meals.appendChild(mealsList);
    mealslistarray.push(mealsList);
  });
  return mealslistarray;
};

const apiMock2 = (id, name) => {
  const mealsListarray = [{
    id: '1',
    name: 'chicken',
  }, {
    id: '2',
    name: 'meat',
  },
  ];
  const meal = {
    id,
    name,
  };
  mealsListarray.push(meal);
  countertests(mealsListarray);
  return mealsListarray;
};

export { apiMock2, countertests };
