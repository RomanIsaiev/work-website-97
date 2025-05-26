// ************************************************************************

function getLoopedTimeRemaining(baseTime, loopDurationMs) {
  const now = new Date().getTime();
  const timePassed = now - baseTime;
  const timeInCurrentLoop = timePassed % loopDurationMs;
  const t = loopDurationMs - timeInCurrentLoop;

  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function declensionNum(number, words) {
  if (number > 10 && number < 20) return words[2];
  const n = number % 10;
  if (n === 1) return words[0];
  if (n > 1 && n < 5) return words[1];
  return words[2];
}

function initializeLoopedClock(id, baseTime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');
  const daysLabel = clock.querySelector('.days-label');
  const hoursLabel = clock.querySelector('.hours-label');
  const minutesLabel = clock.querySelector('.minutes-label');
  const secondsLabel = clock.querySelector('.seconds-label');

  const loopDurationMs = 1 * 24 * 60 * 60 * 1000; // 3 дня в миллисекундах
  // const loopDurationMs = 20 * 1000; // 3 дня в миллисекундах

  function updateClock() {
    const t = getLoopedTimeRemaining(baseTime, loopDurationMs);

    daysSpan.innerHTML = ('0' + t.days).slice(-2);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    daysLabel.innerHTML = declensionNum(t.days, ['день', 'дня', 'дней']);
    hoursLabel.innerHTML = declensionNum(t.hours, ['час', 'часа', 'часов']);
    minutesLabel.innerHTML = declensionNum(t.minutes, [
      'минута',
      'минуты',
      'минут',
    ]);
    secondsLabel.innerHTML = declensionNum(t.seconds, [
      'секунда',
      'секунды',
      'секунд',
    ]);
  }

  updateClock(); // сразу отображаем
  setInterval(updateClock, 1000);
}

// Установите начальную точку отсчета
const baseStartDate = new Date('April 26, 2025 15:00:00').getTime(); // дата начала циклов
initializeLoopedClock('countdown-one', baseStartDate);
initializeLoopedClock('countdown-two', baseStartDate);
