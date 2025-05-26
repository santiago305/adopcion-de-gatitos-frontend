import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import useVisibilityAnimation from '@/hooks/useVisibilityAnimation';

import LogoFooter from "./LogoFooter";
import FooterNavSection from "./FooterNavSection";
import { LinksNav1, LinksNetworks } from "./LinksFooter";
import FooterNavNetworks from "./FooterNavNetworks";

export default function Footer() {
  const { ref, entry } = useVisibilityAnimation();
  const controls = useAnimation();

  React.useEffect(() => {
    const ratio = entry?.intersectionRatio ?? 0;
    if (ratio >= 0.5) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
    } else {
      controls.start({ opacity: 0, y: 30, transition: { duration: 0.5 } });
    }
  }, [entry, controls]);

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      className="w-full bg-secondary"
    >
      <div className="max-w-[1200px] h-auto m-auto p-10 flex justify-between flex-col md:flex-row gap-10">
        <LogoFooter />
        <FooterNavSection title="Contáctanos" links={LinksNav1} />
        <FooterNavNetworks title="Redes" links={LinksNetworks} />
      </div>
    </motion.footer>
  );
}
