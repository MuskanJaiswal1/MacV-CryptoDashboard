// SearchStore.js
import { create } from 'zustand';
import { debounce } from 'lodash';

const useSearchStore = create((set) => {
  let debouncedSetQuery = debounce((query) => set({ debouncedQuery: query }), 1000);

  return {
    query: '',
    debouncedQuery: '',
    setQuery: (query) => {
      set({ query });
      debouncedSetQuery(query);
    },
  };
});

export default useSearchStore;