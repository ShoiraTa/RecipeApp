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
    .then((response) => response);
  window.location.reload();
};

const Displaylikes = async () => {
  const likeditems = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/3ZrrNIt8NnVNPbr64tsy/likes')
    .then((response) => response.json())
    .then((data) => data);
  const likesnumber = document.getElementsByClassName('likes-qty');
  likeditems.forEach((e, i) => {
    likesnumber[i].innerHTML = e.likes;
  });
};

Displaylikes();

const like = () => {
  const likebtns = document.getElementsByClassName('fa-heart');
  const likebtnsarray = Array.from(likebtns);
  likebtnsarray.forEach((element, i) => {
    element.addEventListener('click', () => {
      likeapi(i);
    });
  });
};

setTimeout(() => like(), 500);