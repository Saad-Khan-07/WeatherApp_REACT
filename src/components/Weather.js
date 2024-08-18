import React from "react";
import "../App.css"; // Adjust the path according to your project structure

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const weatherIcons = {
  rain: "ri-rainy-line",
  sunny: "ri-sun-line",
  snowy: "ri-snowy-line",
  drizzle: "ri-drizzle-line",
  thunder: "ri-thunderstorms-line",
  cloudy: "ri-cloudy-line",
  partlycloudy: "ri-sun-cloudy-line",
  mist: "ri-mist-line",
  showers: "ri-showers-line",
  heavyshowers: "ri-heavy-showers-line",
  fog: "ri-foggy-line",
  clear: "ri-sun-line",
};

function conditionDecider(condstr) {
  if (typeof condstr !== "string") {
    console.error("Invalid condition string: must be a string");
    return "";
  }

  const condlist = [];
  const keys = Object.keys(weatherIcons);
  for (let key of keys) {
    if (condstr.toLowerCase().includes(key.toLowerCase())) {
      condlist.push(key);
    }
  }
  if (condstr === "Partly cloudy") {
    return weatherIcons.partlycloudy;
  }

  if (condstr.toLowerCase().includes("overcast")) {
    return weatherIcons.cloudy;
  }

  if (condstr.toLowerCase().includes("heavy rain")) {
    return weatherIcons.heavyshowers;
  }

  let mostlen = 0;
  let moststr = "";
  for (let i = 0; i < condlist.length; i++) {
    if (condlist[i].length > mostlen) {
      mostlen = condlist[i].length;
      moststr = condlist[i];
    }
  }
  return weatherIcons[moststr] || "";
}

// Function to get month and day of the week from a date string
function getMonthAndDayOfWeek(dateString) {
  // Parse the date string into parts
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a new Date object (Note: month is 0-based in JavaScript Date)
  const date = new Date(year, month - 1, day);

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the month (0 = January, 1 = February, etc.)
  const monthName = months[date.getMonth()];

  // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = weekdays[date.getDay()];

  // Return the month and day of the week
  return { month: monthName, dayOfWeek: dayOfWeek };
}

function getday(datestr) {
  var x = datestr.split("-");
  return parseInt(x[2]);
}

function gettime(thing) {
  let x = thing.split(" ");
  let y = x[1];
  let z = y.split(":");
  let ampm = parseInt(z[0]);
  return ampm;
}

function getdata(thing) {
  let x = thing.split(" ");
  return x;
}

