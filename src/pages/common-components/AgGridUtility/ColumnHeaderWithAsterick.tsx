const Template =
  '<div class="ag-cell-label-container" role="presentation">' +
  '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
  '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
  '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
  '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
  '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
  '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
  '     <span ref="eText" class="ag-header-cell-text required" role="columnheader"></span></a>' +
  '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
  "  </div>" +
  "</div>";

export default Template;

export function formatAmountInINR(amount: any) {
  // Convert the number to INR format
  let em = parseFloat(amount);
  const formattedAmount = em.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  // Replace the currency code with the INR symbol
  return formattedAmount.replace("INR", "₹");
}

// Example usage:

export const formatQuantity = (quantity: number) => {
  if (quantity >= 10000000000) {
    return (quantity / 10000000000).toFixed(2) + " L Crs";
  } else if (quantity >= 10000000) {
    return (quantity / 10000000).toFixed(2) + " Crs";
  } else if (quantity >= 100000) {
    return (quantity / 100000).toFixed(2) + " L";
  } else if (quantity >= 1000) {
    const amount = quantity / 100000;
    let output = amount.toFixed(2) + " L";
    return output;
  } else {
    return formatNumber(quantity, 0);
  }
};

export function formatNumber(
  number,
  decimalPlaces = 2,
  decimalSeparator = ".",
  thousandSeparator = ","
) {
  let [integerPart, decimalPart] = Number(number)
    .toFixed(decimalPlaces)
    .split(".");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  const formattedNumber = decimalPart
    ? integerPart + decimalSeparator + decimalPart
    : integerPart;

  return formattedNumber;
}
