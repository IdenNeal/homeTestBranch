// move
let step,
    globalStop = () => {
      p.apdate();
    },
    coords = (element, vector) => element.getBoundingClientRect()[vector] - element.parentNode.getBoundingClientRect()[vector];

// отдельный класс для точек останова, для задания функционала можно отнаследовать и сделать списки заданий для каждого экземпляра
class Dot{
  constructor(x,y,obj,ex) {
    this.x = x;
    this.y = y;
    this.ex = ex;
    this.obj = obj;
  }

  question(player){

    let a = 9;
    document.querySelector('.time span').innerText = '0'+a;

    let timer = setInterval(function () {
      if (a <= 0) {
        clearInterval(timer);
        document.querySelector('.lateness-box').style.display = 'block';
      } else {
          document.querySelector('.time span').innerText = '0'+a--;
      }
    }, 1000);
    

    document.querySelector('.modal').classList.add('modal_open');
    document.querySelector('.navigation').style.zIndex = 0;
    document.querySelector('.form__x').innerHTML = this.ex.a;
    document.querySelector('.form__y').innerHTML = this.ex.b;
    let res = null,
        trueRes = this.ex.c,
        point = this.ex.points,
        d = 0,
        p = 0;

    document.querySelector('.form__resp').focus();

    document.querySelector('.form__send').onclick = function (event) {
      res = document.querySelector('.form__resp').value
      if (res == trueRes) {
        p = document.querySelector('.points').innerText*1 + point;
        document.querySelector('.points').innerText = p;
        document.querySelector('.form__info').style.color = "rgb(4, 11, 113)";
        document.querySelector('.form__info').innerText = 'Правильно!';

        document.querySelector('.time span').innerText = '00';
        clearInterval(timer);
      } else {
        d = -1;
        console.log(d);
        p = document.querySelector('.points').innerText*1 + d;
        document.querySelector('.points').innerText = p;
        document.querySelector('.form__info').style.color = "rgb(175, 0, 0)";
        document.querySelector('.form__info').innerText = "Вы ошиблись -1 бал. Ответ:  " + trueRes;

        document.querySelector('.time span').innerText = '00';
        clearInterval(timer);
      }

      setTimeout(()=>{
        document.querySelector('.form__resp').value = '';
        document.querySelector('.form__info').innerText = ''
        document.querySelector('.form__info').style.color = '';
        this.parentNode.parentNode.classList.remove('modal_open');
        this.onclick = null;
        player.points = document.querySelector('.points').innerText*1;
        console.log(player.points);
        document.querySelector('.navigation').style.zIndex = 3;
      }, 1500);
    };


  }
};

class Player{
  static obs = [];

  constructor() {
    this.obj = document.querySelector('.player');
    this.traectory = document.querySelector('.wayGo path').attributes.d.nodeValue;
    this.obj.style["offset-path"] = `path("${this.traectory}")`;
    this.x = coords(this.obj, 'x');
    this.y = coords(this.obj, 'y');
    this.stopCount = 1;
    this.points = 0;
  }

  gameEnd(){
    // !!!
    document.querySelector('.resultPoints__point > span').innerText = document.querySelector('.points').innerText;
    document.querySelector('.resultPoints-box').style.display = 'block';
  }



  apdate(){
    this.x = coords(this.obj, 'x');
    this.y = coords(this.obj, 'y');

    // console.log(this.x,this.y);

    let stop = Player.obs[this.stopCount];

    let x = this.x-stop.x, y = this.y-stop.y;

    if (x <= 5 && x > -5 && y <= 5 && y > -5) {
      
      
      if (Player.obs[Player.obs.length-1] == stop) p.gameEnd();
      else stop.question(this);
      this.stopCount++;
      this.stop();
    }
  }

  begin(){
    this.obj.style["animation"] = `move-along 30000ms 0ms 1 alternate linear both`;

    let dots = document.querySelectorAll('.dot');

    dots.forEach((el,i) => {
      let x = coords(el, 'x'),
          y = coords(el, 'y')-60,
          newDot = new Dot(x,y,el,exercise[i]);

      Player.obs.push(newDot);
      if (!step) step = setInterval(globalStop,5);
    });
  }

  stop(){
    this.obj.style.animationPlayState = "paused";
    clearInterval(step);
    step = null;
  }

  go(){
    if (!step) step = setInterval(globalStop,5);
    return () => this.obj.style.animationPlayState = "running";
  }
};

let p = new Player();
document.querySelector('.navigation__activate').addEventListener('click', e => {
  e.preventDefault();
  if (!Player.obs.length) p.begin();
  p.go()();
});
// move end