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
let isMarketOpen = false;

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

    let now = new Date();
    let dayOfWeek = weekdays[now.getDay()];
    let day = now.getDate();
    let month = months[now.getMonth()];
    let time = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds() ;

    document.getElementById("current-date-time").innerHTML =
    `${dayOfWeek}, ${month} ${day}\t\n
     ${time}`
}

setInterval(getDateTime, 1000);
setInterval(openAndClosedMarket, 1000);

function openAndClosedMarket(){

    if (!isMarketOpen){

        document.getElementsByTagName('link')[0].setAttribute('href',"./styling-dark.css")

        document.getElementById("market-status").innerHTML = "closed";
    }
}