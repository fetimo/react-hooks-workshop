import React from 'react';

export default function useActiveKeys(key, type) {
  const [activeKeys, setActiveKeys] = React.useState([]);

  React.useEffect(() => {
    if (type === 'add') {
      setActiveKeys([...activeKeys, key])
    } else if (type === 'remove') {
      const index = activeKeys.indexOf(key);
      const newActiveKeys = activeKeys.splice(index, 1);
      setActiveKeys(newActiveKeys)
    } else {
      console.warn('Unknown type: ' + type);
    }
    console.log(activeKeys)
  }, [type, activeKeys, key])

  
  return [activeKeys, setActiveKeys];
}