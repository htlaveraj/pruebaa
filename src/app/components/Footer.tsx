"use client";

import Link from "next/link";
import styles from "./footer.module.css";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-labelledby="site-footer">
      <div className={styles.shell}>
        {/* Top: marca + sitemap */}
        <div className={styles.top}>
          {/* Marca */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Inicio — LENTILU">
              LENTILU
            </Link>
            <p className={styles.tagline}>
              Armazones de precisión. Ligeros, resistentes y listos para el día a día.
            </p>

            <ul className={styles.social} aria-label="Redes sociales">
              <li>
                <Link href="#" aria-label="Instagram">
                  <Instagram size={18} />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="Facebook">
                  <Facebook size={18} />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="YouTube">
                  <Youtube size={18} />
                </Link>
              </li>
              <li>
                <Link href="#" aria-label="Twitter">
                  <Twitter size={18} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Sitemap */}
          <nav className={styles.columns} aria-label="Mapa del sitio">
            <section className={styles.col} aria-labelledby="f-colecciones">
              <h3 id="f-colecciones" className={styles.heading}>Colecciones</h3>
              <ul className={styles.links}>
                <li><Link href="/nuevo">Lo más nuevo</Link></li>
                <li><Link href="/hombre">Hombre</Link></li>
                <li><Link href="/mujer">Mujer</Link></li>
                <li><Link href="/ofertas">Promociones</Link></li>
              </ul>
            </section>

            <section className={styles.col} aria-labelledby="f-ayuda">
              <h3 id="f-ayuda" className={styles.heading}>Ayuda</h3>
              <ul className={styles.links}>
                <li><Link href="/faq">Preguntas frecuentes</Link></li>
                <li><Link href="/rastreo">Rastreo de pedidos</Link></li>
                <li><Link href="/garantias">Garantías y devoluciones</Link></li>
                <li><Link href="/medidas">Guía de medidas</Link></li>
              </ul>
            </section>

            <section className={styles.col} aria-labelledby="f-empresa">
              <h3 id="f-empresa" className={styles.heading}>Empresa</h3>
              <ul className={styles.links}>
                <li><Link href="/acerca">Acerca de Lentilú</Link></li>
                <li><Link href="/lunitex">Colaboración Lunitex</Link></li>
                <li><Link href="/mayoreo">Distribución y mayoreo</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
              </ul>
            </section>

            <section className={styles.col} aria-labelledby="f-legal">
              <h3 id="f-legal" className={styles.heading}>Legal</h3>
              <ul className={styles.links}>
                <li><Link href="/privacidad">Aviso de privacidad</Link></li>
                <li><Link href="/terminos">Términos y condiciones</Link></li>
                <li><Link href="/cookies">Preferencias de cookies</Link></li>
                <li><Link href="/accesibilidad">Accesibilidad</Link></li>
              </ul>
            </section>
          </nav>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()} aria-label="Suscripción al boletín">
            <label htmlFor="footer-email" className="sr-only">Correo electrónico</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Tu correo electrónico"
              className={styles.input}
            />
            <button type="submit" className={styles.submit}>Suscribirme</button>
          </form>
          <p className={styles.note}>
            Al suscribirte aceptas nuestro <Link href="/privacidad">Aviso de privacidad</Link>.
          </p>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© {year} Lentilú. Todos los derechos reservados.</p>
          <ul className={styles.bottomLinks}>
            <li><Link href="/privacidad">Privacidad</Link></li>
            <li><Link href="/terminos">Términos</Link></li>
            <li><Link href="/cookies">Cookies</Link></li>
            <li><Link href="/ayuda">Ayuda</Link></li>
          </ul>
          <p className={styles.madeBy}>
            Desarrollado por <a href="#" rel="noopener noreferrer">Sintropia</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
