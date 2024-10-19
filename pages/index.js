import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import SeoHead from "../components/SeoHead";
import Galeri from "../components/Galeri";
import Faq from "../components/Faq";
import Testimoni from "../components/Testimoni";
import Unggul from "../components/Unggul";
import Benefit from "../components/Benefit";

export default function Home() {
  return (
    <>
      <SeoHead title="CATBKN Landing Page" />
      <Hero />
      <Galeri />
     <Benefit/>
      {/* <Feature /> */}
      <Pricing />
      <Testimoni />
      <Faq/>
      <Unggul/>
    </>
  );
}