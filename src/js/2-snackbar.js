import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


const makePromise = ({ status, delay }) => {
    return new Promise((resolve, reject) => {
         setTimeout(() => {
                  if(status === 'fulfilled') {
                      resolve(`✅ Fulfilled promise in ${delay}ms`);
                  } else {
                      reject(`❌ Rejected promise in ${delay}ms`);
                  }
              }, delay);
    });
  };

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const status = form.elements.state.value;
    const delay = Number(form.elements.delay.value);
    makePromise({ status, delay })
        .then(value => {
            iziToast.success({
                message: value,
                timeout: 3000,
                position: 'topRight'
            });
        })
        .catch(error => {
            iziToast.error({
                message: error,
                timeout: 3000,
                position: "topRight"
            });
        })
    form.reset();
    
});