import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useOutsideClick } from './useOutsideClick';
import './apple-cards-carousel.css';

export type AppleProjectCardData = { src: string; title: string; category: string; content: React.ReactNode };
type CarouselContextValue = { onCardClose: (index: number) => void; onCardSelect: (index: number) => void; currentIndex: number; setCenterHovered: (hovered: boolean) => void; centerHovered: boolean };
export const CarouselContext = createContext<CarouselContextValue>({ onCardClose: () => {}, onCardSelect: () => {}, currentIndex: 0, setCenterHovered: () => {}, centerHovered: false });

export function Carousel({ items, initialScroll = 0 }: { items: React.ReactNode[]; initialScroll?: number }) {
  const [currentIndex, setCurrentIndex] = useState(Math.min(Math.max(0, initialScroll), items.length - 1));
  const [centerHovered, setCenterHovered] = useState(false);
  const pointerStart = useRef<{ x: number; index: number } | null>(null);
  const wheelLock = useRef(false);
  const select = useCallback((index: number) => {
    const cycleSize = Math.max(1, Math.floor(items.length / 7));
    const center = cycleSize * 3;
    if (index < cycleSize * 2 || index >= cycleSize * 5) {
      const equivalent = ((index % cycleSize) + cycleSize) % cycleSize;
      setCurrentIndex(center + equivalent);
      return;
    }
    setCurrentIndex(index);
  }, [items.length]);
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      event.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      select(currentIndex + (event.deltaX > 0 ? 1 : -1));
      window.setTimeout(() => { wheelLock.current = false; }, 420);
    }
  };
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    pointerStart.current = { x: event.clientX, index: currentIndex };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) return;
    const delta = event.clientX - pointerStart.current.x;
    if (Math.abs(delta) > 35) select(pointerStart.current.index + (delta < 0 ? 1 : -1));
    pointerStart.current = null;
  };
  return (
    <CarouselContext.Provider value={{ currentIndex, onCardSelect: select, onCardClose: select, centerHovered, setCenterHovered }}>
      <div className="apple-carousel">
        <div className="apple-carousel-stage" onWheel={handleWheel} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null; }}>
          <div className="apple-carousel-arc" aria-label="Other projects carousel">
            {items.map((item, index) => {
              const offset = index - currentIndex;
              const distance = Math.abs(offset);
              const visible = distance <= 4;
              return <motion.div key={'project-card-' + index} className={'apple-carousel-item ' + (offset === 0 ? 'is-active' : '')}
                initial={false}
                animate={{ x: offset * 244 + (centerHovered && offset !== 0 ? Math.sign(offset) * 82 : 0), y: Math.min(distance * 17, 68) + (centerHovered && offset === 0 ? 30 : 0), scale: Math.max(0.48, 1 - distance * 0.145) * (centerHovered && offset === 0 ? 0.97 : 1), rotateY: offset * -17, rotateX: centerHovered && offset === 0 ? 15 : 0, z: -distance * 115, opacity: visible ? Math.max(0.18, 1 - distance * 0.19) : 0 }}
                transition={{ type: 'spring', stiffness: 115, damping: 19, mass: 0.8 }}
                style={{ zIndex: 20 - distance, pointerEvents: visible ? 'auto' : 'none' }}
                onClick={() => { if (offset !== 0) select(index); }}>{item}</motion.div>;
            })}
          </div>
          <div className="apple-carousel-edge apple-carousel-edge-left" />
          <div className="apple-carousel-edge apple-carousel-edge-right" />
        </div>
        <div className="apple-carousel-controls">
          <span className="apple-carousel-position">{String(currentIndex + 1).padStart(2, '0')} <i>/</i> {String(items.length).padStart(2, '0')}</span>
          <button type="button" aria-label="Previous project" onClick={() => select(currentIndex - 1)} ><ArrowLeft size={19}/></button>
          <button type="button" aria-label="Next project" onClick={() => select(currentIndex + 1)} ><ArrowRight size={19}/></button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function Card({ card, index, layout = false }: { card: AppleProjectCardData; index: number; layout?: boolean }) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, onCardSelect, currentIndex, setCenterHovered } = useContext(CarouselContext);
  const [hovered, setHovered] = useState(false);
  const isActive = currentIndex === index;
  const handleClose = useCallback(() => { setOpen(false); onCardClose(index); }, [index, onCardClose]);
  useOutsideClick(containerRef, handleClose);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKeyDown); };
  }, [open, handleClose]);
  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - rect.top) / rect.height - 0.5) * -13, y: ((event.clientX - rect.left) / rect.width - 0.5) * 17 });
  };
  return <>
    <AnimatePresence>
      {open && isActive && <div className="apple-card-modal">
        <motion.button type="button" aria-label="Close project details" className="apple-card-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose}/>
        <motion.div ref={containerRef} role="dialog" aria-modal="true" aria-label={card.title} className="apple-card-modal-panel"
          initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.28, ease: 'easeOut' }} layoutId={layout ? 'card-' + card.title : undefined}>
          <button type="button" className="apple-card-close" onClick={handleClose} aria-label="Close"><X size={19}/></button>
          <p className="apple-card-modal-category">{card.category}</p><h3 className="apple-card-modal-title">{card.title}</h3>
          <div className="apple-card-modal-content">{card.content}</div>
        </motion.div>
      </div>}
    </AnimatePresence>
    <AnimatePresence>{isActive && hovered && <motion.div className="apple-project-hover-panel" initial={{ opacity: 0, y: 18, scale: 0.94, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: 12, scale: 0.96, filter: 'blur(6px)' }} transition={{ type: 'spring', stiffness: 180, damping: 20 }}><span className="apple-project-panel-kicker">PROJECT OVERVIEW</span><strong>{card.title}</strong><span className="apple-project-panel-category">{card.category}</span><span className="apple-project-panel-description">{card.title === 'Toniq AI' ? 'A spatial networking platform with an AI layer that gives attendees context before conversations begin.' : 'A connected desk companion that celebrates completed tasks through a physical, expressive interaction.'}</span><span className="apple-project-panel-cta">Explore project <b>↗</b></span></motion.div>}</AnimatePresence>
    <motion.button type="button" layoutId={layout ? 'card-' + card.title : undefined}
      onClick={() => { if (!isActive) onCardSelect(index); else setOpen(true); }}
      onPointerMove={handlePointerMove} onPointerEnter={() => { if (isActive) { setHovered(true); setCenterHovered(true); } }} onPointerLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); setCenterHovered(false); }}
      className={'apple-project-card ' + (isActive ? 'apple-project-card-active' : 'apple-project-card-side')}
      style={{ '--tilt-x': tilt.x + 'deg', '--tilt-y': tilt.y + 'deg' } as React.CSSProperties}
      aria-label={isActive ? 'Open ' + card.title + ' project details' : 'Bring ' + card.title + ' to centre'}>
      <span className="apple-project-card-shade"/>
      <span className="apple-project-card-copy"><span className="apple-project-category">{card.category}</span><span className="apple-project-title">{card.title}</span>
        {isActive && <span className="apple-project-hint">Explore project <b>↗</b></span>}
      </span>
      <img src={card.src} alt={card.title} loading="lazy" decoding="async"/>
      {isActive && <span className="apple-project-card-glare"/>}
    </motion.button>
  </>;
}
