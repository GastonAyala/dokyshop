const converMoneyArg = (num = 0) => num.toLocaleString({
    currency: "ARS",
    style: "currency"
})

module.exports = converMoneyArg;