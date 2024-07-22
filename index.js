const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";


// To show the data in the API
function renderWeatherInfo(data){
    let newPara=document.createElement('p');
    newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`;

    document.body.appendChild(newPara);
}


async function fetchWeatherDetails(){

    try{
        let city="goa";

        // To fetch the data of the API
        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let jsont=await fet.json();

        console.log("The api is",data);

        // Function call (to show the data in ui)
        renderWeatherInfo(data);
    }
        catch(err){
        console.log("Error occured due to sm");
    }
}

// To get the customised data :
async function getCustomWeatherDetails(){
   
    try{
        let latitude = 17.6333;
        let longitude = 18.3333;
    
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?
                                lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    
        let data = await result.json();
    
        console.log(data);
    }
    catch(err){
        console.log("error found",err);
    }
}