const targetDateTimezone = "America/Chicago";
const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
container.style.display = "none";
messageContainer.innerHTML = "<h3>Please enter D-Day</h3>";
const intervalIdArr = [];

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const counterMaker = function (data) {
  const nowDate = new Date();

  const targetDate = new Date(data);
  const targetDateWithOffset = new Date(
    targetDate.toLocaleDateString("en-US", {
      timeZone: targetDateTimezone,
    })
  );

  targetDateWithOffset.setHours(23, 59, 59);

  const remaining = (targetDateWithOffset.getTime() - nowDate.getTime()) / 1000;

  const remainingObj = {
    remaining_year: Math.floor(remaining / 3600 / 24 / 365),
    remaining_date: Math.floor(remaining / 3600 / 24) % 365,
    remaining_hour: Math.floor(remaining / 3600) % 24,
    remaining_min: Math.floor(remaining / 60) % 60,
    remaining_sec: Math.floor(remaining) % 60,
  };

  const documentArr = ["year", "days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  if (remaining <= 0) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>Timer stopped.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>Not a valid time</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else {
    let i = 0;
    for (let tag of documentArr) {
      const remainingTime = format(remainingObj[timeKeys[i]]);
      document.getElementById(tag).textContent = remainingTime;
      i++;
    }
  }
};

const starter = function () {
  const targetDateInput = dateFormMaker();
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => {
    counterMaker(targetDateInput);
  }, 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>Please enter D-Day</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};
