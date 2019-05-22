import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import styled from 'styled-components';

import { useT } from '../hooks/I18nProvider';


const Input = styled.input`
  width: 100%;
  background-color: #fff;
  border: 0;
  font-size: 1.6em;
  padding: 0.6em 0;
  color: #333;
  outline: none;
  border-bottom: 2px solid;
  margin-bottom: 2em;
`;

export default forwardRef(function SearchInput(props, ref) {
  // This is the internal ref
  const inputRef = useRef();

  const t = useT;
  // ref is the external button.
  // It restricts methods so only the ones listed will work.
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return (
    <React.Fragment>
      <Input
        type='search'
        ref={ inputRef }
        placeholder={ t('placeholder') }
        { ...props }
      />
    </React.Fragment>
  );
})

// i r controlled component
const SearchInput = (props) => {
  const t = useT;
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, []);

  return (
    <React.Fragment>
      <Input 
        type='search'
        ref={ inputRef }
        placeholder={ t('placeholder') }
        { ...props }
      />
    </React.Fragment>
  );
}

// export default SearchInput;