import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref) {
      if (ref.current) {
        if (!(ref.current as any).contains(event.target)) {
          setIsComponentVisible(false);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
