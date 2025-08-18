// src/app/producto/[slug]/page.tsx  ← asegúrate que el folder sea "producto" (no "productos")
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getAllProducts, getProductBySlug } from "@/app/data/products";
import { notFound } from "next/navigation";
import ProductDetail from "../components/ProductDetail";
import type { Metadata } from "next";

type Params = { slug: string };

// ✅ params es Promise en Next 15
export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}

// ✅ generateStaticParams ahora **acepta** un ctx con { params: ... } (aunque no lo uses)
export function generateStaticParams(_ctx: { params: Params }) {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return {
    title: p ? `${p.name} | Lentilú` : "Producto | Lentilú",
    description: p?.subtitle ?? "Armazones Lentilú",
  };
}
