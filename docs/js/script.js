document.addEventListener('DOMContentLoaded', function () {
  const calculateBtn = document.getElementById('calculateBtn');
  calculateBtn.addEventListener('click', calculateDrivingTime);
});

function calculateDrivingTime() {
  const speedInput = document.getElementById('speedInput');
  const distanceInput = document.getElementById('distanceInput');
  const resultDiv = document.getElementById('result');
  const timeResult = document.getElementById('timeResult');

  const speedMPH = parseFloat(speedInput.value);
  let distanceMiles = parseFloat(distanceInput.value);

  if (isNaN(speedMPH) || isNaN(distanceMiles)) {
    alert('Please enter valid numeric values for speed and distance.');
    return;
  }

  // check if the distance is a whole number or a decimal number without a hundredths place
  if (!/\./.test(distanceInput.value)) {
    distanceInput.value = parseFloat(distanceInput.value).toFixed(2); // add two zeros to represent two decimal places
    distanceMiles = parseFloat(distanceInput.value);
  } else if (/^\d+\.\d$/.test(distanceInput.value)) {
    distanceInput.value += '0'; // add a zero at the end to represent one decimal place
    distanceMiles = parseFloat(distanceInput.value);
  }

  if (!/^\d+\.\d{2}$/.test(distanceInput.value)) {
    alert('Please enter the distance in the format x.xx (e.g., 3.65).');
    return;
  }

  // convert speed from mph to m/s
  const speedMPS = speedMPH * 0.44704;

  // convert distance from miles to meters
  const distanceMeters = distanceMiles * 1609.34;

  const timeInSeconds = calculateTime(speedMPS, distanceMeters);
  const formattedTime = formatTime(timeInSeconds);

  timeResult.innerHTML = `The estimated time it would take to travel ${distanceMiles.toFixed(
    2
  )}mi at ${speedMPH}MPH is:<br><br>${formattedTime}`;

  resultDiv.classList.remove('hidden');
}

function calculateTime(speedMPS, distanceMeters) {
  //////////////////////////////////////////////////////////////////////////
  // Updated values based on experiments:
  // At 62MPH, 1 mile took roughly 58 seconds
  // At 62MPH, 1.60 miles took roughly 1 minute and 30 seconds
  // At 62MPH, 2 miles took roughly 1 minute and 58 seconds
  //////////////////////////////////////////////////////////////////////////

  // time for 1 mile at 62mph in GTA 5
  const timeForOneMileAt62MPH = 58;

  // the time to drive the given distance at 62mph
  const timeAt62MPH = (distanceMeters / 1609.34) * timeForOneMileAt62MPH;

  // time for the given speed at the given distance
  const timeInSeconds = timeAt62MPH / (speedMPS / 26.8224); // 62mph to m/s

  return timeInSeconds;
}

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.round(timeInSeconds % 60);

  const timeParts = [];
  if (hours > 0) {
    timeParts.push(hours + ' hour' + (hours !== 1 ? 's' : ''));
  }
  if (minutes > 0) {
    timeParts.push(minutes + ' minute' + (minutes !== 1 ? 's' : ''));
  }
  if (seconds > 0) {
    timeParts.push(seconds + ' second' + (seconds !== 1 ? 's' : ''));
  }

  return timeParts.join(' and ');
}

// toggle popup
infoBtn.addEventListener('click', function () {
  infoPopup.classList.toggle('hidden');
});

// close popup when clicking outside of it
document.addEventListener('click', function (event) {
  if (!infoPopup.contains(event.target) && !infoBtn.contains(event.target)) {
    infoPopup.classList.add('hidden');
  }
});