const forms = document.querySelectorAll('form');

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // simple valid
        inputs = form.querySelectorAll('input');

        inputs = [...inputs];
        
        form.querySelector(`textarea`) ? inputs[inputs.length] = document.querySelector(`textarea`) : '';

        for (let i = 0; i < inputs.length; i++)
          if(!inputs[i].validity.valid) return false;
    
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });

        let FN = this.classname == 'order__form' ? './mailer/order.php' : './mailer/ask.php'

        fetch(FN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        }).then(data => {
            console.log(object);
            console.log(data);

            // done
            let res = form.querySelector(`.result`);
            res.style.opacity = '1';
            res.style.zIndex = '11';
            
        }).catch(() => {
            alert('Error! Reload the page and try again.');
        }).finally(() => {
            form.reset();
        });
    });
};