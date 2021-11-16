const mealapiurl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=e';
const meallist = document.querySelector('.meal-list');
const getmeals = async () => {
  const meals = await fetch(mealapiurl)
    .then((res) => res.json())
    .then((data) => data.meals);

  meals.forEach((element) => {
    const newmeal = document.createElement('li');

    newmeal.innerHTML = ` 
    <div class="meal">
    <div class="meal-header">
      <img src="${element.strMealThumb}" alt="${element.strMeal}">
    </div>
    <div class="meal-body d-flex justify-between">
      <h4>${element.strMeal}</h4>
      <button class="fav-btn"><i class="fas fa-heart "></i></button>
    </div>
    <div>
      <div class = "likes"><span class= "likes-qty"> </span> likes </div>
      <button class= "comments">Comments</button>
    </div>
  </div>`;

    meallist.appendChild(newmeal);
  });
  return meals;
};
getmeals();