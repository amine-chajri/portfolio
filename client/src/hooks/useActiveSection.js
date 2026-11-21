import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const offset = Math.min(window.innerHeight * 0.35, 280);
      let current = '';

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return activeSection;
}
