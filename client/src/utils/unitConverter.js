// Unit conversion helper utilities

export const formatTemperature = (celsiusTemp, unit = 'C') => {
  if (celsiusTemp === undefined || celsiusTemp === null) return '--';
  if (unit === 'F') {
    const fahrenheit = Math.round((celsiusTemp * 9 / 5) + 32);
    return `${fahrenheit}°F`;
  }
  return `${Math.round(celsiusTemp)}°C`;
};

export const formatWindSpeed = (kmhSpeed, unit = 'km/h') => {
  if (kmhSpeed === undefined || kmhSpeed === null) return '--';
  if (unit === 'mph') {
    const mph = Math.round(kmhSpeed * 0.621371);
    return `${mph} mph`;
  }
  return `${Math.round(kmhSpeed)} km/h`;
};

export const formatPrecipitation = (mmPrecip, unit = 'mm') => {
  if (mmPrecip === undefined || mmPrecip === null) return '0 mm';
  if (unit === 'in') {
    const inches = (mmPrecip * 0.0393701).toFixed(2);
    return `${inches} in`;
  }
  return `${mmPrecip} mm`;
};

export const getWindDirectionText = (degree) => {
  if (!degree) return 'N';
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
};
