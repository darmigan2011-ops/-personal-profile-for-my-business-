import { useEffect, useState } from 'react';

interface TypewriterResult {
  displayed: string;
  done: boolean;
}

/**
 * Typewriter hook — reveals one character at a time after a start delay.
 *
 * @param text - The string to type out
 * @param speed - Milliseconds between characters (default: 38)
 * @param startDelay - Milliseconds before typing begins (default: 600)
 */
export function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600,
): TypewriterResult {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    const timeout = window.setTimeout(() => {
      let index = 0;
      const interval = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);

      return () => window.clearInterval(interval);
    }, startDelay);

    return () => window.clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}
