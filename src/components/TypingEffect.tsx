import { useState, useEffect } from "react";

const phrases = [
  "cybersecurity enthusiast",
  "penetration tester",
  "CTF player",
  "bug bounty hunter",
  "red teamer",
];

const TypingEffect = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentChar < phrase.length) {
            setCurrentChar((c) => c + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentChar > 0) {
            setCurrentChar((c) => c - 1);
          } else {
            setIsDeleting(false);
            setCurrentPhrase((p) => (p + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [currentChar, isDeleting, currentPhrase]);

  return (
    <span className="text-muted-foreground text-lg">
      cryptokiddo&gt; <span className="text-primary">{phrases[currentPhrase].slice(0, currentChar)}</span>
      <span className="animate-blink text-primary">|</span>
    </span>
  );
};

export default TypingEffect;
