document.querySelector('.menu__button').addEventListener('click', function () {
  document.querySelector('.menu__links').classList.toggle('active');
});

let control = (name) => document.querySelectorAll(`.${name}`).length;

if(control('reviewsSlider') && control('faq__list')) {
  // slider init
  new Sim('.reviewsSlider');

  // faq tabs
  let acc = document.querySelectorAll(".faq__list .list__item .item__title");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      // console.log(this);
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }

  // pop-up activation
  let body = document.body,
      popUp = document.querySelector('.pop-up'),
      popUpClose = popUp.querySelector('.pop-up__btn'),
      popData = popUp.querySelector('.pop-up__img'),
      // license = document.querySelector('.progress__element .element__description .description__btn'),
      certificate = document.querySelector('.confidence__steps .item__description .description__btn'),
      reviews = document.querySelectorAll('.confidence__reviews .list__item .item__link');

  function popUpActivation(elm) {
    event.preventDefault();
    let src = elm.dataset.src,
        alt = elm.dataset.alt;

    popUp.style.top = '0';
    popUp.style.opacity = '1';
    body.style.overflow = 'hidden';
    popData.setAttribute('src', src);
    popData.setAttribute('alt', alt);
  };

  // license.addEventListener("click", function(){
  //   popUpActivation(this)
  // });
  certificate.addEventListener("click", function(){
    popUpActivation(this)
  });

  reviews.forEach((elm)=>{elm.addEventListener("click", function(){popUpActivation(this)});})

  popUpClose.addEventListener("click", function() {
    let src = '#',
        alt = '#';
    
    popUp.style.top = '-100%';
    popUp.style.opacity = '0';
    body.style.overflow = '';
    popData.setAttribute('src', src);
    popData.setAttribute('alt', alt);
  });
};

// FORM OPEN
function formOpen(elm) {
  event.preventDefault();
  let name = elm.dataset.formname;

  let form = document.querySelector(`.${name}`);
  form.style.top = '0';
  form.style.opacity = '1';
  document.body.style.overflow = 'hidden';
};

document.querySelector('.motivation__btn') ? document.querySelector('.motivation__btn').addEventListener("click", function(){
  formOpen(this)
}) : '';
document.querySelector('.faq__mail') ? document.querySelector('.faq__mail').addEventListener("click", function(){
  formOpen(this)
}) : '';
document.querySelector('.form__activation') ? document.querySelector('.form__activation').addEventListener("click", function(){
  formOpen(this)
}) : '';

document.querySelector('.connection__link--mail') ? document.querySelector('.connection__link--mail').addEventListener("click", function(){
  formOpen(this)
}) : '';


let close = [
              document.querySelector('.ask__btn'),
              document.querySelector('.order__btn')
            ];

close.forEach(el => {
  if (el)
    el.addEventListener("click", function() {
      // console.log(this.parentNode.parentNode.className);
      let parent = this.parentNode.parentNode,
          res = document.querySelector(`.${parent.className} .${parent.className}__result`);
      parent.style.top = '-100%';
      parent.style.opacity = '0';
      document.body.style.overflow = '';

      res.style.opacity = '0';
      res.style.zIndex = '-1';

    });
  return false;
});

// #orderTel mask/validation
window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('#orderTel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___)-___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });
});

// FORM ACTION
/*
document.querySelector('.ask .form__row .row__btn').addEventListener('click', function (e) {
  let res = document.querySelector(`.ask .result`);
      inputs = document.querySelector(`.ask`).querySelectorAll('input');

  inputs = [...inputs]; 
  inputs[inputs.length] = document.querySelector(`.ask textarea`);

  for (let i = 0; i < inputs.length; i++)
    if(!inputs[i].validity.valid) return false;

  e.preventDefault();
  res.style.opacity = '1';
  res.style.zIndex = '11';

  document.querySelector(`.ask__form`).reset();
});

document.querySelector('.order .form__row .row__btn').addEventListener('click', function (e) {
  let res = document.querySelector(`.order .result`);
  inputs = document.querySelector(`.order`).querySelectorAll('input');
  
  for (let i = 0; i < inputs.length; i++)
    if(!inputs[i].validity.valid) return false;
    
  e.preventDefault();
  res.style.opacity = '1';
  res.style.zIndex = '11';

  document.querySelector(`.order__form`).reset();
});
*/

// timetable tabs
function TabsActivation(links, wrap, box) {
  let timetableTabs = document.querySelectorAll(links);
  timetableTabs.forEach(el => el.addEventListener('click', openTimetable))
  function openTimetable() {
    let tabBox = document.querySelector(wrap),
        i,
        tabcontent,
        tablinks;
  
    tabcontent = tabBox.querySelectorAll(box);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = tabBox.querySelectorAll(links);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // console.log(tabBox);
  
    tabBox.querySelector(`${box}[data-name=${this.dataset.name}]`).style.display = "block";
    event.currentTarget.className += " active";
  };
  
  timetableTabs[0].click();
};

if(control('tab') && control('tabs__wrap--timetable'))
  TabsActivation('.tab > .tablinks', '.tabs__wrap--timetable', '.tabcontent');

if(control('btn__list') && control('policy'))
  TabsActivation('.btn__list > .tablinks', '.policy', '.tabcontent');