import React from 'react';
import HotNovel from '../Component/HotNovel.js';
import Aside from '../Component/Aside.js';
import Blog from '../Component/Blog.js';



export default function Main() {
  return (
    <div>
      <HotNovel />
      <Aside />
      <Blog />
    </div>
  );
}