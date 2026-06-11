import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AccentContext } from './accent';

const CARD_WIDTH = 300;
const CARD_MAX_HEIGHT = 260;

interface Position {
  top?: number;
  bottom?: number;
  left: number;
  flip: boolean;
}

interface Props {
  card: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function HoverCard({ card, children, className }: Props) {
  const accent = useContext(AccentContext);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Position | null>(null);

  // The flip decision assumes CARD_MAX_HEIGHT; re-clamp with the real height once rendered.
  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!pos || !el) return;
    const limit = window.innerHeight - 12 - el.offsetHeight;
    if (pos.top !== undefined) {
      const top = Math.max(12, Math.min(pos.top, limit));
      if (top !== pos.top) setPos({ ...pos, top });
    } else if (pos.bottom !== undefined) {
      const bottom = Math.max(12, Math.min(pos.bottom, limit));
      if (bottom !== pos.bottom) setPos({ ...pos, bottom });
    }
  }, [pos]);

  const open = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - CARD_WIDTH / 2, 12),
      window.innerWidth - CARD_WIDTH - 12,
    );
    const flip = rect.bottom + CARD_MAX_HEIGHT + 16 > window.innerHeight;
    setPos(
      flip
        ? { bottom: window.innerHeight - rect.top + 8, left, flip }
        : { top: rect.bottom + 8, left, flip },
    );
  };

  const close = () => setPos(null);

  return (
    <div
      ref={triggerRef}
      className={`hover-target${className ? ` ${className}` : ''}`}
      tabIndex={0}
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={close}
    >
      {children}
      {createPortal(
        <AnimatePresence>
          {pos && (
            <motion.div
              ref={cardRef}
              className="hover-card"
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                '--accent': accent,
              }}
              initial={{ opacity: 0, y: pos.flip ? -4 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.13 }}
            >
              {card}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
