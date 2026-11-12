/**
 * Tweens a number on requestAnimationFrame, timed by the motion tokens. For islands that show a
 * changing amount (the FeeCalculator result). Returns a function that stops the tween.
 * With reduced motion it jumps straight to the end.
 */
import { cubicBezier } from 'motion';
import { motion } from '../../tokens/tokens';

const ease = cubicBezier(...motion.ease.expo);

export function tweenNumber(from: number, to: number, onUpdate: (value: number) => void): () => void {
  if (from === to || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onUpdate(to);
    return () => {};
  }
  const duration = motion.duration.slow * 1000;
  const start = performance.now();
  let frame = requestAnimationFrame(function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    onUpdate(from + (to - from) * ease(progress));
    if (progress < 1) frame = requestAnimationFrame(tick);
  });
  return () => cancelAnimationFrame(frame);
}
