import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scroller = document.getElementById("scroller");
    scroller?.scrollIntoView({
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
