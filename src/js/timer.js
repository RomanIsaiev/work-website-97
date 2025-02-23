function getTimeRemaining(endtime) {
  const t = endtime - new Date().getTime();
  const days = Math.max(Math.floor(t / (1000 * 60 * 60 * 24)), 0);
  const hours = Math.max(Math.floor((t / (1000 * 60 * 60)) % 24), 0);
  const minutes = Math.max(Math.floor((t / (1000 * 60)) % 60), 0);
  const seconds = Math.max(Math.floor((t / 1000) % 60), 0);
  return {
    total: t,
    days,
    hours,
    minutes,
    seconds,
  };
}

function declensionNum(number, words) {
  if (number > 10 && number < 20) return words[2];
  const n = number % 10;
  if (n === 1) return words[0];
  if (n > 1 && n < 5) return words[1];
  return words[2];
}

function initializeClock(timerSelector, endtime) {
  const timer = document.querySelector(timerSelector);
  const daysElement = timer.querySelector('.timer__days');
  const hoursElement = timer.querySelector('.timer__hours');
  const minutesElement = timer.querySelector('.timer__minutes');
  const secondsElement = timer.querySelector('.timer__seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    // Обновляем значения времени
    daysElement.textContent = String(t.days).padStart(2, '0');
    hoursElement.textContent = String(t.hours).padStart(2, '0');
    minutesElement.textContent = String(t.minutes).padStart(2, '0');
    secondsElement.textContent = String(t.seconds).padStart(2, '0');

    // Устанавливаем правильные склонения в data-title
    daysElement.dataset.title = declensionNum(t.days, ['день', 'дня', 'дней']);
    hoursElement.dataset.title = declensionNum(t.hours, [
      'час',
      'часа',
      'часов',
    ]);
    minutesElement.dataset.title = declensionNum(t.minutes, [
      'минута',
      'минуты',
      'минут',
    ]);
    secondsElement.dataset.title = declensionNum(t.seconds, [
      'секунда',
      'секунды',
      'секунд',
    ]);

    // Если время истекло, останавливаем таймер
    if (t.total <= 0) {
      clearInterval(timeinterval);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
    }
  }

  // Обновляем таймер каждую секунду
  const timeinterval = setInterval(updateClock, 1000);
  updateClock(); // Первоначальный вызов, чтобы сразу отобразить данные
}

// Указываем дату завершения
// Конечная дата (2024 года января 10  , 20:00:00)
const deadline = new Date(2025, 1, 26, 10, 0, 0).getTime();

// Инициализируем таймер
initializeClock('.timer', deadline);
initializeClock('.timer2', deadline);

// function getTimeRemaining(endtime) {
//   const t = endtime - new Date().getTime();
//   const days = Math.max(Math.floor(t / (1000 * 60 * 60 * 24)), 0);
//   const hours = Math.max(Math.floor((t / (1000 * 60 * 60)) % 24), 0);
//   const minutes = Math.max(Math.floor((t / (1000 * 60)) % 60), 0);
//   const seconds = Math.max(Math.floor((t / 1000) % 60), 0);
//   return {
//     total: t,
//     days,
//     hours,
//     minutes,
//     seconds,
//   };
// }

// function declensionNum(number, words) {
//   if (number > 10 && number < 20) return words[2];
//   const n = number % 10;
//   if (n === 1) return words[0];
//   if (n > 1 && n < 5) return words[1];
//   return words[2];
// }

// function initializeClock(timerSelector) {
//   const timer = document.querySelector(timerSelector);
//   const daysElement = timer.querySelector('.timer__days');
//   const hoursElement = timer.querySelector('.timer__hours');
//   const minutesElement = timer.querySelector('.timer__minutes');
//   const secondsElement = timer.querySelector('.timer__seconds');

//   let endtime = calculateDeadline();

//   function calculateDeadline() {
//     const now = new Date();
//     return now.getTime() + 3 * 24 * 60 * 60 * 1000; // Добавляем 3 дня к текущему времени
//   }

//   function updateClock() {
//     const t = getTimeRemaining(endtime);

//     // Обновляем значения времени
//     daysElement.textContent = String(t.days).padStart(2, '0');
//     hoursElement.textContent = String(t.hours).padStart(2, '0');
//     minutesElement.textContent = String(t.minutes).padStart(2, '0');
//     secondsElement.textContent = String(t.seconds).padStart(2, '0');

//     // Устанавливаем правильные склонения в data-title
//     daysElement.dataset.title = declensionNum(t.days, ['день', 'дня', 'дней']);
//     hoursElement.dataset.title = declensionNum(t.hours, [
//       'час',
//       'часа',
//       'часов',
//     ]);
//     minutesElement.dataset.title = declensionNum(t.minutes, [
//       'минута',
//       'минуты',
//       'минут',
//     ]);
//     secondsElement.dataset.title = declensionNum(t.seconds, [
//       'секунда',
//       'секунды',
//       'секунд',
//     ]);

//     // Если время истекло, пересчитываем deadline и продолжаем
//     if (t.total <= 0) {
//       endtime = calculateDeadline();
//     }
//   }

//   // Обновляем таймер каждую секунду
//   const timeinterval = setInterval(updateClock, 1000);
//   updateClock(); // Первоначальный вызов, чтобы сразу отобразить данные
// }

// // Инициализируем таймер
// initializeClock('.timer');
