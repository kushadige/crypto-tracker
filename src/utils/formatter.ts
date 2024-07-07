export const formatPrice = (price: string) => {
  if (!price) {
    return "-";
  }

  const priceFloat = parseFloat(price);

  if (priceFloat < 1) {
    const trimmedPrice = price.replace(/\.?0+$/, "");
    return trimmedPrice.replace(".", ",");
  }

  const formattedPrice = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceFloat);

  return formattedPrice;
};
