export const formatInteger = (currency, integer)=> {
  var currencies = {
    "JPY": "¥",
    "CAD": "$",
    "USD": "$"
  };
  var amount = currencies[currency] + Math.abs(integer).toLocaleString(undefined, {minimumFractionDigits: 0});
  return integer >= 0 ? amount : "-" + amount;
}
