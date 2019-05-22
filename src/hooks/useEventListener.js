import React from 'react';

export default function useEventListener(target, type, listener) {
  const ref = React.useRef();
  ref.current = listener;

  React.useEffect(() => {
    const handleEvent = event => ref.current(event);
    target.addEventListener(type, handleEvent);
  }, [target, type])

  return () => {
    target.removeEventListener(type, listener)
  };
}