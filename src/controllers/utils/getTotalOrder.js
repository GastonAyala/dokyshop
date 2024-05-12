const getTotalOrder = (data = []) => {
    let total = 0;
    data.forEach(
        ({
            price,
            orderproducts: {
                dataValues: { quantity },
            },
        }) => {
            total += price * quantity;
        }
    );
    return total;
};

module.exports = getTotalOrder ;