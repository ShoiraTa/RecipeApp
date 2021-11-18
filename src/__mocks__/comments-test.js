const commentsTest = (commentsArr) => {
  document.body.innerHTML = '<ul id ="comments-ul"> </ul>';
  const commentsUl = document.getElementById('comments-ul');

  const commentList = document.createElement('li');
  const commentArr = Array.from(document.querySelectorAll('#comments-ul li'));
  commentsArr.forEach((element) => {
    commentList.innerHTML = `${element.name}: ${element.comment}`;
    commentsUl.appendChild(commentList);
    commentArr.push(commentList);
  });
  return commentArr;
};

const apiMock = (id, name, userComment) => {
  const commentsArr = [{
    id: '1',
    name: 'Kate',
    userComment: 'new Comment',
  }, {
    id: '2',
    name: 'Mike',
    userComment: 'new Comment',
  },
  ];
  const comment = {
    id,
    name,
    userComment,
  };
  commentsArr.push(comment);
  commentsTest(commentsArr);
  return commentsArr;
};

export { apiMock, commentsTest };
