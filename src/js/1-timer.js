import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "flatpickr/dist/flatpickr.min.css";

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

const toggleFieldDisabled = (selector, value = false) => {
    const field = document.querySelector(selector);
    if(value) {
        field.setAttribute("disabled", value);        
    } else {
        field.removeAttribute("disabled");
    }    
}

let selectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() < Date.now()) {            
            toggleFieldDisabled('button', true);
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
                timeout: 3000
            });
        } else {
            toggleFieldDisabled('button', false);
            selectedDate = selectedDates[0].getTime();
        }
    },
    onOpen() {
        toggleFieldDisabled('button', false);
    }
};

flatpickr('#datetime-picker', options);

const startTimer = () => {
    toggleFieldDisabled('button', true);
    toggleFieldDisabled('input', true);
    const days = document.querySelector('span.value[data-days]');
    const hours = document.querySelector('span.value[data-hours]');
    const minutes = document.querySelector('span.value[data-minutes]');
    const seconds = document.querySelector('span.value[data-seconds]');
    
    const timer = setInterval(() => {
        const time = convertMs(selectedDate - Date.now());
        days.innerHTML = String(time.days).padStart(2, '0');
        hours.innerHTML = String(time.hours).padStart(2, '0');
        minutes.innerHTML = String(time.minutes).padStart(2, '0');
        seconds.innerHTML = String(time.seconds).padStart(2, '0');
        if(selectedDate - Date.now() < 1000) {
            toggleFieldDisabled('button', false);
            toggleFieldDisabled('input', false);
            clearInterval(timer);
        }
    }, 1000);

    
}

const button = document.querySelector('button');
button.addEventListener('click', startTimer);