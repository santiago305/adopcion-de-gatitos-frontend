import { useInView } from 'react-intersection-observer';

const useVisibilityAnimation = () => {
  const { ref, inView, entry } = useInView({
    threshold: [0, 0.5, 1],
  });

  return { ref, inView, entry };
};

export default useVisibilityAnimation;

