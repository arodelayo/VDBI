/**
 * Configuration centrale de tarification, devises et frais pour VDBI
 *
 * - Les prix sources sont définis en FCFA dans src/data/products.js.
 * - Le prix en USD est calculé automatiquement selon la formule :
 *     Math.round(USD_BASE_SHIPPING_MARGIN + (prixFcfa / USD_DIVISOR))
 *   (ex: 55 + (12 000 / 600) = 75 $, ou 55 + (15 000 / 600) = 80 $, etc.
 *   couvrant l'expédition et la marge tout en restant très compétitif).
 * - KKIAPAY_FEE_PERCENT (3 % par défaut) compense la commission de paiement en ligne
 *   pour préserver intégralement la marge commerciale.
 */

export const PRICING_CONFIG = {
  // Base forfaitaire couvrant l'expédition internationale & la marge (80 $ et plus selon modèle)
  USD_BASE_SHIPPING_MARGIN: 55,

  // Diviseur de conversion FCFA -> USD (taux de référence)
  USD_DIVISOR: 600,

  // Pourcentage de frais Kkiapay à couvrir lors des règlements en ligne (3 % par défaut)
  KKIAPAY_FEE_PERCENT: 3,

  // Zones de livraison et barèmes tarifaires (FCFA et USD)
  DELIVERY_ZONES: [
    {
      id: "cotonou",
      labelFr: "Cotonou",
      labelEn: "Cotonou",
      feeFcfa: 1000,
      feeUsd: 2,
    },
    {
      id: "calavi",
      labelFr: "Abomey-Calavi",
      labelEn: "Abomey-Calavi",
      feeFcfa: 1500,
      feeUsd: 3,
    },
    {
      id: "autres",
      labelFr: "Autres villes Bénin / International",
      labelEn: "Other cities in Benin / International",
      feeFcfa: 2500,
      feeUsd: 5,
    },
  ],
};

/**
 * Calcule automatiquement le prix en USD à partir du prix FCFA
 * Formule : Math.round(USD_BASE_SHIPPING_MARGIN + (prixFcfa / USD_DIVISOR))
 */
export function calculateUsdPrice(priceFcfa) {
  if (!priceFcfa || priceFcfa <= 0) return 0;
  return Math.round(
    PRICING_CONFIG.USD_BASE_SHIPPING_MARGIN +
      priceFcfa / PRICING_CONFIG.USD_DIVISOR
  );
}

/**
 * Calcule le montant des frais Kkiapay (ex: +3 %)
 */
export function calculateKkiapayFee(amount, feePercent = PRICING_CONFIG.KKIAPAY_FEE_PERCENT) {
  if (!feePercent || feePercent <= 0) return 0;
  return Math.round(amount * (feePercent / 100));
}

/**
 * Calcule le montant total avec frais Kkiapay inclus
 */
export function applyKkiapayFee(amount, feePercent = PRICING_CONFIG.KKIAPAY_FEE_PERCENT) {
  return amount + calculateKkiapayFee(amount, feePercent);
}

/**
 * Formate un montant dans la devise spécifiée ('FCFA' ou 'USD')
 */
export function formatPriceByCurrency(amount, currency = "FCFA") {
  if (currency === "USD") {
    return `$${Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `${Number(amount).toLocaleString("fr-FR")} FCFA`;
}
