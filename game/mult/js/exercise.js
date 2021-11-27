let ap = bp = 0, exercise = null;

document.querySelector('.complexity-box').addEventListener('click', function (event) {

  let e = event.target;

  if (e.getAttribute('name') && e.getAttribute('name') == 'complexity_size') {
    let com = e.value;

    
    switch (com) {
      case '1':
        ap = 10;
        bp = 10;
        break;
      case '2':
        ap = 100;
        bp = 10;
        break;
      case '3':
        ap = 100;
        bp = 100;
        break;
      default:
        ap = 10;
        bp = 10;
    }
  }

  exercise = (function(ap, bp) {
    let quantity = 53,
        i = 0,
        j = 1,
        arr = [],
        a,
        b;
        
    while (i < quantity) {
      let exerciseItem = {};
  
      a = (()=>{
        j = j > 9 ? 1 : j;
        let createNum = function (x) {
          let num = (Math.random()*ap).toFixed()*1;
          if (!num) {
            return j++;
          } else {
            return num;
          }
        }
        return createNum();
      })();
      b = (()=>{
        j = j > 10 ? 1 : j;
        let createNum = function (x) {
          let num = (Math.random()*bp).toFixed()*1;
          if (!num) {
            return j++;
          } else {
            return num;
          }
        }
        return createNum();
      })();

  
      exerciseItem.id = i;
      exerciseItem.a = a;
      exerciseItem.b = b;
      exerciseItem.c = exerciseItem.a * exerciseItem.b;
      exerciseItem.points = 2;
      i++;
      arr.push(exerciseItem);
    }
  
    return arr;
  })(ap, bp);

  // console.log(this);
  this.style.display = 'none';
});

