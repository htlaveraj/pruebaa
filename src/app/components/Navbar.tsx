"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";
import { Menu, Search, ShoppingCart, User, HelpCircle } from "lucide-react";

const categorias = [
  { href: "/hombre", label: "Hombre" },
  { href: "/mujer", label: "Mujer" },
  { href: "/ofertas", label: "Ofertas" },
  { href: "/nuevo", label: "Lo más nuevo" },
];

const secundario = [
  { href: "/acerca", label: "Acerca de" },
  { href: "/rastreo", label: "Rastreo" },
  { href: "/cuenta", label: "Perfil" },
  { href: "/ayuda", label: "Ayuda" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.bg} />
      <div className="container">
        <div className={styles.bar}>
          {/* IZQUIERDA: burger (móvil) + brand izquierda (solo desktop) */}
          <div className={styles.left}>
            <button
              className={`${styles.iconBtn} ${styles.mobileOnly}`}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="lentilu-drawer"
              onClick={toggle}
            >
              <Menu size={22} />
            </button>

            {/* Brand izquierda para desktop */}
            <Link href="/" className={`${styles.brand} ${styles.desktopOnly}`} aria-label="Inicio LENTILU">
              <span>LENTILU</span>
            </Link>
          </div>

          {/* CENTRO: brand centrado (solo móvil) + categorías centradas (solo desktop) */}
          <div className={styles.center}>
            {/* Brand centrado móvil */}
            <Link href="/" className={`${styles.brand} ${styles.mobileOnly}`} aria-label="Inicio LENTILU (móvil)">
              <span>LENTILU</span>
            </Link>

            {/* Categorías (desktop) */}
            <nav className={`${styles.primary} ${styles.desktopOnly}`} aria-label="Categorías principales">
              {categorias.map((item) => (
                <Link key={item.href} href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* DERECHA: buscar + carrito; perfil/ayuda solo desktop */}
          <div className={styles.right}>
            {/* Desktop: botón Buscar gris muy tenue con texto */}
            <button className={`${styles.searchBtn} ${styles.desktopOnly}`} aria-label="Buscar">
              <Search size={18} />
              <span className={styles.searchLabel}>Buscar</span>
            </button>

            {/* Móvil: icono de Buscar con misma tonalidad que desktop */}
            <button className={`${styles.iconBtn} ${styles.soft} ${styles.mobileOnly}`} aria-label="Buscar">
              <Search size={20} />
            </button>

            <Link href="/carrito" className={styles.iconBtn} aria-label="Carrito">
              <ShoppingCart size={20} />
              <span className={styles.badge} aria-hidden>0</span>
            </Link>

            {/* Solo desktop: Perfil/Ayuda */}
            <Link href="/cuenta" className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Perfil">
              <User size={20} />
            </Link>
            <Link href="/ayuda" className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Ayuda">
              <HelpCircle size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Drawer móvil */}
      <div className={`${styles.scrim} ${open ? styles.show : ""}`} onClick={close} />
      <aside id="lentilu-drawer" className={`${styles.drawer} ${open ? styles.open : ""}`} aria-hidden={!open}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menú</span>
          <button className={styles.closeBtn} aria-label="Cerrar" onClick={close}>×</button>
        </div>
        <nav className={styles.drawerNav} aria-label="Menú móvil">
          {[...categorias, ...secundario].map((item) => (
            <Link key={item.href} href={item.href} className={styles.drawerLink} onClick={close}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}