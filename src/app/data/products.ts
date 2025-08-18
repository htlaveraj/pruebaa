// src/data/products.ts
export type Gallery = { src: string; alt: string };
export type ColorVariant = { name: string; swatch: string; gallery: Gallery[] };

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  badge?: "NUEVO" | "MÁS VENDIDO";
  price: number;
  salePrice?: number;
  rating: number;
  reviews: number;
  group: "nuevos" | "ofertas";
  colors: ColorVariant[];
  sizes: string[]; // medidas ópticas (ancho–puente–varilla)
};

const PRODUCTS: Product[] = [
  // 1) Titanio ligero – NUEVO
  {
    slug: "lentilu-titan-r2",
    name: "Lentilú Titan R2",
    subtitle: "Titanio ultraligero con puente cómodo Lunitex",
    badge: "NUEVO",
    price: 1890,
    rating: 4.7,
    reviews: 25,
    group: "nuevos",
    colors: [
      {
        name: "Gris humo",
        swatch: "#2b2e30",
        gallery: [
          { src: "/img/frame.1.png", alt: "Frente — Titan R2 Gris humo" },
          { src: "/img/frame.3.png", alt: "Lateral — Titan R2 Gris humo" },
          { src: "/img/frame.1.png", alt: "Detalle bisagra — Titan R2" },
        ],
      },
    ],
    sizes: ["50–18–140", "52–18–142", "54–19–145"],
  },

  // 2) Acetato premium – MÁS VENDIDO
  {
    slug: "lunitex-aero-s",
    name: "Lunitex Aero S",
    subtitle: "Acetato premium con ajuste cómodo",
    badge: "MÁS VENDIDO",
    price: 1590,
    rating: 4.6,
    reviews: 31,
    group: "nuevos",
    colors: [
      {
        name: "Ámbar",
        swatch: "#c78b4a",
        gallery: [
          { src: "/img/frame.1.png", alt: "Frente — Aero S Ámbar" },
          { src: "/img/frame.1.png", alt: "Lateral — Aero S Ámbar" },
          { src: "/img/frame.1.png", alt: "Detalle puente — Aero S" },
        ],
      },
    ],
    sizes: ["50–18–140", "52–18–142"],
  },

  // 3) Metal pulido – en OFERTA
  {
    slug: "delaware-02",
    name: "Delaware 02",
    subtitle: "Metal pulido de alta resistencia",
    price: 1390,
    salePrice: 1190,
    rating: 4.5,
    reviews: 18,
    group: "ofertas",
    colors: [
      {
        name: "Plata",
        swatch: "#c8ccd0",
        gallery: [
          { src: "/img/frame.1.png", alt: "Frente — Delaware 02 Plata" },
          { src: "/img/frame.3.png", alt: "Lateral — Delaware 02 Plata" },
        ],
      },
    ],
    sizes: ["52–18–142"],
  },

  // 4) Clásico redondo — OFERTA
  {
    slug: "classic-m-round",
    name: "Classic M Round",
    subtitle: "Aro metálico redondo estilo atemporal",
    price: 1490,
    salePrice: 1190,
    rating: 4.4,
    reviews: 40,
    group: "ofertas",
    colors: [
      {
        name: "Gunmetal",
        swatch: "#505356",
        gallery: [
          { src: "/img/frame.3.png", alt: "Frente — Classic M Round Gunmetal" },
          { src: "/img/frame.1.png", alt: "Detalle nariz — Classic M Round" },
        ],
      },
      {
        name: "Negro mate",
        swatch: "#111213",
        gallery: [
          { src: "/img/frame.1.png", alt: "Frente — Classic M Round Negro mate" },
          { src: "/img/frame.1.png", alt: "Detalle varilla — Classic M Round" },
        ],
      },
    ],
    sizes: ["50–20–145", "52–20–145"],
  },

  // 5) Acetato slim para rostro pequeño — NUEVO
  {
    slug: "acetate-slim-w",
    name: "Acetate Slim W",
    subtitle: "Acetato delgado, perfil ligero para uso diario",
    price: 1590,
    rating: 4.3,
    reviews: 22,
    group: "nuevos",
    colors: [
      {
        name: "Perla",
        swatch: "#d9dadb",
        gallery: [
          { src: "/img/frame.1.png", alt: "Frente — Slim W Perla" },
          { src: "/img/frame.1.png", alt: "Lateral — Slim W Perla" },
          { src: "/img/frame.1.png", alt: "Detalle bisagra — Slim W" },
        ],
      },
    ],
    sizes: ["48–17–138", "50–17–140"],
  },

  // 6) Urban Clip-On — NUEVO (armazón + clip solar magnético)
  {
    slug: "urban-clip-on",
    name: "Urban Clip-On",
    subtitle: "Armazón versátil con clip solar magnético incluido",
    badge: "NUEVO",
    price: 1790,
    rating: 4.6,
    reviews: 14,
    group: "nuevos",
    colors: [
      {
        name: "Gris Urbano",
        swatch: "#4b4e4b",
        gallery: [
          { src: "/img/frame.3.png", alt: "Frente — Urban Clip-On Gris" },
          { src: "/img/img-zoom-2.jpg", alt: "Clip solar — Urban Clip-On" },
          { src: "/img/fondo2.jpg", alt: "Detalle imán — Urban Clip-On" },
        ],
      },
    ],
    sizes: ["52–18–142", "54–18–145"],
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByGroup(group: Product["group"]): Product[] {
  return PRODUCTS.filter((p) => p.group === group);
}
