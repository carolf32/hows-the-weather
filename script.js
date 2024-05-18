document.querySelector(".search").addEventListener("submit", async (e) => {
  e.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    clearInfo();
    warning("Loading...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=9afdc02baf37d560643b323a7d1d028b&units=metric`;

    let results = await fetch(url);
    let json = await results.json();

    console.log(json);

    if (json.cod == "200") {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      warning("City not found");
    }
  }
});

const warning = (message) => {
  document.querySelector(".warning").innerHTML = message;
};

const showInfo = (json) => {
  warning("");

  document.querySelector(".result").style.display = "block";
  document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>C°</sup>`;
  document.querySelector(
    ".windInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;

  document
    .querySelector("#tempId")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

  document.querySelector(".windPoint").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;
};

const clearInfo = () => {
  warning("");
  document.querySelector(".result").style.display = "none";
};
