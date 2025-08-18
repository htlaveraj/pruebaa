// src/app/productos/[slug]/page.tsx
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getAllProducts, getProductBySlug } from "@/app/data/products";
import { notFound } from "next/navigation";
import ProductDetail from "../components/ProductDetail";

export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  return {
    title: p ? `${p.name} | Lentilú` : "Producto | Lentilú",
    description: p?.subtitle ?? "Armazones Lentilú",
  };
}
