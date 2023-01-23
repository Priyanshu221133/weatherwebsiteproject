"use strict"

const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const data_hide = document.querySelector('.middle_layer');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const getCurrentDay = () => {
    const weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";

    const currentDay = new Date();
    const day = weekDay[currentDay.getDay()];
    return day;
};
const getCurrentMonth = () =>{
    const months = new Array(12);
    months[0] = "JAN";
    months[1] = "FEB";
    months[2] = "MAR";
    months[3] = "APR";
    months[4] = "MAY";
    months[5] = "JUN";
    months[6] = "JUL";
    months[7] = "AUG";
    months[8] = "SEP";
    months[9] = "OCT";
    months[10] = "NOV";
    months[11] = "DEC";
    
    const currentMonth = new Date();
    const month = months[currentMonth.getMonth()];
    return month;
}

const getCurrentDate = () => {
    const currentMonth = new Date();
    const date = currentMonth.getDate();
    return date;
}
//  set tieme dat month
day.innerText = getCurrentDay();
today_date.innerText = `${getCurrentDate()} ${getCurrentMonth()}`;

const getInfo = async (event)=>{
    // Ish sa page reloade nhi hota
    event.preventDefault();
     
    //  we use promise :- async await
                   // input text ma sa huma mil jyaga
    let cityValue = cityName.value; 
    if (cityValue === "") {
        city_name.innerText = "Opps! This city name is not found"; 
        data_hide.classList.add('data_hide');
    }else{//jab proper name ho tab url ka sath khala

    //  URL Ka error aa raha ho to hum catch kr sakha
       try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=07d73a0fb112434277c82ff558d47271`; 
                   // ko be data muja milaga as a response to ma response variable ma store kr lunga
                   // time laga jab tak data mil nhi jata to hum wait karanga     
        const response = await fetch(URL); 
        // console.log(response);
        //  data come in object
        const objData = await response.json();
        //  object to :-> array of an object
        const arrayData = [objData];
        
        city_name.innerText = `${arrayData[0].name} , ${arrayData[0].sys.country}`;
        temp.innerText = arrayData[0].main.temp;
        const tempMood = arrayData[0].weather[0].main;
        

        if (tempMood == "Clear") {
            temp_status.innerHTML = `<i class="fas fa-sun" style="color: #eccc68;"></i>`;
        }else if (tempMood == "Clouds") {
            temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #f1f2f6;"></i>`;
        }else if (tempMood == "Rain") {
            temp_status.innerHTML = `<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>`;
        }else{
            temp_status.innerHTML = `<i class="fas fa-cloud" style="color: #eccc68;"></i>`;
        }

        data_hide.classList.remove('data_hide');
       } catch (error) {
        city_name.innerText = "Opps! This city name is not found";
        data_hide.classList.add('data_hide');
       }
    }

}

submitBtn.addEventListener("click",getInfo)
