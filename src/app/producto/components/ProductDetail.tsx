"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./product-detail.module.css";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  Ruler,
  RefreshCw,
  Heart,
} from "lucide-react";
import type { Product } from "@/app/data/products";

function money(n: number) {
  return `$${n.toLocaleString("es-MX")}`;
}

export default function ProductDetail({ product }: { product: Product }) {
  const [colorIdx, setColorIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);

  const variant = product.colors[colorIdx];
  const images = variant?.gallery ?? [];
  const total = images.length;

  const go = (dir: "prev" | "next") => {
    if (!total) return;
    setImgIdx((i) => (dir === "next" ? (i + 1) % total : (i - 1 + total) % total));
  };

  // índices para el triptych (izq/centro/der)
  const leftIdx = (imgIdx - 1 + total) % total;
  const rightIdx = (imgIdx + 1) % total;

  const dots = useMemo(() => images.map((_, i) => i), [images]);

  return (
    <section className={styles.section} aria-label={`Producto ${product.name}`}>
      <div className={styles.shell}>
        {/* MIGAS */}
        <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span aria-hidden>/</span>
          <Link href="/hombre">Hombre</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        {/* HERO TRIPTYCH (solo imagen) */}
        <div className={styles.hero}>
          <div className={styles.stageTriptych}>
            {/* flechas */}
            {total > 1 && (
              <>
                <button
                  className={`${styles.navBtn} ${styles.prev}`}
                  onClick={() => go("prev")}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className={`${styles.navBtn} ${styles.next}`}
                  onClick={() => go("next")}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* grid 3-paneles */}
            <div className={styles.triptych} aria-live="polite">
              {/* izquierda (asoma) */}
              <div className={`${styles.panel} ${styles.left}`}>
                {total > 0 && (
                  <Image
                    key={`left-${colorIdx}-${leftIdx}`}
                    src={images[leftIdx].src}
                    alt={images[leftIdx].alt}
                    fill
                    className={styles.panelImg}
                    sizes="(max-width:680px) 6vw, (max-width:1100px) 24vw, 26vw"
                    priority
                  />
                )}
              </div>

              {/* centro (protagonista) */}
              <div className={`${styles.panel} ${styles.center}`}>
                {total > 0 && (
                  <Image
                    key={`center-${colorIdx}-${imgIdx}`}
                    src={images[imgIdx].src}
                    alt={images[imgIdx].alt}
                    fill
                    className={styles.panelImg}
                    sizes="(max-width:680px) 88vw, (max-width:1100px) 52vw, 48vw"
                    priority
                  />
                )}
              </div>

              {/* derecha (asoma) */}
              <div className={`${styles.panel} ${styles.right}`}>
                {total > 0 && (
                  <Image
                    key={`right-${colorIdx}-${rightIdx}`}
                    src={images[rightIdx].src}
                    alt={images[rightIdx].alt}
                    fill
                    className={styles.panelImg}
                    sizes="(max-width:680px) 6vw, (max-width:1100px) 24vw, 26vw"
                    priority
                  />
                )}
              </div>
            </div>

            {/* contador + dots */}
            {total > 0 && (
              <p className={styles.counter}>
                {imgIdx + 1} de {total}
              </p>
            )}
          </div>

          {total > 1 && (
            <div className={styles.thumbRail} role="tablist" aria-label="Cambiar imagen">
              {dots.map((i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === imgIdx}
                  className={`${styles.thumbDot} ${i === imgIdx ? styles.thumbDotActive : ""}`}
                  onClick={() => setImgIdx(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* CUERPO: dos columnas */}
        <div className={styles.bodyGrid}>
          {/* IZQUIERDA: info */}
          <div className={styles.leftCol}>
            <div className={styles.genderTabs} aria-hidden>
              <button className={`${styles.gtab} ${styles.gtabActive}`}>HOMBRE</button>
              <button className={styles.gtab}>MUJER</button>
            </div>

            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.priceRow}>
              {product.salePrice ? (
                <>
                  <span className={styles.priceOld}>{money(product.price)}</span>
                  <span className={styles.price}>{money(product.salePrice)}</span>
                </>
              ) : (
                <span className={styles.price}>{money(product.price)}</span>
              )}
            </div>

            <p className={styles.subtitle}>{product.subtitle}</p>

            <div className={styles.rating}>
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
              <Star size={14} className={styles.starDim} />
              <span className={styles.reviews}>
                {product.rating.toFixed(1)} · ({product.reviews})
              </span>
            </div>

            <details className={styles.expander}>
              <summary>Explorar detalles del producto</summary>
              <ul className={styles.specList}>
                <li>Material principal según variante (titanio / acetato / metal)</li>
                <li>Medidas disponibles: {product.sizes.join(", ")}</li>
                <li>Bisel y bisagras reforzadas Lunitex</li>
                <li>Peso aproximado: 18–22 g</li>
              </ul>
            </details>
          </div>

          {/* DERECHA: compra */}
          <aside className={styles.buyCard}>
            {product.badge && <span className={styles.badge}>{product.badge}</span>}

            <div className={styles.block}>
              <p className={styles.blockLabel}>
                Color: <strong>{variant?.name}</strong>
              </p>
              <div className={styles.swatches}>
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    className={`${styles.swatch} ${i === colorIdx ? styles.swatchActive : ""}`}
                    style={{ background: c.swatch }}
                    aria-label={c.name}
                    aria-pressed={i === colorIdx}
                    onClick={() => {
                      setColorIdx(i);
                      setImgIdx(0);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className={styles.block}>
              <label htmlFor="size" className={styles.blockLabel}>
                Talla / Medida
              </label>
              <div className={styles.sizeRow}>
                <select
                  id="size"
                  className={styles.select}
                  value={size ?? ""}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona tu medida
                  </option>
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <button className={styles.ghostBtn} type="button">
                  <Ruler size={16} />
                  <span>Guía de medidas</span>
                </button>
              </div>
            </div>

            <div className={styles.ctaRow}>
              <button className={styles.buyBtn} disabled={!size}>
                AÑADIR AL CARRITO
              </button>
              <button className={styles.wishBtn} aria-label="Agregar a favoritos" type="button">
                <Heart size={18} />
              </button>
            </div>

            <ul className={styles.quickPerks}>
              <li>
                <Truck size={16} />
                Envíos a toda la República Mexicana
              </li>
              <li>
                <ShieldCheck size={16} />
                Garantía de fabricación 12 meses
              </li>
              <li>
                <RefreshCw size={16} />
                Cambios fáciles dentro de 30 días
              </li>
            </ul>
          </aside>
        </div>

        {/* Sticky bar móvil */}
        <div className={styles.stickyBar} aria-hidden>
          <div className={styles.stickyPrice}>
            {product.salePrice ? (
              <>
                <span className={styles.priceOld}>{money(product.price)}</span>
                <span className={styles.price}>{money(product.salePrice)}</span>
              </>
            ) : (
              <span className={styles.price}>{money(product.price)}</span>
            )}
          </div>
          <button className={styles.buyBtn} disabled={!size}>
            Añadir
          </button>
        </div>
      </div>
    </section>
  );
}
