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
    }
  }

  exercise = ((ap, bp) => {
    let quantity = 53,
        i = 0,
        arr = [],
        a,
        b;
        
    while (i < quantity) {
      let exerciseItem = {};
  
      a = (()=>(Math.random()*ap).toFixed()*1)();
      b = (()=>(Math.random()*bp).toFixed()*1)();
  
      exerciseItem.id = i;
      exerciseItem.a = a;
      exerciseItem.b = b;
      exerciseItem.c = exerciseItem.a + exerciseItem.b;
      exerciseItem.points = 2;
      i++;
      arr.push(exerciseItem);
    }
  
    return arr;
  })(ap, bp);

  // console.log(this);
  this.style.display = 'none';
});

