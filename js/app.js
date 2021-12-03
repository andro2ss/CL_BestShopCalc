// ***************     Variables    **************
let priceProduct = 0;
let priceOrders = 0;
let pricePackage = 0;
let priceAccounting = 0;
let priceTerminal = 0;
let totalPrice = 0;

const numberTypeElements = document.querySelectorAll("input[type='number']");
const formProducts = document.getElementById("products");
const formOrders = document.getElementById("orders");
const formPackage = document.getElementById("package");
const formAccounting = document.getElementById("accounting");
const formTerminal = document.getElementById("terminal");
const boxProducts = document.querySelector("[data-id='products']");
const boxOrders = document.querySelector("[data-id='orders']");
const boxPackage = document.querySelector("[data-id='package']");
const boxAccounting = document.querySelector("[data-id='accounting']");
const boxTerminal = document.querySelector("[data-id='terminal']");
const boxSummaryTotal = document.getElementById("total-price");

//numbers must be x > 0 && integer
function NumbersValidation() {
    if (this.value < 0) {
        this.value = 0;
    }
    this.value = Math.floor(this.value);
}

function SummaryTotal() {
    totalPrice = priceOrders + priceProduct + priceTerminal + pricePackage + priceAccounting;
    if (totalPrice <= 0) {
        boxSummaryTotal.classList.remove("open");
    } else {
        boxSummaryTotal.classList.add("open");
    }
    boxSummaryTotal.lastElementChild.innerText = " $" + totalPrice;
}

for (let numberTypeElement of numberTypeElements) {
    numberTypeElement.addEventListener("change", NumbersValidation);
}

formProducts.addEventListener("change", function () {
    let price = 0.5;
    priceProduct = this.value * price;
    if (this.value > 0) {
        boxProducts.classList.add("open");
        boxProducts.children[1].innerText = this.value + " * " + "$" + price;
        boxProducts.lastElementChild.innerText = "$" + priceProduct;
    } else {
        boxProducts.classList.remove("open");
    }
    SummaryTotal()
})

formOrders.addEventListener("change", function () {
    let price = 3;
    priceOrders = this.value * price;
    if (this.value > 0) {
        boxOrders.classList.add("open");
        boxOrders.children[1].innerText = this.value + " * " + "$" + price;
        boxOrders.lastElementChild.innerText = "$" + priceOrders;
    } else {
        boxOrders.classList.remove("open");
    }
    SummaryTotal()
})

formPackage.firstElementChild.addEventListener("click", function () {
    formPackage.classList.toggle("open");
    for (let child of formPackage.lastElementChild.children) {
        child.addEventListener("click", function () {
            formPackage.classList.remove("open");
            let text = ""
            if (child.innerText === "Basic") {
                text = "Basic";
                pricePackage = 10;
            } else if (child.innerText === "Professional") {
                text = "Professional";
                pricePackage = 30;
            } else {
                text = "Premium";
                pricePackage = 50;
            }
            boxPackage.classList.add("open");
            boxPackage.children[1].innerText = text;
            boxPackage.lastElementChild.innerText = "$" + pricePackage;
            formPackage.firstElementChild.innerText = text;
            SummaryTotal()
        })
    }
})

formAccounting.addEventListener("change", function (){
    boxAccounting.classList.toggle("open")
    if (formAccounting.checked){
        priceAccounting = 100;
    } else {
        priceAccounting = 0;
    }
    boxAccounting.lastElementChild.innerText = priceAccounting;
    SummaryTotal()
})

formTerminal.addEventListener("change", function (){
    boxTerminal.classList.toggle("open")
    if (formTerminal.checked){
        priceTerminal = 30;
    } else {
        priceTerminal = 0;
    }
    boxTerminal.lastElementChild.innerText = priceTerminal;
    SummaryTotal()
})