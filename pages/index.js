import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import SeoHead from "../components/SeoHead";
import Galeri from "../components/Galeri";
import Unggul from "../components/Unggul";
import Maps from "../components/Maps";
import Benefit from "../components/Benefit";

export default function Home() {
  return (
    <>
      <SeoHead title="CV Sarana Teknik Bali" />
      <Hero />
      <Benefit />
      <Pricing />
      <Galeri />
      <Maps />
      <Unggul />
    </>
  );
}
