import likebtn from './img/heart.png';

const mealapiurl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=e';
const meallist = document.querySelector('.meal-list');
const getmeals = async () => {
  const meals = await fetch(mealapiurl)
    .then((res) => res.json())
    .then((data) => data.meals);

  meals.forEach((element) => {
    const newmeal = document.createElement('li');

    newmeal.innerHTML = `<h4>${element.strMeal}</h4>
            <img src="${element.strMealThumb}">;
            <img src='${likebtn}'>`;

    meallist.appendChild(newmeal);
  });
  return meals;
};
getmeals();