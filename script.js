const companies =[
    {
        name: "JP Morgan Chase",
        price: 117.20,
        amount: 4
    },
    {
        name:"Deutsche Bank",
        price: 8.66,
        amount: 3
    },
    {
        name: "Fidelity",
        price: 36.78,
        amount: 10
    },
    {
        name: "Citi Bank",
        price: 43.38,
        amount: 7
    },
    {
        name: "MasterCard",
        price: 297.77,
        amount: 1
    },
    {
        name: "Goldman Sachs",
        price: 311.65,
        amount: 2
    },
    {
        name: "Bank of America",
        price: 43.30,
        amount: 8
    },
    {
        name: "American Express",
        price: 134.70,
        amount: 6
    }
]
let isMarketOpen = true;

createTable();

function createTable(){

    let tableData = "";
    
    for (let i = 0; i < companies.length; i++){

        totalPrice = (companies[i].price * companies[i].amount).toFixed(2);

        tableData += `<tr id ="${i}">
        <td>${companies[i].name}</td>
        <td>$${companies[i].price}</td>
        <td>${companies[i].amount}</td>
        <td>$${totalPrice}</td>
        <td><button class = "add" onclick = "buyMore(${i})">buy more</button></td>
        <td><button class ="remove" onclick = "removeRecord(${i})">remove</button></td>
        </tr>`;

        document.getElementById("table-data").innerHTML = tableData;
    }
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
    let hrs = now.getHours();
    let amPm =  "AM";
    let mins = now.getMinutes();
    let secs = now.getSeconds();

    if (hrs == 0) {
        hrs = 12;
    } else if (hrs >= 12) {
        hrs = hrs - 12;
        period = "PM";
    }

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
      
    let time = `${hrs}:${mins}:${secs}:${amPm}`;
      
    document.getElementById("current-date-time").innerHTML =
    `${dayOfWeek}, ${month} ${day}\t\n
     ${time}`

    // check if the market is open or closed

     if ((hrs < 9 && mins <30) || hrs >= 4 || dayOfWeek == "Sunday" || dayOfWeek == "Saturday"){

        isMarketOpen = false;

        document.getElementsByTagName('link')[0].setAttribute('href',"./styling-dark.css");

        document.getElementById("market-status").innerHTML = "closed";

     } else {

        isMarketOpen = true;

        document.getElementsByTagName('link')[0].setAttribute('href',"./styling.css");

        document.getElementById("market-status").innerHTML = "open";

     }

     //make a count down
     if (hrs < 9 && mins <30){

        let opening = new Date(year,now.getMonth(),day,9,30);

        let countDown = opening - now;

     } else if (hrs >= 4){

        let closed = new Date(year,now.getMonth(),day,16,0);

        let countDown = new Date(now - closed) ;

        console.log(`countdown is ${countDown}`);

     } else {

        let opened = new Date(year,now.getMonth(),day,9,30);

        let countDown = now - opened ;
     }

}

setInterval(getDateTime, 1000);


