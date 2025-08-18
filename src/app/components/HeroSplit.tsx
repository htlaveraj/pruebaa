// src/components/HeroSplit.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./hero-split.module.css";

type Frame = { slug: string; name: string; tag?: string; img: string };

// Usa tus propias rutas (ej. en /public/frames/*). Aquí van de ejemplo:
const FRAMES: Frame[] = [
  { slug: "uno",   name: "Delaware", tag: "ACCESORIOS", img: "/img/prueba.png" },
  { slug: "dos",   name: "Kyoto",    tag: "ACCESORIOS", img: "/img/prueba.png" },
  { slug: "tres",  name: "Monaco",   tag: "ACCESORIOS", img: "/img/prueba.png" },
];


// Animación más fluida (subí duración)
const DURATION = 900; // ms  (sincronizado con --dur del CSS)

export default function HeroSplit({ intervalMs = 5200 }: { intervalMs?: number }) {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const total = FRAMES.length;
  const active = useMemo(() => FRAMES[idx % total], [idx, total]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => goTo((idx + 1) % total), intervalMs);
    return () => { if (timer.current) clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, paused, intervalMs, total]);

  function goTo(nextIdx: number) {
    if (nextIdx === idx) return;
    if (timer.current) clearInterval(timer.current);
    setPrev(idx);
    setIdx(nextIdx);
    setTimeout(() => setPrev(null), DURATION + 60); // limpia capa saliente
  }

  return (
    <section
      className={styles.section}
      aria-label="Destacados LENTILU"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.shell}>
        {/* Watermark detrás */}
        <div className={styles.watermark} aria-hidden>
          LENTILU
        </div>

        <div className={styles.inner}>
          {/* Viewport animado */}
          <div className={styles.viewport}>
            {/* Saliente */}
            {prev !== null && (
              <figure key={`prev-${prev}`} className={`${styles.frame} ${styles.outgoing}`}>
                <div className={styles.imageWrap}>
                  <Image
                    src={FRAMES[prev].img}
                    alt={`Armazón ${FRAMES[prev].name}`}
                    fill
                    sizes="(max-width: 900px) 90vw, 900px"
                    className={styles.image}
                    priority
                  />
                </div>
              </figure>
            )}

            {/* Entrante */}
            <figure key={`in-${idx}`} className={`${styles.frame} ${styles.incoming}`}>
              <div className={styles.imageWrap}>
                <Image
                  src={active.img}
                  alt={`Armazón ${active.name}`}
                  fill
                  sizes="(max-width: 900px) 90vw, 900px"
                  className={styles.image}
                  priority
                />
              </div>
            </figure>
          </div>

          {/* Texto */}
          <figcaption className={styles.caption}>
            <div className={styles.kicker}>{active.tag ?? "MAS VENDIDOS"}</div>
            <h1 className={styles.title}>{active.name}</h1>
            <div className={styles.actions}>
              <Link href="/ofertas" className={styles.cta}>VER TODOS LOS PRODUCTOD</Link>
            </div>
          </figcaption>

          {/* Dots */}
          <div className={styles.dots} role="tablist" aria-label="Cambiar armazón">
            {FRAMES.map((f, i) => (
              <button
                key={f.slug}
                role="tab"
                aria-selected={i === idx}
                className={`${styles.dot} ${i === idx ? styles.active : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}