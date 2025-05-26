import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import LogoFooter from "./LogoFooter";
import FooterNavSection from "./FooterNavSection";
import { LinksNav1, LinksNetworks } from "./LinksFooter";
import FooterNavNetworks from "./FooterNavNetworks";
import { useSectionObserver } from '@/hooks/useSectionObserver';

export default function Footer() {
  const { sectionRef, isVisible } = useSectionObserver(0.3);
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
      });
    } else {
      controls.start({
        opacity: 0,
        y: 30,
        transition: { duration: 0.4, ease: 'easeInOut' }
      });
    }
  }, [isVisible, controls]);

  return (
    <motion.footer
      ref={sectionRef}
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
