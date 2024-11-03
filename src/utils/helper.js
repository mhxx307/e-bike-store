// Helper function to format prices
export const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

// New helper function to validate numeric input
export const isNumeric = (value) => {
    return /^(\d+|\d+\.\d+)$/.test(value);
};

0;

export const formatCurrencyNumberWithDecimal = (number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(number);
};
