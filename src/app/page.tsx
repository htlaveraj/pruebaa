import Navbar from "./components/Navbar";
import HeroSplit from "./components/HeroSplit";
import BenefitsRibbon from "./components/BenefitsRibbon";
import CollectionCards from "./components/CollectionCards";
import ShowcaseMosaic from "./components/ShowcaseMosaic";
import ProductsRail from "./components/ProductsRail";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSplit intervalMs={4800} />     {/* opcionalmente con intervalo */}
      <BenefitsRibbon />
      <CollectionCards />
      <ShowcaseMosaic />
      <ProductsRail defaultTab="nuevos" />{/* pestaña inicial */}
      <Footer />
    </main>
  );
}