const taxes = [
    [ .07, 300 ],
    [ .11, 300 ],
    [ .15, 500 ],
    [ .19, 500 ],
    [ .21, 1600 ],
    [ .24, 3200 ]
];

const calcGross = (net) => {
    let nonTaxed = net;
    let culmulativeTax = 0;
    let topNet = 0;

    for (let i = 0; nonTaxed > 0; i++) {
        let currentTaxable = Math.min(taxes[i][1], nonTaxed);
        if(currentTaxable < taxes[i][1]) {
            topNet = i;
            break;
        }
        let currentTax = taxes[i][0] * currentTaxable;
        const deduction = currentTaxable - currentTax;
        nonTaxed -= deduction;
        culmulativeTax += currentTax;
    }

    const finalGross = nonTaxed/(1-taxes[topNet][0]);
    culmulativeTax+= finalGross - nonTaxed;

    return net + culmulativeTax;
};

const calcNet = (gross) => {
    let nonTaxed = gross;
    let culmulativeTax = 0;
    for (let i = 0; nonTaxed > 0; i++) {
        let currentTaxable = Math.min(taxes[i][1], nonTaxed);
        let currentTax = taxes[i][0] * currentTaxable;
        nonTaxed -= currentTaxable;
        culmulativeTax += currentTax;
    }
    return gross -culmulativeTax
}

console.log(calcGross(calcNet(732)));

