const companies =[
    {
        name: "JP Morgan Chase",
        price: 117.20,
        amount: 4,
        Ticker:"JPM"
    },
    {
        name:"Deutsche Bank",
        price: 8.66,
        amount: 3,
        Ticker:"DB"
    },
    {
        name: "Fidelity",
        price: 36.78,
        amount: 10,
        Ticker: "FNF"
    },
    {
        name: "Citi Bank",
        price: 43.38,
        amount: 7,
        Ticker:"C"
    },
    {
        name: "MasterCard",
        price: 297.77,
        amount: 1,
        Ticker:"MA"
    }/*,
    {
        name: "Goldman Sachs",
        price: 311.65,
        amount: 2,
        Ticker:"GS"
    },
    {
        name: "Bank of America",
        price: 43.30,
        amount: 8,
        Ticker:"BAC"
    },
    {
        name: "American Express",
        price: 134.70,
        amount: 6,
        Ticker:"AXP"
    }*/
]

let isMarketOpen = true;

createTable();

async function createTable(){
    
    for (let i = 0; i < companies.length; i++){

        let request = `https://api.polygon.io/v2/aggs/ticker/${companies[i].Ticker}/prev?adjusted=true&apiKey=tfJTpdrgYQhK18JL_yNprEOr5yrW4MUz`;
        fetch(request)
        .then((response) => response.json())
        .then((data) => {
            let price = data.results[0].c;
            companies[i].price = price;
    
            document.getElementById("table-data").innerHTML += createHtml(i,price);

            console.log(`the price of ${companies[i].name} is ${price}`);
            })
        .catch((error) => {
          console.error('Error:', error);
        });
}
}
        
function createHtml(i, price){
            
        let totalPrice = (price * companies[i].amount).toFixed(2);

        let htmlTable = `<tr id ="${i}">
        <td>${companies[i].name}</td>
        <td>$${price}</td>
        <td>${companies[i].amount}</td>
        <td>$${totalPrice}</td>
        <td><button class = "add" onclick = "buyMore(${i})">buy more</button></td>
        <td><button class ="remove" onclick = "removeRecord(${i})">remove</button></td>
        </tr>`;

        return htmlTable;
        }
        
    

function updateRecord(index){
    
    totalPrice = (companies[index].price * companies[index].amount).toFixed(2);

    document.getElementById(index).innerHTML = 
    `   <td>${companies[index].name}</td>
        <td>$${companies[index].price}</td>
        <td>${companies[index].amount}</td>
        <td>$${totalPrice}</td>
        <td><button class = "add" onclick = "buyMore(${index})">buy more</button></td>
        <td><button class = "remove" onclick = "removeRecord(${index})">remove</button></td>`;
}

function buyMore(index){

    if (!isMarketOpen) return;

    amountToBuy = prompt(`how many stocks of ${companies[index].name} do you want to buy?`);

    amountToBuy = Number(amountToBuy);

    if (isNaN(amountToBuy) || amountToBuy <= 0  || amountToBuy > 100){
        alert("invalid input")
        throw "INVALID_INPUT"
    } else {

    companies[index].amount  += amountToBuy;
    
    updateRecord(index);
    }
}

function removeRecord(index){

    if (!isMarketOpen) return;

    let elementToRemove = document.getElementById(index);
    console.log(elementToRemove);
    elementToRemove.remove();
}


function getDateTime(){

    const weekdays =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // get the date and time

    let now = new Date();
    let year = now.getFullYear();
    let dayOfWeek = weekdays[now.getDay()];
    let day = now.getDate();
    let month = months[now.getMonth()];
    let hrs24 = now.getHours();
    let amPm =  "AM";
    let mins = now.getMinutes();
    let secs = now.getSeconds();
    let hrs;

    if (hrs24 == 0) {
        hrs = 12;
    } else if (hrs24 > 12) {
        hrs = hrs24 - 12;
    } else {
        hrs = hrs24
    }

    if (hrs24 >= 12){
        amPm = "PM";
    }

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
      
    let time = `${hrs}:${mins}:${secs} ${amPm}`;
      
    document.getElementById("current-date").innerHTML =
    `${dayOfWeek}, ${month} ${day}`;

     document.getElementById("current-time").innerHTML =
     `${time}`;

    // check if the market is open or closed

     if ((hrs24 > 9 || (hrs24 == 9 && mins >= 30)) && hrs24 < 16 && dayOfWeek != "Sunday" && dayOfWeek != "Saturday"){
       
        isMarketOpen = true;

        document.getElementsByTagName('link')[0].setAttribute('href',"./styling.css");

        document.getElementById("market-status").innerHTML = "open";


     } else {

        isMarketOpen = false;

        document.getElementsByTagName('link')[0].setAttribute('href',"./styling-dark.css");

        document.getElementById("market-status").innerHTML = "closed";

     }
  

     //make a count down

     let message = 'the market will open in';
     let countDown;

     if (dayOfWeek == "Saturday"){

        let opening = new Date(year,now.getMonth(),day + 2 ,9,30);


        countDown = new Date(opening - now) ;


     } else if (dayOfWeek == "Sunday"){

        let opening = new Date(year,now.getMonth(),day + 1 ,9,30);

        countDown = new Date(opening - now) ;


     } else if (!(hrs24 > 9 || (hrs24 == 9 && mins >= 30))){

        let opening = new Date(year,now.getMonth(),day,9,30);

        countDown = new Date(opening - now) ;


     } else if (hrs24 >= 16){

        let closed = new Date(year,now.getMonth(),day,16,0);

        message = "the market is closed already for";

        countDown = new Date(now - closed) ;


     } else {

        let opened = new Date(year,now.getMonth(),day,9,30);

        message = "the market already open for";

        countDown = new Date(now - opened) ;

     }
    
     //get the time in UTC
     countDown = new Date(countDown.toUTCString().slice(0, -4));

     let daysLeft = countDown.getDate() -1;
     let hrsLeft = countDown.getHours();
     let minsLeft = countDown.getMinutes();
     let secsLeft = countDown.getSeconds();

     let timeLeft = `${daysLeft} days ${hrsLeft} hours ${minsLeft} minutes ${secsLeft} seconds`

     document.getElementById("message").innerHTML = message;
     document.getElementById("count-down").innerHTML = timeLeft;

}

setInterval(getDateTime, 1000);


