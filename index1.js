// fetching elements
const usertab=document.querySelector("[data-userwet]");
const searchtab=document.querySelector("[data-searchwet]");
const usercontainer=document.querySelector(".weather-container");

const grantaccesscont=document.querySelector(".grant-loc-cont");
const searchform=document.querySelector("[data-formcont]");
const loadingscreen=document.querySelector(".loading-screen-con");
const userinfocon=document.querySelector(".user-info-container");

const grantAccessButton=document.querySelector("[data-grant-access]");
const searchInput=document.querySelector("[data-search-input]");

// initial variables
let currenttab=usertab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currenttab.classList.add("current-tab");
getfromSessionStorage();


usertab.addEventListener("click",()=>{
    // pass clicked tab as input parameter
    switchTab(usertab);
});

searchtab.addEventListener("click",()=>{
     // pass clicked tab as input parameter 
    switchTab(searchtab);
});

// switchtab function definition
function switchTab(clickedtab){
    if(clickedtab != currenttab){
        currenttab.classList.remove("current-tab");
        currenttab=clickedtab;
        currenttab.classList.add("current-tab");

        // if search contains active class
        if(! searchform.classList.contains("active")){
            userinfocon.classList.remove("active");
            grantaccesscont.classList.remove("active");
            searchform.classList.add("active");
        }

        // to make your weather visible /active to your weather
        else{
            searchform.classList.remove("active");
            grantaccesscont.classList.remove("active");
            userinfocon.classList.add("active");

            // to display weather display container
            //let's check local storage first  for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
};

// to check if coordinates are already present in session storange
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-cordinates");

    // if ter are no local coordinates
    if(! localCoordinates){
        grantaccesscont.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;

    // make grant container invisible
    grantaccesscont.classList.remove("active");

    // make loader visible
    loadingscreen.classList.add("active");

    // API call
    try{
        const response=await
         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

         const data=await response.json();

        //  remove loader after API is called
        loadingscreen.classList.remove("active");

        userinfocon.classList.add("active");

        // to add data into the UI
        renderWeatherInfo(data);
    }
    catch(err){
        loadingscreen.classList.remove("active");
        console.log("Invalid API or some connection issue.",err);
    }
}

// function to render the output on the UI
function renderWeatherInfo(weatherINfo){

    // first we fetch the elements
    const cityName=document.querySelector("[data-city-name]");
    const countryIcon=document.querySelector("[data-country-icon]");
    const desc=document.querySelector("[data-weatherdesc]");
    const weatherIcon=document.querySelector("[data-weather-icon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-wind-speed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-clouds]");

    // fetch values from weaTher info object and put it to UI
    cityName.innerText=weatherINfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherINfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherINfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherINfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherINfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherINfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherINfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherINfo?.clouds?.all} %`;
}

// event listener on grant-access-button
grantAccessButton.addEventListener("click",getLocation);

// function to get geolocation
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{

    }
}

function showPosition(position){
    const userCoordinates={
         lat:position.coords.latitude,
         lon:position.coords.longitude,

    }
    sessionStorage.setItem("user-cordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

// event listener on search button on search weather
searchform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;

    if(cityName==="") return;
    else{
        fetchSearchWeatherInfo(cityName);
    } 
});

async function fetchSearchWeatherInfo(city){
    loadingscreen.classList.add("active");
    userinfocon.classList.remove("active");
    grantaccesscont.classList.remove("active");

    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        
        const data=await response.json();

        loadingscreen.classList.remove("active");
        userinfocon.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){

    }
}

