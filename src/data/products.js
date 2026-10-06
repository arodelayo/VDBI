/*
  VDBI — Données produits

  Les images sont maintenant détectées automatiquement avec import.meta.glob().
  Il n'est donc plus nécessaire de créer :
  import shoe136 from "...";
  import shoe137 from "...";
  etc.

  IMPORTANT :
  Les noms des dossiers dans "folder" doivent correspondre EXACTEMENT
  aux noms présents dans src/assets/products/.
*/

const imageModules = import.meta.glob(
  "../assets/products/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

/**
 * Récupère automatiquement toutes les images d'un dossier produit.
 *
 * Sans imageOrder :
 *   1.png, 2.png, 3.png, 4.png...
 *
 * Avec imageOrder :
 *   on conserve exactement l'ordre souhaité pour le produit.
 */
function getProductImages(folder, imageOrder = []) {
  const prefix = `../assets/products/${folder}/`;

  const entries = Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, { numeric: true })
    );

  if (import.meta.env.DEV && entries.length === 0) {
    console.warn(
      `[VDBI] Aucune image trouvée pour le dossier produit : ${folder}`
    );
  }

  // Aucun ordre particulier : on utilise l'ordre numérique des fichiers.
  if (imageOrder.length === 0) {
    return entries.map(([, url]) => url);
  }

  // Ordre personnalisé.
  return imageOrder
    .map((filename) => {
      const entry = entries.find(
        ([path]) => path === `${prefix}${filename}`
      );

      if (!entry && import.meta.env.DEV) {
        console.warn(
          `[VDBI] Image "${filename}" introuvable dans "${folder}"`
        );
      }

      return entry?.[1];
    })
    .filter(Boolean);
}


/* =========================================================
   PRODUITS
   ========================================================= */

