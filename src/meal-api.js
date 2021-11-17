const getComments = async () => {
  const submitBtn = document.getElementById('submit-comment');
  const ul = document.getElementById('comments-ul');
  const id = submitBtn.getAttribute('data');
  const commentsCount = document.getElementById('comments-count');

  const get = () => fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/USJEEv7W2YAs453iqIPM/comments?item_id=${id}`)
    .then((res) => res.json());

  const mealComments = await get();
  commentsCount.innerHTML = `${mealComments.length > 0 ? `${mealComments.length}` : '0'}`;

  ul.innerHTML = '';
  mealComments.forEach((elem) => {
    console.log('worked');
    const liComments = document.createElement('li');
    liComments.innerHTML = `
    <p><span class="bold">${elem.creation_date} ${elem.username}</span>: ${elem.comment}</p>
    `;
    ul.appendChild(liComments);
  });
};

const postComment = () => {
  const userNameInput = document.getElementById('input-name');
  const userComment = document.getElementById('comment');
  const submitBtn = document.getElementById('submit-comment');

  const post = (id, name, comment) => fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/USJEEv7W2YAs453iqIPM/comments',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(
        {
          item_id: id,
          username: name,
          comment,
        },
      ),
    })
    .then((res) => res.text());
  getComments();
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = submitBtn.getAttribute('data');
    const name = userNameInput.value;
    const comment = userComment.value;
    post(id, name, comment);
    getComments();
  });
};

// Popup window //
const popup = async () => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const btn = document.getElementsByClassName('comments');
  const modal = document.querySelector('#modal');

  const popupModalDataSet = async (id) => {
    const mealapiurl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const meals = await fetch(mealapiurl)
      .then((res) => res.json())
      .then((data) => data.meals);
    meals.forEach((element) => {
      if (element.idMeal === id) {
        modal.innerHTML = `
        <div class="modal">
        <div class="meal-header justify-end d-flex">
            <button class="close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-header-img d-flex ">
            <img class="modal-img" src="${element.strMealThumb}" alt="${element.strMeal}">
            <h2 class="titme">${element.strMeal}</h2>
        </div>
        <div class="modal-description d-flex ">
        <div class = "left">
        <p> <span class="description-header">Category:</span> ${element.strCategory} <p>
        <p> <span class="description-header">Ingredients:</span>
        <ul id = "ingredientsUl">
        </ul>
        </span><p>
        </div>
        <div class = "right">
        <p> <span class="description-header">Country:</span> ${element.strArea} <p>
        <p> <span class="description-header">Instructions:</span> <p> <span class = "recipe-instrruction"> ${element.strInstructions}  > read more </button> </span>
        </div>
    </div>
    <div class="comments-container">
    <div class="all-comments text-center">
        <h3>Comments <span id= "comments-count">0</span></h3>
        <ul id="comments-ul" class = "d-flex justify-center flex-col">

        </ul>
    </div>
    <div class = "text-center">
      <h3> Add a comment </h3> 
    </div>
    
    <div class="add-comments text-center d-flex justify-center">
      <form action="POST">
          <input name= "name" type="text" id="input-name" placeholder="Your name" required>
          <textarea name="comment" id="comment" cols="30" rows="10" required></textarea>
          <button id="submit-comment" class="submit-comment" data="${element.idMeal}"> Submit</button>
      </form>
    </div>
    </div>
      `;
        const ingredientsUl = document.querySelector('#ingredientsUl');
        const ingredients = () => {
          const entries = Object.entries(element);
          const ingredientsArray = entries
            .filter(([key, value]) => key.startsWith('strIngredient') && value && value.trim())
            /* eslint-disable-next-line */
            .map(([key, value]) => value);
          const measuresArray = entries
            .filter(([key, value]) => key.startsWith('strMeasure') && value && value.trim())
            /* eslint-disable-next-line */
            .map(([key, value]) => value);
          for (let i = 1; i < ingredientsArray.length; i += 1) {
            ingredientsUl.innerHTML += `<li> ${ingredientsArray[i]} - ${measuresArray[i]} </li> `;
          }
        };
        ingredients();
        const exit = document.querySelector('.fa-times');
        exit.addEventListener('click', () => {
          header.classList.remove('hidden');
          main.classList.remove('hidden');
          footer.classList.remove('hidden');
          modal.classList.add('hidden');
        });
      }
      postComment();
    });
  };

  for (let i = 0; i < btn.length; i += 1) {
    btn[i].addEventListener('click', () => {
      window.scrollTo(0, 0);
      const id = btn[i].getAttribute('data');
      popupModalDataSet(id);
      header.classList.add('hidden');
      main.classList.add('hidden');
      footer.classList.add('hidden');
      modal.classList.remove('hidden');
    });
  }
};

// Print meals
const getmeals = async () => {
  const meallist = document.querySelector('.meal-list');
  const getCategoryUrl = async (category) => {
    meallist.innerHTML = '';
    const printMeals = (meals) => {
      meals.forEach((element) => {
        const newmeal = document.createElement('li');
        newmeal.innerHTML = ` 
        <div class="meal">
        <div class="meal-header">
          <img src="${element.strMealThumb}" alt="${element.strMeal}">
        </div>
        <div class="meal-body d-flex justify-between">
          <h4>${element.strMeal}</h4>
          <button class="fav-btn" ><i class="fas fa-heart"></i></button>
        </div>
        <div>
          <div class = "likes"><span class= "likes-qty"> </span> likes </div>
          <button class= "comments" data="${element.idMeal}">Comments</button>
        </div>
      </div>`;
        meallist.appendChild(newmeal);
      });
    };

    const mealapiurl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const meals = await fetch(mealapiurl)
      .then((res) => res.json())
      .then((data) => data.meals);
    printMeals(meals);
    popup();
  };

  const links = document.querySelectorAll('nav li');
  const resetLinks = () => {
    for (let i = 0; i < links.length; i += 1) {
      links[i].classList.remove('active');
    }
  };

  for (let i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', () => {
      const category = links[i].textContent.toLowerCase();
      getCategoryUrl(category);
      resetLinks();
      links[i].classList.add('active');
    });
  }
  getCategoryUrl('seafood');
};
getmeals();
