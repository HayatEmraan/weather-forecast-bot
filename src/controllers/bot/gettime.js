async function getTimeData(city) {
  const response = await axios.get(
    `http://api.geonames.org/timezoneJSON?formatted=true&lat=${city.lat}&lng=${city.lon}&username=demo&style=full`
  );
  const data = response.data;
  const localTime = data.time;
  const messageText = `The current time in ${city} is ${localTime}.`;
  return messageText;
}

module.exports = getTimeData;