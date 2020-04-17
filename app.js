//On défini nos données
window.addEventListener('load', ()=> {
    let long;
    let lat;
    let weatherDescriptions = document.querySelector(".weather-descriptions");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    const temperatureSpan = document.querySelector('.degree-section span');
    
    // On récupère la position
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition (position =>{
            long = position.coords.longitude
            lat = position.coords.latitude
            
            // Appelle de l'API          
            const api = `http://api.weatherstack.com/current?access_key=a3c1c9f872bb5c87fec11bfe2acade91&query=${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            //On choisi ce qu'on appelle 
            .then(data => {
                console.log(data);
                const { temperature, weather_descriptions, } = data.current;
                //On défini les éléments du DOM à partir de l'API*
                temperatureDegree.textContent = temperature;
                weatherDescriptions.textContent = weather_descriptions;

                const { timezone_id} = data.location;
                locationTimezone.textContent = timezone_id

                //Formulaire pour Farenheit
                let celsius = (temperature * (9 / 5)) + 32

                //changement Celsius/farenheit
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "°C"){
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });

    }else {
        h1.textContent = "Hey dis is not working beacause the geolocation isnt activated"
    };
});