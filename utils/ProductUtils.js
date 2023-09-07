export const getProductID = (productName) => {
    return 'VP-' + String(productName).replace(/\s/g, "-").toLowerCase();
};