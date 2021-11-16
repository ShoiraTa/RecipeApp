import './style.css';

const main = document.getElementById('main');

async function printMeals(meals) {
  console.log('here:', meals.meals.length);
  for (let i = 0; i < meals.meals.length; i += 1) {
    const meal = document.createElement('div');
    console.log('here:', meals.meals[i].strMeal);
    meal.innerHTML = `      
    <div class="meal">
    <div class="meal-header">
      <img src="${meals.meals[i].strMealThumb}" alt="${meals.meals[i].strMeal}">
    </div>
      <div class="meal-body">
        <h4>${meals.meals[i].strMeal}</h4>
        <button class="fav-btn"><i class="fas fa-heart "></i></button>
      </div>
    </div>`;
    main.appendChild(meal);
  }
}
async function getRandomMeal() {
  const respond = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast');
  const respData = await respond.json();
  printMeals(respData);
}

getRandomMeal();