const getTotalOrder = (data = []) => {
    let total = 0;
    let priceWithDiscount = 0;
    data.forEach(
        ({
            price,
            sale,
            orderproducts: {
                dataValues: { quantity },
            },
        }) => {
            priceWithDiscount = price - (price * sale / 100)
            total += priceWithDiscount * quantity;
        }
    );
    return total;
};

module.exports = getTotalOrder ;