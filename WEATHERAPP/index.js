const button=document.getElementById("search-button");
const input=document.getElementById("city-input");
const cityName=document.getElementById("city-name");
const cityTime=document.getElementById("city-time");
const cityTemp=document.getElementById("city-temp");
const cityDay=document.getElementById("city-day");
const weatherIcon = document.getElementById("weathericon");
async function getData(cityName){
    const promise=await fetch(`https://api.weatherapi.com/v1/current.json?key=dd6f61e301d846cca1d91130241805&q=bulandshahr&aqi=yes`);

return await promise.json();
}

function updateWeatherIcon(conditionCode) {
    let iconClass = "";
    let iconColor = "";

    if (conditionCode >= 1000 && conditionCode < 1030) { // Sunny/clear
        iconClass = "fas fa-sun fa-2x";
        iconColor = "#eccc68";
    } else if (conditionCode >= 1030 && conditionCode < 1060) { // Cloudy
        iconClass = "fas fa-cloud fa-2x";
        iconColor = "#d3d3d3";
    } else if (conditionCode >= 1060 && conditionCode < 1080) { // Rainy
        iconClass = "fas fa-cloud-showers-heavy fa-2x";
        iconColor = "#0077be";
    } else if (conditionCode >= 1080 && conditionCode < 1100) { // Snowy
        iconClass = "fas fa-snowflake fa-2x";
        iconColor = "#00aaff";
    } else {
        iconClass = "fas fa-cloud fa-2x";
        iconColor = "#d3d3d3";
    }

    weatherIcon.innerHTML = `<i class="${iconClass}" style="color: ${iconColor}"></i>`;
}

function formatTime(timeString) {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
}

button.addEventListener("click", async()=> {
  const value= input.value;
 const result= await getData(value);
cityName.innerText=`${result.location.name},${result.location.region}, ${result.location.country}`
cityTime.innerText= formatTime(result.location.localtime);
cityTemp.innerText= `${result.current.temp_c} °C`;
console.log('API Response:', result);
console.log('Day/Night:', result.current.is_day);
cityDay.innerText=result.current.is_day ? "Day" : "Night";
updateWeatherIcon(result.current.condition.code);
//console.log(result);
});

