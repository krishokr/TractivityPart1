let pastActivityBtn = document.getElementById("pastActivityBtn");
let hiddenPastActivities = document.getElementById('hiddenPastActivities');
let parentContainer = hiddenPastActivities.parentElement;


const clearInput = function() {
  while (parentContainer.firstChild) {
        
      parentContainer.removeChild(parentContainer.firstChild);
  }

  parentContainer.appendChild(hiddenPastActivities);    parentContainer.appendChild(pastActivityBtn);
  document.getElementById("date").value = null;
  document.getElementById("Time/Distance").value = null;
  document.getElementById("Units").value = null;
  document.getElementById("activity").value = "Select an option";    
}
const pastActivityBtnOnclick = pastActivityBtn.onclick = function() {    
  clearInput();
    
  pastActivityBtn.style.display = "none";
  hiddenPastActivities.style.display = "flex";  
}


// UNIT CHANGES
let activity = document.getElementById("activity");

activity.addEventListener('change',(event)=> {
    
  let units = document.getElementById("Units");
    
  if ((event.target.value === "Climb") || (event.target.value === "Ski") || (event.target.value === "Yoga")) {
      units.value = "minutes";
  } else if ((event.target.value === "Run") || (event.target.value === "Bike") || (event.target.value === "Hike") || (event.target.value === "Walk")) {
      units.value = "miles";
  }    
});



let submitBtn = document.getElementById("submit");



let timeDistance = document.getElementById("Time/Distance");

let date = document.getElementById("date");

submitBtn.onclick = function() {
    let activity = document.getElementById("activity").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("Time/Distance").value;
    let units = document.getElementById("Units").value;
    
    if ((activity === "Select an option" ) || (time === "") || (date === "") || (units === "")) {
        return window.alert("One of your fields are empty.")
    }
    submitPast();

    let phrase = `${activity} for ${time} ${units}`;
    
    let strElement = document.createElement("h1");
    let str = document.createTextNode(`Got it! ${phrase}. Keep it up!`);
    strElement.appendChild(str);

    pastActivityBtn.style.display = "flex";
    
    hiddenPastActivities.replaceWith(strElement);
    
    strElement.parentElement.style.flexDirection = "column";
    strElement.style.marginBottom = "10px";
    strElement.style.fontWeight = "bold";

    let x = window.matchMedia("(max-width: 480px)")

    if (x.matches) {
        strElement.style.fontSize = "40px";
        strElement.style.padding = "100px";
        strElement.style.paddingBottom = "50px";
        
    } else {
        strElement.style.fontSize = "20px";
    }
    
}
let futurePlansBtn = document.getElementById("futurePlansBtn");
let hiddenFuturePlans = document.getElementById("hiddenFuturePlans");
let parentContainer2 = hiddenFuturePlans.parentElement;

const clearInputFuture = function() {
   
    while (parentContainer2.firstChild) {
        parentContainer2.removeChild(parentContainer2.firstChild);
    }

    parentContainer2.appendChild(hiddenFuturePlans);
    parentContainer2.appendChild(futurePlansBtn);
    document.getElementById("dateFuture").value = null;
    document.getElementById("activityFuture").value = "Select an option";
    
}


const futurePlansBtnOnclick = futurePlansBtn.onclick = function() {
        
    clearInputFuture();
    
    futurePlansBtn.style.display = "none";
    hiddenFuturePlans.style.display = "flex";
}

let submitFutureBtn = document.getElementById("submitFuture");
submitFutureBtn.onclick = function() {
    let activity = document.getElementById("activityFuture").value;
    let date = document.getElementById("dateFuture").value;

    if ((activity === "Select an option" ) || (date === "")) {
        return window.alert("One of your fields are empty.")
    }
    submitFuture();
    
    let phrase = `${activity} on ${date}`;
    
    let strElement = document.createElement("h1");
    let str = document.createTextNode(`Sounds good! Don't forget to come back to update your session for ${phrase}!`);
    strElement.appendChild(str);

    futurePlansBtn.style.display = "flex";
    
    hiddenFuturePlans.replaceWith(strElement);
  
    strElement.parentElement.style.flexDirection = "column";
    strElement.style.marginBottom = "10px";
    let x = window.matchMedia("(max-width: 480px)")
    if (x.matches) {
        strElement.style.fontSize = "40px";
        strElement.style.padding = "100px";
        strElement.style.paddingBottom = "50px";
    } else {
        strElement.style.fontSize = "20px";
    } 
}

function submitPast() {
  let activity = document.getElementById("activity").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("Time/Distance").value;
  let units = document.getElementById("Units").value;

  console.log(`Inputted: ${activity}, ${date}, ${time}, ${units}`);
  const data = { activity, date, time, units };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('/submissions', options);
}

function submitFuture() {
  let activity = document.getElementById("activityFuture").value;
  let date = document.getElementById("dateFuture").value;

  console.log(`Inputted: ${activity}, ${date}`);
  const data = { activity, date };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('/submissions', options);
}