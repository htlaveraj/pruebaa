// === src/components/BenefitsRibbon.tsx ===============================
"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./benefits-ribbon.module.css";
import type { LucideIcon } from "lucide-react";
import { Truck, CreditCard, BadgeCheck, Tag, PackageCheck, Headphones } from "lucide-react";

/**
 * Cintilla de ventajas B2B
 * - Mismos márgenes laterales (12px) y radio (14px) que navbar/hero
 * - Altura contenida (banner delgado)
 * - Colores más oscuros en texto/íconos y fondo/borde muy sutiles
 * - En móvil: **autodeslizante** por tiempo (con pausa al interactuar)
 */

type Item = { icon: LucideIcon; label: string };
const items: Item[] = [
  { icon: Truck,         label: "Envíos a todo México" },
  { icon: CreditCard,    label: "Pagos con tarjeta y SPEI" },
  { icon: BadgeCheck,    label: "Socio certificado Lunitex" },
  { icon: Tag,           label: "Precios de mayoreo" },
  { icon: PackageCheck,  label: "Inventario verificado" },
  { icon: Headphones,    label: "Atención especializada B2B" },
];

export default function BenefitsRibbon() {
  const listRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return; // respetar accesibilidad

    let timer: ReturnType<typeof setTimeout> | null = null;
    const stepMs = 2600; // cada 2.6s avanza al siguiente chip

    const run = () => {
      const el = listRef.current;
      if (!el) return;
      const mq = window.matchMedia("(max-width: 900px)");
      if (!mq.matches) return; // solo móvil

      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      // índice del item que está más a la izquierda actualmente
      const current = children.reduce((closestIdx, node, idx) => {
        const dx = Math.abs(node.offsetLeft - el.scrollLeft);
        const best = Math.abs(children[closestIdx].offsetLeft - el.scrollLeft);
        return dx < best ? idx : closestIdx;
      }, 0);

      const next = (current + 1) % children.length;
      const targetLeft = children[next].offsetLeft - 6; // pequeño margen
      el.scrollTo({ left: targetLeft, behavior: "smooth" });
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
    <section className={styles.section} aria-label="Ventajas de LENTILU">
      <div className={styles.shell}>
        <div className={styles.inner}>
          <ul
            className={styles.list}
            role="list"
            ref={listRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {items.map((it) => (
              <li key={it.label} className={styles.item} aria-label={it.label}>
                <it.icon className={styles.icon} size={18} aria-hidden="true" />
                <span className={styles.label}>{it.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}