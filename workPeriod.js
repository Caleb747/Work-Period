let displayPeriod = document.querySelector("#resultPeriod");
let displayDate = document.querySelector("#resultDate");
let displayDay = document.querySelector("#day");
let displayResult = document.querySelector("#result");


function daysLeft(userDate) {
    const currentDate = new Date()
    userDate = userDate.split("-")
    userDate = new Date(userDate[0],userDate[1] -1,userDate[2])

    let dayL = userDate-currentDate
    const changeT = 1000*60*60*24

    dayL = dayL / changeT

    let date = userDate.toDateString().split(" ")
    displayDate.innerHTML = date[2]+" "+date[1]+" "+date[3];
    displayDay.innerHTML = date[0];
  

    return Math.floor(dayL + 1)
}


function checker(userPeriod, userPeriodTime, days_left) {
    const periods = { morning: 0, evening: 0, off: 0 };
    const listOrder = ["morning", "evening", "off"];
    const periodsTemp = [];
  
    periods[userPeriod] = userPeriodTime;


    if (days_left < 0){
      displayDate.innerHTML = "sorry, the day has passed"
      displayDay.innerHTML = ""
      displayPeriod.innerHTML = ""
      
    }
  
    while (days_left > 0) {
      while (periods[userPeriod] <= 3 && days_left > 0) {
        let periodsIndex = listOrder.indexOf(userPeriod) + 1;
        if (periodsIndex === 3) {
          periodsIndex = 0;
        }
  
        if (periods[userPeriod] === 3) {
          periodsTemp.push(userPeriod);
          periods[userPeriod] = 0;
          userPeriod = listOrder[periodsIndex];
        }
  
        periods[userPeriod] += 1;
        days_left -= 1;
      }
    }
  
    if (days_left === 0) {
      if (periods["morning"] === 0 && periods["evening"] === 0 && periods["off"] === 0) {
        return [periodsTemp[periodsTemp.length - 1], 3];
      }
  
      for (const i in periods) {
        if (periods[i] > 0) {

          displayPeriod.innerHTML = i +" "+ periods[i];          
        
        }
      }
    }
  }


function display() {

  let userDate = document.querySelector("#date").value; 
  let userPeriod = document.querySelector("#periods").value; 
  let userPeriodNum = Number(document.querySelector("#periodNum").value); 
  
  checker(userPeriod, userPeriodNum, daysLeft(userDate))
}