const Weather = (props) => {
  const { SearchPressed, SearchValue, data } = props;
  const { current, location, forecast } = data || {
    current: {},
    location: {},
    forecast: {},
  }; // Default to empty objects to avoid errors

  return (
    <div className="whole">
      <div id="title">
        <div className="temptitle">  
          <h3 className="temp-info">
            {current && current.temp_c !== undefined
              ? `${current.temp_c}°C ` //(${current.temp_f}F)
              : ""}
          </h3>
          <h1>{SearchPressed && location ? capitalize(location.name) : ""}</h1>
          <h5 className="h3-region">
            {" "}
            {location && location.country
              ? `${location.country}, ${location.tz_id}`
              : ""}
          </h5>
        </div>
        <div className="sun">
          <h4>
            {<i class="ri-sun-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[0].astro.sunrise}`
              : ""}
          </h4>
          <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[0].astro.sunset}`
              : ""}
          </h4>
        </div>
        <div className="moreinfo">
          
          <h5>{<i class="ri-drop-fill"></i>}:&nbsp;&nbsp;&nbsp;{current ? `${current.precip_mm}` : "x"}&nbsp;mm</h5>

          <h5>{<i class="ri-windy-line"></i>}:&nbsp;&nbsp;&nbsp;{current && current.wind_kph ? `${current.wind_kph}` : "x"}&nbsp;kmph</h5>

          <h5>
            {<i class="ri-time-fill"></i>}:&nbsp;&nbsp;&nbsp;
            {location && location.localtime
              ? `${getdata(location.localtime)[1]} ${
                  gettime(location.localtime) > 11 ? "pm" : "am"
                }`
              : ""}
          </h5>
        </div>
      </div>
      <div className="weatherinfo">
        <div id="weatherinfo1">
          <i
            class={
              current && current.condition
                ? conditionDecider(current.condition.text)
                : "ri-cloud-line"
            }
          ></i>
          <h4>
            {current && current.condition ? `${current.condition.text}` : ""}
          </h4>
        </div>
        <div id="weatherinfo2">
          <h3>
            {location && location.localtime
              ? `${
                  getMonthAndDayOfWeek(getdata(location.localtime)[0]).dayOfWeek
                }`
              : ""}
          </h3>
          <h3>
            {location && location.localtime
              ? `${
                  getMonthAndDayOfWeek(getdata(location.localtime)[0]).month
                } ` + `${getday(getdata(location.localtime)[0])}`
              : ""}
          </h3>
        </div>
      </div>
      <div className="border1"></div>
      {/* <div className="additional-info">
      
        <div className="sun">
          <h3>
            {<i class="ri-sun-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[0].astro.sunrise}`
              : ""}
          </h3>
          <h3>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[0].astro.sunset}`
              : ""}
          </h3>
        </div>
        <div className="moreinfo">
          
          <h3>{<i class="ri-drop-fill"></i>}:&nbsp;&nbsp;&nbsp;{current ? `${current.precip_mm}` : "x"}&nbsp;mm</h3>

          <h3>{<i class="ri-windy-line"></i>}:&nbsp;&nbsp;&nbsp;{current && current.wind_kph ? `${current.wind_kph}` : "x"}&nbsp;kmph</h3>

          <h3>
            {<i class="ri-time-fill"></i>}:&nbsp;&nbsp;&nbsp;
            {location && location.localtime
              ? `${getdata(location.localtime)[1]} ${
                  gettime(location.localtime) > 11 ? "pm" : "am"
                }`
              : ""}
          </h3>
        </div>
      </div> */}
      <div className="fivedayforecast">
        <div className="card-s">
        <h3>
            {location && location.localtime
              ? `${
                  getMonthAndDayOfWeek(getdata(location.localtime)[0]).month
                } ` + `${getday(getdata(location.localtime)[0])+1}`
              : ""}
          </h3>
          <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[1].astro.sunset}`
              : ""}
          </h4>
          <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[1].astro.sunrise}`
              : ""}
          </h4>
        </div>
        <div className="card-s">
        <h3>
            {location && location.localtime
              ? `${
                  getMonthAndDayOfWeek(getdata(location.localtime)[0]).month
                } ` + `${getday(getdata(location.localtime)[0])+2}`
              : ""}
          </h3>
        <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[2].astro.sunset}`
              : ""}
          </h4>
          <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[2].astro.sunrise}`
              : ""}
          </h4>
        </div>
        {/* <div className="card-s">
        <h3>
            {location && location.localtime
              ? `${
                  getMonthAndDayOfWeek(getdata(location.localtime)[0]).month
                } ` + `${getday(getdata(location.localtime)[0])+3}`
              : ""}
          </h3>
        <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[3].astro.sunset}`
              : ""}
          </h4>
          <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[3].astro.sunrise}`
              : ""}
          </h4>
        </div>
        <div className="card-s">
        <h3>
            {location && location.localtime
              ? `${
                  getMonthAndDayOfWeek(getdata(location.localtime)[0]).month
                } ` + `${getday(getdata(location.localtime)[0])+4}`
              : ""}
          </h3>
        <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[4].astro.sunset}`
              : ""}
          </h4>
          <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[4].astro.sunrise}`
              : ""}
          </h4>
        </div>
        <div className="card-s">
        <h3>
            {location && location.localtime
              ? `${
                  getMonthAndDayOfWeek(getdata(location.localtime)[0]).month
                } ` + `${getday(getdata(location.localtime)[0])+5}`
              : ""}
          </h3>
        <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[5].astro.sunset}`
              : ""}
          </h4>
          <h4>
            {<i class="ri-sun-cloudy-fill"></i>}&nbsp;:&nbsp;&nbsp;
            {forecast && forecast.forecastday
              ? `${forecast.forecastday[5].astro.sunrise}`
              : ""}
          </h4>
        </div> */}
      </div>
    </div>
  );
};

export default Weather;

// write a function
// that takes condstr as a parameter

// we have an object called weathericons
// const weatherIcons ={
//   rain:"ri-rainy-line",
//   sunny:"ri-sun-line",
//   snowy:"ri-snowy-line",
//   drizzle:"ri-drizzle-line",
//   thunder:"ri-thunderstorms-line",
//   cloudy:"ri-cloudy-line",
//   partlycloudy:"ri-sun-cloudy-line",
//   mist:"ri-mist-line",
//   showers:"ri-showers-line",
//   heavyshowers: "ri-heavy-showers-line",
//   fog:"ri-foggy-line"
// }

// now we check the key in weather icons that compares to the condstr
// the most similar weathericon gets returned
