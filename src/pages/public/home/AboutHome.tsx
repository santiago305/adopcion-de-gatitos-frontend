import SectionTitle from '@/components/SectionTitle';
import TextBlockWithButton from './aboutHome/TextBlockWithButton';
import { textAboutHome } from './aboutHome/textAboutHome';
import ImageBlock from '@/components/ImageBlock';
import { useSectionObserver } from '@/hooks/useSectionObserver';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function AboutHome() {
  const { sectionRef, isVisible } = useSectionObserver(0.3);
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.9,
        y: 50,
        transition: { duration: 0.5, ease: 'easeInOut' },
      });
    }
  }, [isVisible, controls]);

  return (
    <div className="w-full h-full flex">
      <div ref={sectionRef} className="w-full h-full max-w-[1200px] m-auto py-20 px-10">
        <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={controls}
        >
          <SectionTitle title="¿Quiénes somos?" className="text-center" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={controls}
          className="w-full h-auto flex gap-5 flex-wrap"
        >
          <TextBlockWithButton
            paragraphs={textAboutHome}
            buttonText="Conoce más sobre nosotros"
            buttonTo="/about"
            className="w-full lg:max-w-[700px]"
          />
          <ImageBlock
            src="/assets/aboutHome.jpeg"
            alt="Huellitas felices"
            className="w-full lg:max-w-[500px] min-w-[300px]"
          />
        </motion.div>
      </div>
    </div>
  );
}
