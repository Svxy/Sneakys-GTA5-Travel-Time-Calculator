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

  // check for whole number, if yes, add .00 at the end for consistent conversion
  if (!/\./.test(distanceInput.value)) {
    distanceInput.value += '.00';
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
// https://www.reddit.com/r/gtaonline/comments/a3ofy9/gta_v_in_game_miles/
//////////////////////////////////////////////////////////////////////////

  // time for 1 mile at 100mph in GTA 5 (see link)
  const timeForOneMileAt100MPH = 36;

  // the time to drive the given distance at 100mph
  const timeAt100MPH = (distanceMeters / 1609.34) * timeForOneMileAt100MPH;

  // time for the given speed at the given distance
  const timeInSeconds = timeAt100MPH / (speedMPS / 26.8224); // 100mph to m/s

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