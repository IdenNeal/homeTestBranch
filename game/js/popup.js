let weekLink = document.querySelector('.tab__link_week'),
    commonLink = document.querySelector('.tab__link_common'),
    weekContent = document.querySelector('.tab__content_week'),
    commonContent = document.querySelector('.tab__content_common'),
    closeRating = document.querySelector('.rating__close');
    openRating = document.querySelector('.navigation__rating');

document.querySelector('.tab').addEventListener('click', function (event) {
  let target = event.target;

  if (target == weekLink || target == commonLink) {
    commonLink.classList.toggle('tab__link_active');
    commonContent.classList.toggle('tab__content_active');
    weekLink.classList.toggle('tab__link_active');
    weekContent.classList.toggle('tab__content_active');
  }
});

(()=>{
  let rating = data.rating,
      ratingFriends = data.friends,
      createRow = (pos, img, name, exp, id) => {
        let listItem = document.createElement('li'),
            row = document.createElement('p'),
            rp = document.createElement('span'),
            ri = document.createElement('span'),
            rn = document.createElement('span'),
            re = document.createElement('span');

        for (let i = 0; i < ratingFriends.length; i++) {
          let el = ratingFriends[i];
          if (el.id == id) {
            listItem.setAttribute('class', 'tab__item tab__item_friend');
            break;
          } else {
            listItem.setAttribute('class', 'tab__item');
          }
        }

        row.setAttribute('class', 'row sprite');
        rp.setAttribute('class', 'row__position');
        ri.setAttribute('class', 'row__img sprite');
        rn.setAttribute('class', 'row__name');
        re.setAttribute('class', 'row__exp');

        if (img) {
          let pic = new Image();
          pic.src = img;
          ri.append(pic);
        } else {
          ri.innerText = '';
        }

        re.innerText = exp;
        rn.innerText = name;
        rp.innerText = pos;

        row.append(rp);
        row.append(ri);
        row.append(rn);
        row.append(re);
        listItem.append(row);

        return listItem;
      };

  rating.sort((a,b) => b.points-a.points);

  rating.forEach((el,i) => {
    let li = createRow(i+1, '', el.name+' '+el.lastName, el.points, el.id);

    document.querySelector('.tab__list').append(li);
  });

})();

openRating.addEventListener('click', function (event) {
  event.preventDefault();

  document.querySelector('.popup').classList.add('popup_open');
});

closeRating.addEventListener('click', function (event) {
  event.preventDefault();

  document.querySelector('.popup').classList.remove('popup_open');
})