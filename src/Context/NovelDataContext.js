// NovelDataContext.js
import React, { createContext, useContext } from 'react';
import NovelData from '../Component/image/NovelData';

const NovelDataContext = createContext();

export const useNovelData = () => {
  return useContext(NovelDataContext);
};

export const NovelDataProvider = ({ children }) => {
  return (
    <NovelDataContext.Provider value={NovelData}>
      {children}
    </NovelDataContext.Provider>
  );
};
