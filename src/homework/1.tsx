import React, { useEffect, useRef } from 'react';

// Опишіть Props

type Props = {
  onContentEndVisible(): void;
  children: React.ReactNode;
}

type IntersectionOptions = {
    rootMargin: string,
      threshold: number,
      root: Element | Document | null,
}

export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options:IntersectionOptions = {
      rootMargin: '0px',
      threshold: 1.0,
      root: null,
    }; //навіщо згадується клас в завданні?

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
