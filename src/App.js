import React from 'react';
import { Normalize } from '@smooth-ui/core-sc';
import styled from 'styled-components';

import SearchInput from './components/SearchInput';
import Result from './components/Result';
import MovieSearch from './components/MovieSearch';
import Catch from './components/Catch';
// import Menu from './components/Menu';
// import Language from './components/Language';
import { useI18n } from './hooks/I18nProvider';
import useDebounce from './hooks/useDebounce';
import useEventListener from './hooks/useEventListener';
import useActiveKeys from './hooks/useActiveKeys';
import useShortcutEffect from './hooks/useShortcutEffect';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const Menu = styled.div`
  position: absolute;
  right: 10px;
`;

function init(initial) {
  return { query: initial }
}

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return { query: action.value };
    case 'reset':
      return init('');
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

const initialQuery = '';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialQuery, init);

  const [activeKeys, setActiveKeys] = useActiveKeys();

  useEventListener(window, 'keydown', e => {
    setActiveKeys(e.keyCode, 'add');
  });
  
  useEventListener(window, 'keyup', e => {
    setActiveKeys(e.keyCode, 'remove');
  }); 

  const debouncedQuery = useDebounce(state.query, 250);
  const i18n = useI18n();
  // one responsibility per ref, not 1 object with loads of things.
  // If you pass a function like a callback it's good to store it in a ref too.
  const inputRef = React.useRef();

  // React.useEffect(() => {
  //   // If using a primitive like number/string
  //   // then you could use React.useRef instead as otherwise
  //   // they won't update. This is good because it will return the same value. Or you could just make it an object.
  //   if (inputRef.current) {
  //     // Alternatively could have an autofocus prop
  //     // inside the SearchInput.
  //     inputRef.current.focus();
  //   }
  // }, [inputRef]);

  useShortcutEffect([18, 70], () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  })

  const isFrench = i18n.locale === 'fr';

  return (
    <React.Fragment>
      <Normalize />
      <Menu>
        <button value={ isFrench ? 'en' : 'fr' } onClick={ (e) => i18n.setLocale(e.target.value) }>
          { isFrench ? '🇬🇧' : '🇫🇷' }
        </button>
      </Menu>
      <Wrapper>
        <SearchInput
          ref={ inputRef }
          value={ state.query } 
          onChange={ (event) => dispatch({ 
            type: 'update', 
            value: event.target.value
          }) } 
        />
      </Wrapper>
      <Wrapper>
        <Row>
          <Catch>
            <MovieSearch query={ debouncedQuery }>
              { ({ error, movies }) => (
                <React.Fragment>
                  { movies.map(result => (
                    <Result
                      key={ result.id }
                      image={ result.poster_path }
                      { ...result }
                    />
                  )) }
                </React.Fragment>
              ) }
            </MovieSearch>
          </Catch>
        </Row>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
