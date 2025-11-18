// Assignment 1: Conversion

function convertCtoF() {
    let c = parseFloat(document.getElementById("celsius").value);
    if (isNaN(c)) { alert("Enter a valid number"); return; }
    document.getElementById("resultCtoF").innerText = (c * 9/5 + 32).toFixed(2) + " °F";
}

function convertFtoC() {
    let f = parseFloat(document.getElementById("fahrenheit").value);
    if (isNaN(f)) { alert("Enter a valid number"); return; }
    document.getElementById("resultFtoC").innerText = ((f - 32) * 5/9).toFixed(2) + " °C";
}

function convertMtoFt() {
    let m = parseFloat(document.getElementById("meters").value);
    if (isNaN(m)) { alert("Enter a valid number"); return; }
    document.getElementById("resultMtoFt").innerText = (m * 3.28084).toFixed(2) + " ft";
}

function convertFttoM() {
    let ft = parseFloat(document.getElementById("feet").value);
    if (isNaN(ft)) { alert("Enter a valid number"); return; }
    document.getElementById("resultFttoM").innerText = (ft / 3.28084).toFixed(2) + " m";
}


// Assignment 2: Income Tax Calculator

function calculateIncomeTax() {
    let income = parseFloat(document.getElementById("taxableIncome").value);
    if (isNaN(income)) { alert("Enter a valid income"); return; }

    let tax = 0;

    if (income <= 250000) tax = 0;
    else if (income <= 400000) tax = 0.20 * (income - 250000);
    else if (income <= 800000) tax = 30000 + 0.25 * (income - 400000);
    else if (income <= 2000000) tax = 130000 + 0.30 * (income - 800000);
    else if (income <= 8000000) tax = 490000 + 0.32 * (income - 2000000);
    else tax = 2410000 + 0.35 * (income - 8000000);

    document.getElementById("taxResult").innerText = "Income Tax: ₱" + tax.toFixed(2);
}


// Assignment 3: Looping

function computeLoops() {
    let n = parseInt(document.getElementById("loopN").value);
    if (isNaN(n) || n <= 0) { alert("Enter a positive integer"); return; }


    let factorial = 1;
    let i = 1;
    while (i <= n) {
        factorial *= i;
        i++;
        if (!isFinite(factorial)) { factorial = "Infinity"; break; }
    }
    document.getElementById("factorialResult").innerText = "Factorial: " + factorial;


    let sum = 0, j = 1;
    do {
        sum += j;
        j++;
    } while (j <= n);
    document.getElementById("sumResult").innerText = "Sum: " + sum;


    let total = 0;
    for (let k = 1; k <= n; k++) {
        total += k;
    }
    let avg = total / n;
    document.getElementById("avgResult").innerText = "Average: " + avg.toFixed(2);
}


// Assignment 4: Payroll

let payroll = [];

function showPayroll() {
    let tbody = "", tgross=0, tded=0, tnet=0;
    for (let idx = 0; idx < payroll.length; idx++) {
        let emp = payroll[idx];
        tbody += "<tr>"
            + `<td class="ndata">${idx+1}</td>`
            + `<td>${emp.name}</td>`
            + `<td class="ndata">${emp.daysWorked.toFixed(2)}</td>`
            + `<td class="ndata">${emp.dailyRate.toFixed(2)}</td>`
            + `<td class="ndata">${emp.grossPay.toFixed(2)}</td>`
            + `<td class="ndata">${emp.deduction.toFixed(2)}</td>`
            + `<td class="ndata">${emp.netPay.toFixed(2)}</td>`
            + "</tr>";
        tgross += emp.grossPay;
        tded += emp.deduction;
        tnet += emp.netPay;
    }
    document.getElementById("tablebody").innerHTML = tbody;
    document.getElementById("tGrossPay").innerText = tgross.toFixed(2);
    document.getElementById("tDeduction").innerText = tded.toFixed(2);
    document.getElementById("tNetPay").innerText = tnet.toFixed(2);
}

document.getElementById("btnAdd").addEventListener("click", () => {
    let name = document.getElementById("empName").value.trim();
    let days = parseFloat(document.getElementById("daysWorked").value);
    let rate = parseFloat(document.getElementById("dailyRate").value);
    let ded = parseFloat(document.getElementById("deduction").value);

    if(name === "" || isNaN(days) || isNaN(rate) || isNaN(ded)) {
        alert("Please fill all fields correctly.");
        return;
    }

    payroll.push({
        name: name,
        daysWorked: days,
        dailyRate: rate,
        grossPay: days * rate,
        deduction: ded,
        netPay: (days * rate - ded)
    });

    showPayroll();


    document.getElementById("empName").value = "";
    document.getElementById("daysWorked").value = "";
    document.getElementById("dailyRate").value = "";
    document.getElementById("deduction").value = "";
});


const dlg = document.getElementById("dlgConfirm");
document.getElementById("btnDelete").addEventListener("click", () => {
    let x = parseInt(document.getElementById("delEmpNo").value) - 1;
    if(x >= 0 && x < payroll.length){
        document.getElementById("dlgMsg").innerText = `Delete Employee ${x+1} - ${payroll[x].name}?`;
        dlg.showModal();
    }
});

dlg.addEventListener("close", (e)=>{
    if(e.target.returnValue === "confirm"){
        let x = parseInt(document.getElementById("delEmpNo").value) - 1;
        payroll.splice(x, 1);
        showPayroll();
        document.getElementById("delEmpNo").value = "";
    }
});


