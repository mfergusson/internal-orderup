import { createContext, useState, useEffect, useContext } from 'react';
import { smallMobileBreakpoint, mobileBreakpoint, tabletBreakpoint, desktopBreakpoint } from '../constants/breakpoints';

const ViewportContext = createContext({ height: 0, width: 0 });

export const ViewPortProvider = ({ children }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  /* Now we are dealing with a context instead of a Hook, so instead
     of returning the width and height we store the values in the
     value of the Provider */
  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
};

/* Rewrite the "useViewport" hook to pull the width and height values
   out of the context instead of calculating them itself */
export const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  const { width, height } = useContext(ViewportContext);
  const isSmallMobile = width <= smallMobileBreakpoint;
  const isMobile = width <= mobileBreakpoint;
  const isTablet = width <= tabletBreakpoint && width > mobileBreakpoint;
  const isDesktop = width <= desktopBreakpoint && width > tabletBreakpoint;
  const isLargeDesktop = width > desktopBreakpoint;

  return { isSmallMobile, isMobile, isTablet, isDesktop, isLargeDesktop };
}