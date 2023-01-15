import React from 'react';

const defaultXY:{x:number|null, y:number|null} = {x:null, y:null}
const useMousePosition = () => {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState(defaultXY);
  React.useEffect(() => {
    const updateMousePosition = (ev:WindowEventMap['mousemove']) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
