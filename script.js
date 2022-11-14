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

updateTable();

function updateTable(){

    let tableData = "";
    
    for (let i = 0; i < companies.length; i++){

        totalPrice = (companies[i].price * companies[i].amount).toFixed(2);

        tableData += `<tr id ="${i}">
        <td>${companies[i].name}</td>
        <td>$${companies[i].price}</td>
        <td>${companies[i].amount}</td>
        <td>$${totalPrice}</td>
        <td><button onclick = "buyMore(${i})">buy more</button></td>`;

        document.getElementById("table-data").innerHTML = tableData;
    }
}

function buyMore(index){

    amountToBuy = prompt(`how many stocks of ${companies[index].name} do you want to buy?`);

    amountToBuy = Number(amountToBuy);

    if (isNaN(amountToBuy) || amountToBuy <= 0  || amountToBuy > 100){
        alert("invalid input")
        throw "INVALID_INPUT"
    } else {

    companies[index].amount  += amountToBuy;
    
    updateTable();
    }
}