export const getProductID = (productName) => {
    return 'VP-' + String(productName).replace(/\s/g, "-").toLowerCase();
};

export const getDateTime = (unix) => {
    if (unix) {
        const date = new Date(unix * 1000);
        return date.toLocaleString();
    } else {
        return null;
    }
};