export function cn(...inputs) {
  return inputs
    .flat(Infinity)
    .filter(Boolean)
    .map((input) => (typeof input === "string" ? input.trim() : ""))
    .filter(Boolean)
    .join(" ");
}

export function formatPrice(price) {
  if (typeof price !== "number") return price;
  return `${price.toLocaleString("fr-FR")} FCFA`;
}
