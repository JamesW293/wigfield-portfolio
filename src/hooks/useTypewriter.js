import { useState, useEffect, useRef } from 'react';

export function useTypewriter(words, { typeSpeed = 75, deleteSpeed = 45, pauseTime = 2200 } = {}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (pauseRef.current) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, text.length + 1);
        setText(next);
        if (next === currentWord) {
          pauseRef.current = true;
          setTimeout(() => {
            pauseRef.current = false;
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        const next = currentWord.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}
