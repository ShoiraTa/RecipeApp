// Get comments from API
const getComments = async () => {
  const submitBtn = document.getElementById('submit-comment');
  const ul = document.getElementById('comments-ul');
  const id = submitBtn.getAttribute('data');
  const commentsCount = document.getElementById('comments-count');

  const get = () => fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3ZrrNIt8NnVNPbr64tsy/comments?item_id=${id}`)
    .then((res) => res.json());

  const mealComments = await get();

  commentsCount.innerHTML = `${mealComments.length > 0 ? `${mealComments.length}` : '0'}`;

  ul.innerHTML = '';
  if (mealComments.length > 0) {
    mealComments.forEach((elem) => {
      const liComments = document.createElement('li');
      liComments.innerHTML = `
      <p><span class="bold">${elem.creation_date} ${elem.username}</span>: ${elem.comment}</p>
      `;
      ul.appendChild(liComments);
    });
  }
};

// Post comments from API
const postComment = () => {
  const userNameInput = document.getElementById('input-name');
  const alert = document.getElementById('alert');
  const userComment = document.getElementById('comment');
  const submitBtn = document.getElementById('submit-comment');

  const post = (id, name, comment) => fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3ZrrNIt8NnVNPbr64tsy/comments',
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
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const id = submitBtn.getAttribute('data');
    const name = userNameInput.value;
    const comment = userComment.value;
    alert.innerHTML = '';
    if (name !== '' && comment !== '') {
      userNameInput.value = '';
      userComment.value = '';
      await post(id, name, comment)
        .then(() => getComments());
    } else alert.innerHTML = 'Please insert your name and comment';
  });
};

export default postComment;