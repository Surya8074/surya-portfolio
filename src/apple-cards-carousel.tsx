import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useOutsideClick } from './useOutsideClick';
import './apple-cards-carousel.css';

export type AppleProjectCardData = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

type CarouselContextValue = {
  onCardClose: (index: number) => void;
  currentIndex: number;
};
export const CarouselContext = createContext<CarouselContextValue>({
  onCardClose: () => {},
  currentIndex: 0,
});

export function Carousel({ items, initialScroll = 0 }: { items: React.ReactNode[]; initialScroll?: number }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollLeft = initialScroll;
    checkScrollability();
    const observer = new ResizeObserver(checkScrollability);
    observer.observe(el);
    return () => observer.disconnect();
  }, [initialScroll, checkScrollability]);

  const scrollByPage = (direction: number) => {
    carouselRef.current?.scrollBy({ left: direction * Math.max(280, carouselRef.current.clientWidth * 0.72), behavior: 'smooth' });
  };

  const handleCardClose = (index: number) => {
    const el = carouselRef.current;
    if (el) {
      const card = el.querySelector<HTMLElement>(`[data-carousel-card="${index}"]`);
      if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: 'smooth' });
    }
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="apple-carousel">
        <div className="apple-carousel-track" ref={carouselRef} onScroll={checkScrollability}>
          <div className="apple-carousel-items">
            {items.map((item, index) => (
              <motion.div
                data-carousel-card={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.12 * index, ease: 'easeOut' }}
                key={`card-${index}`}
                className="apple-carousel-item"
              >{item}</motion.div>
            ))}
          </div>
        </div>
        <div className="apple-carousel-controls">
          <button type="button" aria-label="Scroll projects left" onClick={() => scrollByPage(-1)} disabled={!canScrollLeft}><ArrowLeft size={20}/></button>
          <button type="button" aria-label="Scroll projects right" onClick={() => scrollByPage(1)} disabled={!canScrollRight}><ArrowRight size={20}/></button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function Card({ card, index, layout = false }: { card: AppleProjectCardData; index: number; layout?: boolean }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);
  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [index, onCardClose]);
  useOutsideClick(containerRef, handleClose);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, handleClose]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="apple-card-modal">
            <motion.button type="button" aria-label="Close project details" className="apple-card-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose}/>
            <motion.div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label={card.title}
              className="apple-card-modal-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              layoutId={layout ? `card-${card.title}` : undefined}
            >
              <button type="button" className="apple-card-close" onClick={handleClose} aria-label="Close"><X size={19}/></button>
              <p className="apple-card-modal-category">{card.category}</p>
              <h3 className="apple-card-modal-title">{card.title}</h3>
              <div className="apple-card-modal-content">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        className="apple-project-card"
        aria-label={`Open ${card.title} project details`}
      >
        <span className="apple-project-card-shade"/>
        <span className="apple-project-card-copy">
          <span className="apple-project-category">{card.category}</span>
          <span className="apple-project-title">{card.title}</span>
        </span>
        <img src={card.src} alt={card.title} loading="lazy" decoding="async"/>
      </motion.button>
    </>
  );
}
