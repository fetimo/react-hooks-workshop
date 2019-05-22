import React from 'react';
import useActiveKeys from './useActiveKeys';

export default function useShortcutEffect(keys, callback) {
  const [activeKeys] = useActiveKeys();

  React.useEffect(() => {
    console.log('effect', activeKeys)
    if (activeKeys.includes(keys)) {
      console.log('callback')
      callback();
    }
  }, [activeKeys, callback, keys])

}