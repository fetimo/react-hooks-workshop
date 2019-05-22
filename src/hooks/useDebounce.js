import React from 'react';

export default function useDebounce(value, delay) {
  const [newValue, setNewValue ] = React.useState(value);
  
  React.useEffect(()=> {
    const id = setTimeout(() => setNewValue(value), delay);
    
    return () => {
      clearTimeout(id);
    }
  }, [value, delay]);

  return newValue;
}