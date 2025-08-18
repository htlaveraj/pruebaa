// src/components/ShowcaseMosaic.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./showcase-mosaic.module.css";

export default function ShowcaseMosaic() {
  const img = {
    left: "/img/galelri.jpg",
    rightTop: "/img/img-zoom-2.jpg",
    rightBottom: "/img/fondo2.jpg",
  };

  return (
    <section className={styles.section} aria-label="Nueva colección de armazones LENTILU">
      <div className={styles.shell}>
        <div className={styles.grid}>
          {/* Izquierda: imagen grande contenida SOLO en su tile */}
      {/* --- Columna izquierda (SIN fill, 100% contenida) --- */}
<article className={styles.leftTile}>
  <div className={styles.ratio}>
    <Image
      src={img.left}
      alt="Nueva colección Lunitex x LENTILU"
      width={1600}              // cualquier relación 16:11 funciona
      height={1100}
      priority
      className={styles.imgCoverStatic}
    />
  </div>

  <div className={styles.overlay}>
    <p className={styles.kicker}>NUEVA COLECCIÓN</p>
    <h2 className={styles.title}>Serie Titanio Lunitex</h2>
    <p className={styles.subtitle}>Ligeros, resistentes y listos para todo el día.</p>
    <div className={styles.ctas}>
      <Link href="/hombre" className={styles.glassBtn}>HOMBRE</Link>
      <Link href="/mujer"  className={styles.glassBtn}>MUJER</Link>
    </div>
  </div>
</article>


          {/* Derecha */}
          <div className={styles.rightCol}>
            <article className={styles.topTile}>
              <div className={styles.media}>
                <Image
                  src={img.rightTop}
                  alt="Armazones en exhibición"
                  fill
                  sizes="(max-width: 1100px) 100vw, 40vw"
                  className={styles.imgCover}
                />
              </div>
            </article>

            <div className={styles.bottomRow}>
              <article className={styles.smallTile}>
                <div className={styles.media}>
                  <Image
                    src={img.rightBottom}
                    alt="Detalle de acabado Lunitex"
                    fill
                    sizes="(max-width: 1100px) 100vw, 20vw"
                    className={styles.imgCover}
                  />
                </div>
              </article>

              <article className={styles.textCard}>
                <h3 className={styles.textTitle}>10 años de precisión óptica</h3>
                <p className={styles.textBody}>
                  Tecnología <strong>Lunitex</strong> aplicada a armazones: ingeniería de peso pluma,
                  flexibilidad y acabados premium.
                </p>
                <Link href="/catalogo" className={styles.cardCta}>VER TODO EL CATÁLOGO</Link>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
