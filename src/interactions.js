const Displaylikes = async () => {
  const likeditems = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3ZrrNIt8NnVNPbr64tsy/likes')
    .then((response) => response.json())
    .then((data) => data);

  const likesnumber = document.getElementsByClassName('likes-qty');
  const likebtnsarray = Array.from(likesnumber);

  likebtnsarray.forEach((element) => {
    const likeId = element.getAttribute('data');
    const currentSpan = element;
    likeditems.forEach((e) => {
      if (likeId === e.item_id) {
        currentSpan.innerHTML = e.likes;
      }
    });
  });
};

const likeapi = async (itemid) => {
  await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3ZrrNIt8NnVNPbr64tsy/likes/', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemid,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(() => {
      Displaylikes();
    });
};

const like = () => {
  const likebtns = document.getElementsByClassName('fa-heart');
  const likebtnsarray = Array.from(likebtns);
  likebtnsarray.forEach((element) => {
    const likeId = element.getAttribute('data');
    element.addEventListener('click', () => {
      element.classList.add('heart-active');
      likeapi(likeId);
    });
  });
};

setTimeout(() => like(), 3000);

export { like, Displaylikes };