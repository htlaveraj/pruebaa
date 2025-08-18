// src/components/CollectionCards.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./collection-cards.module.css";

/**
 * Tarjetas de colección (4): Lo más nuevo / Hombre / Mujer / Promociones
 * - Desktop: grid 4/2 columnas (sin cambios)
 * - Móvil (≤640px): carrusel horizontal con autodeslizamiento + scroll-snap
 */

type Card = {
  slug: string;
  title: string;
  href: string;
  baseSrc: string; // imagen normal
  zoomSrc: string; // imagen acercada
  variant: "nuevo" | "hombre" | "mujer" | "promo";
};

const CARDS: Card[] = [
  {
    slug: "nuevo",
    title: "Lo más nuevo",
    href: "/nuevo",
    baseSrc: "/img/frame.1.png",
    zoomSrc: "/img/img-zoom.jpg",
    variant: "nuevo",
  },
  {
    slug: "hombre",
    title: "Hombre",
    href: "/hombre",
    baseSrc: "/img/frame.3.png",
    zoomSrc: "/img/img-zoom.jpg",
    variant: "hombre",
  },
  {
    slug: "mujer",
    title: "Mujer",
    href: "/mujer",
    baseSrc: "/img/frame.3.png",
    zoomSrc: "/img/img-zoom-3.jpg",
    variant: "mujer",
  },
  {
    slug: "promo",
    title: "Promociones",
    href: "/ofertas",
    baseSrc: "/img/frame.1.png",
    zoomSrc: "/img/img-zoom-3.jpg",
    variant: "promo",
  },
];

export default function CollectionCards() {
  // 👉 sólo para móvil: auto-scroll
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return; // accesibilidad

    let timer: ReturnType<typeof setTimeout> | null = null;
    const stepMs = 2800; // tiempo entre tarjetas en móvil

    const run = () => {
      const el = trackRef.current;
      if (!el) return;
      // sólo ejecuta en pantallas pequeñas
      if (!window.matchMedia("(max-width: 640px)").matches) return;

      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;

      // índice del elemento más cercano al scroll actual
      const current = cards.reduce((bestIdx, node, idx) => {
        const dx = Math.abs(node.offsetLeft - el.scrollLeft);
        const best = Math.abs(cards[bestIdx].offsetLeft - el.scrollLeft);
        return dx < best ? idx : bestIdx;
      }, 0);

      const next = (current + 1) % cards.length;
      const left = cards[next].offsetLeft - 8; // pequeño margen
      el.scrollTo({ left, behavior: "smooth" });
    };

    const schedule = () => {
      if (timer) clearTimeout(timer);
      if (!paused) timer = setTimeout(() => { run(); schedule(); }, stepMs);
    };

    schedule();
    const onResize = () => schedule();
    window.addEventListener("resize", onResize);
    return () => { if (timer) clearTimeout(timer); window.removeEventListener("resize", onResize); };
  }, [paused]);

  return (
    <section className={styles.section} aria-label="Categorías destacadas">
      <div className={styles.shell}>
        <div
          ref={trackRef}
          className={styles.grid}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {CARDS.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              className={`${styles.card} ${styles[c.variant]}`}
              aria-label={`Ver ${c.title}`}
            >
              <div className={styles.media}>
                {/* Imagen base */}
                <Image
                  src={c.baseSrc}
                  alt={c.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                  className={`${styles.img} ${styles.base}`}
                  priority
                />
                {/* Imagen zoom (aparece en hover) */}
                <Image
                  src={c.zoomSrc}
                  alt={c.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                  className={`${styles.img} ${styles.zoom}`}
                  priority
                />
              </div>

              {/* Chip/cta centrado que hace morph */}
              <span className={styles.badge} aria-hidden>
                <span className={styles.badgeText}>{c.title.toUpperCase()}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