const productDefinitions = [
  {
    id: 1,
    name: "Nike Air Force 1 White",
    brand: "Nike",
    color: "White",
    price: 12000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Af1-white",
    imageOrder: ["03.png", "02.png", "01.png", "04.png"],
    available: true,
    isNew: true,
  },

  {
    id: 2,
    name: "Nike Air Force 1 Black",
    brand: "Nike",
    color: "Black",
    price: 12000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Af1-black",
    imageOrder: ["4.png", "1.png", "3.png", "2.png"],
    available: true,
    isNew: true,
  },

  {
    id: 3,
    name: "Puma Suede XL",
    brand: "Puma",
    color: "White/Black",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    folder: "Puma-suede-xl",
    imageOrder: ["1.png", "2.png", "3.png", "4.png"],
    available: true,
    isNew: true,
  },

  {
    id: 4,
    name: "Nike Air Max 95 Green",
    brand: "Nike",
    color: "Green",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Air-max-95-green",
    imageOrder: ["2.png", "1.png", "3.png", "4.png"],
    available: true,
    isNew: true,
  },

  {
    id: 5,
    name: "Asics Gel Kayano 14",
    brand: "Asics",
    color: "White/Blue",
    price: 18000,
    category: "Homme",
    quality: "Premium",
    sizes: [40, 41, 42, 43, 44],
    folder: "Asics-gel-kayano",
    imageOrder: ["4.png", "2.png", "3.png", "1.png"],
    available: true,
    isNew: true,
  },

  {
    id: 6,
    name: "Asics Gel NYC",
    brand: "Asics",
    color: "White",
    price: 18000,
    category: "Homme",
    quality: "Premium",
    sizes: [40, 41, 42, 43, 44],
    folder: "Asics-gel-nyc",
    imageOrder: ["1.png", "2.png", "3.png", "4.png"],
    available: true,
    isNew: true,
  },

  {
    id: 7,
    name: "New Balance Fuelcell Rebel V4",
    brand: "New Balance",
    color: "White",
    price: 20000,
    category: "Unisex",
    quality: "Premium",
    sizes: [42, 43, 44, 45, 46, 47],
    folder: "New-balance-fuelcell-rebel-v4",
    imageOrder: ["1.png", "2.png"],
    available: true,
    isNew: true,
  },

  {
    id: 8,
    name: "Adidas Gazelle",
    brand: "Adidas",
    color: "",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Adidas-gazelle",
    imageOrder: ["1.png", "2.png", "3.png"],
    available: true,
    isNew: true,
  },

  {
    id: 9,
    name: "Asics Gel NYC Black",
    brand: "Asics",
    color: "Black",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Asics-gel-nyc-black",
    imageOrder: ["3.png", "1.png", "2.png", "4.png"],
    available: true,
    isNew: true,
  },

  {
    id: 10,
    name: "Adidas Campus 00s Korn",
    brand: "Adidas",
    color: "White/Black",
    price: 16000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Adidas-campus-00s-korn",
    imageOrder: ["1.png", "2.png", "3.png"],
    available: true,
    isNew: true,
  },

  {
    id: 11,
    name: "Nike Mind 001 Slide Black Chrome",
    brand: "Nike",
    color: "Black",
    price: 25000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-mind-001-slide-black-chrome",
    imageOrder: ["2.png", "1.png", "3.png", "4.png"],
    available: true,
    isNew: true,
  },

  {
    id: 12,
    name: "Nike Mind 001 Slide Geode Teal Light Menta",
    brand: "Nike",
    color: "Geode Teal/Light Menta",
    price: 25000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-mind-001-slide-geode-teal-light-menta",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 13,
    name: "Nike Mind 001 Slide Blackened Blue Game Royal",
    brand: "Nike",
    color: "Blackened Blue/Game Royal",
    price: 25000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-Mind-001-Slide-Blackened-Blue-Game-Royal",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 14,
    name: "Nike Mind 001 Slide Team Red University Red",
    brand: "Nike",
    color: "Team Red/University Red",
    price: 25000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-mind-001-slide-team-red-university-red",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 15,
    name: "Nike Mind 001 Slide Light Bone",
    brand: "Nike",
    color: "Light Bone",
    price: 25000,
    category: "Unisex",
    quality: "Premium",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-mind-001-slide-light-bone",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 16,
    name: "Nike SB Dunk Low Concepts Orange Lobster",
    brand: "Nike",
    color: "Orange Lobster",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-sb-dunk-low-concepts-orange-lobster",
    imageOrder: ["2.png", "1.png", "3.png", "4.png"],
    available: true,
    isNew: true,
  },

  {
    id: 17,
    name: "Nike SB Dunk Low Pro OG QS Special Purple",
    brand: "Nike",
    color: "Special Purple",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-sb-dunk-low-pro-og-qs-special-purple",
    imageOrder: [
      "7.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "1.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 18,
    name: "Adidas Samba OG White",
    brand: "Adidas",
    color: "White",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Adidas-samba-og-white",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 19,
    name: "Adidas Samba OG Black",
    brand: "Adidas",
    color: "Black",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Adidas-samba-og-black",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 20,
    name: "Puma Baskets Speedcat OG Dark Brown",
    brand: "Puma",
    color: "Dark Brown",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Puma-baskets-Speedcat-OG-Dark-Brown",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 21,
    name: "Puma Baskets Speedcat OG",
    brand: "Puma",
    color: "Black",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Puma-baskets-Speedcat-OG",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 22,
    name: "Puma Baskets Speedcat OG Red/White",
    brand: "Puma",
    color: "Red/White",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Puma-baskets-Speedcat-OG-Red-White",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 23,
    name: "New Balance 530 White Silver Navy",
    brand: "New Balance",
    color: "White/Silver/Navy",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "New-Balance-530-White-Silver-Navy",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 24,
    name: "New Balance 9060 Warped Multicolor",
    brand: "New Balance",
    color: "Multicolor",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "New-balance-9060-warped-multicolor",
    imageOrder: [
      "1.png",
      "2.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 25,
    name: "Puma Suede XL Blue",
    brand: "Puma",
    color: "Blue",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Puma-suede-xl-blue",
    imageOrder: [
      "1.png",
      "2.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 26,
    name: "Nike Air Max 95 OG Neon",
    brand: "Nike",
    color: "Neon",
    price: 20000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Nike-air-max-95-og-neon",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 27,
    name: "Jordan 4 Retro White Oreo",
    brand: "Jordan",
    color: "White/Oreo",
    price: 16000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Jordan-4-Retro-White-Oreo",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 28,
    name: "Air Jordan 4 Retro OG Bred",
    brand: "Jordan",
    color: "Bred",
    price: 16000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Air-Jordan-4-Retro-OG-Bred",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 29,
    name: "Jordan x Off-White Air Jordan 4 Retro SP Sail",
    brand: "Jordan",
    color: "Sail",
    price: 17000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Jordan-x-Off-White-Air-Jordan-4-Retro-SP-Sail",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 30,
    name: "Rick Owens Hollywood Sneakers",
    brand: "Rick Owens",
    color: "Black",
    price: 40000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Rick-Owens-Hollywood-sneakers",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 31,
    name: "Rick Owens Baskets Jumbolace",
    brand: "Rick Owens",
    color: "Black",
    price: 40000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Rick-Owens-baskets-Jumbolace",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 32,
    name: "Rick Owens Baskets à lacets oversize",
    brand: "Rick Owens",
    color: "White",
    price: 40000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Rick-Owens-lacets-oversize",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 33,
    name: "Rick Owens Baskets Black Temple Geobasket",
    brand: "Rick Owens",
    color: "Black",
    price: 50000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "rick-owens-black-temple-geobasket-sneakers",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 34,
    name: "Louis Vuitton LV Skate Sneaker Marine White",
    brand: "Louis Vuitton",
    color: "Marine White",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Louis-Vuitton-LV-Skate-Sneaker-Marine-White",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 35,
    name: "NIKE x NOCTA HOT STEP AIR TERRA",
    brand: "NIKE",
    color: "White",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "NIKE x NOCTA HOT STEP AIR TERRA",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 36,
    name: "NIKE AIR MAX DN SUPREME BLACK",
    brand: "NIKE",
    color: "Black",
    price: 18000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "NIKE AIR MAX DN SUPREME BLACK",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
    ],
    available: true,
    isNew: true,
  },

  {
    id: 37,
    name: "Maison MIHARA YASUHIRO Baskets Peterson OG Sole en toile",
    brand: "Maison MIHARA YASUHIRO",
    color: "Black",
    price: 30000,
    category: "Unisex",
    quality: "Premium",
    sizes: [41, 42, 43, 44, 45, 46, 47],
    folder: "Maison MIHARA YASUHIRO",
    imageOrder: [
      "1.png",
      "2.png",
      "3.png",
    ],
    available: true,
    isNew: true,
  },
];


/* =========================================================
   PRODUITS EXPORTÉS
   ========================================================= */

export const products = productDefinitions.map(
  ({ folder, imageOrder, ...product }) => ({
    ...product,
    images: getProductImages(folder, imageOrder),
  })
);


/* =========================================================
   PRODUITS AFFICHÉS DANS LE HERO
   =========================================================

   IMPORTANT :
   Tous les produits restent dans le catalogue.

   Cette liste sert uniquement à choisir les produits
   affichés dans le carousel du Hero.
*/

export const heroProductIds = [
  1,
  9,
  3,
  4,
  5,
  6,
  7,
  8,
];