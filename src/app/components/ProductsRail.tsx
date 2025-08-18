"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
// import Link from "next/link";  // ❌ ya no lo usamos
import styles from "./products-rail.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductsByGroup, type Product } from "../data/products";
import { useRouter } from "next/navigation";

type Props = { defaultTab?: Product["group"] };

export default function ProductsRail({ defaultTab = "nuevos" }: Props) {
  const router = useRouter();

  const [active, setActive] = useState<Product["group"]>(defaultTab);
  const list = useMemo(() => getProductsByGroup(active), [active]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 0);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, [list.length]);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current; if (!el) return;
    const step = Math.min(el.clientWidth * 0.9, 800);
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  const goTo = (slug: string) => router.push(`/producto/${slug}`);

  return (
    <section className={styles.section} aria-label="Selección de armazones">
      <div className={styles.shell}>
        <div className={styles.tabs} role="tablist" aria-label="Categorías">
          <button role="tab" aria-selected={active === "nuevos"}
                  className={`${styles.tab} ${active === "nuevos" ? styles.tabActive : ""}`}
                  onClick={() => setActive("nuevos")}>NUEVOS</button>
          <button role="tab" aria-selected={active === "ofertas"}
                  className={`${styles.tab} ${active === "ofertas" ? styles.tabActive : ""}`}
                  onClick={() => setActive("ofertas")}>OFERTAS</button>

          <div className={styles.arrows}>
            <button className={styles.arrowBtn} aria-label="Anterior"
                    onClick={() => scroll("prev")} disabled={!canPrev}><ChevronLeft size={18} /></button>
            <button className={styles.arrowBtn} aria-label="Siguiente"
                    onClick={() => scroll("next")} disabled={!canNext}><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className={styles.track} ref={trackRef} tabIndex={0}
             onKeyDown={(e) => { if (e.key === "ArrowRight") scroll("next"); if (e.key === "ArrowLeft") scroll("prev"); }}
             aria-roledescription="carrusel de productos">
          {list.map((p, idx) => (
            <article
              key={p.slug}
              className={styles.card}
              role="link"
              tabIndex={0}
              onClick={() => goTo(p.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goTo(p.slug);
                }
              }}
            >
              {p.badge && <span className={styles.badge}>{p.badge}</span>}

              <div className={styles.imageBox}>
                <Image
                  src={p.colors?.[0]?.gallery?.[0]?.src ?? "/img/frame.1.png"}
                  alt={p.name}
                  fill
                  className={styles.img}
                  sizes="(max-width:640px) 86vw, (max-width:1100px) 38vw, 22vw"
                  priority={idx < 2}
                />
              </div>

              <div className={styles.meta}>
                <div className={styles.titles}>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.sub}>{p.subtitle}</p>
                </div>
                <div className={styles.priceRow}>
                  {p.salePrice ? (
                    <>
                      <span className={styles.priceOld}>${p.price}</span>
                      <span className={styles.price}>${p.salePrice}</span>
                    </>
                  ) : <span className={styles.price}>${p.price}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
