import React from 'react'
import { useLocation } from 'react-router-dom'
import { BackButton } from '../components/BackButton';
import '../styles/blogdetail.css';

export const Blogdetail = () => {

    const location = useLocation();
    const blog = location.state.output;

  return (
    <div>
      <BackButton />
      <div className='blog-detail-container'>
        <p>{blog.title}</p>
        <p>{blog.description}</p>
        <p>{blog.content}</p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}
