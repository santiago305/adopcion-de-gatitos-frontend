import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

type ParagraphPosition = 'above' | 'visible' | 'below';

export const useParagraphPositions = (length: number) => {
  const [positions, setPositions] = useState<ParagraphPosition[]>(
    Array(length).fill('below')
  );

  const refs = Array.from({ length }, () => useInView({ threshold: 0.5 }));

  useEffect(() => {
    const newPositions: ParagraphPosition[] = [];

    refs.forEach(({ entry }, index) => {
      const ratio = entry?.intersectionRatio ?? 0;

      if (!entry) {
        newPositions[index] = 'below';
        return;
      }

      const boundingTop = entry.boundingClientRect.top;
      const isAbove = boundingTop < 0 && ratio < 0.5;
      const isVisible = ratio >= 0.5;

      if (isVisible) newPositions[index] = 'visible';
      else if (isAbove) newPositions[index] = 'above';
      else newPositions[index] = 'below';
    });

    setPositions(newPositions);
  }, [refs.map(r => r.entry?.intersectionRatio).join(',')]);

  return { refs, positions };
};
