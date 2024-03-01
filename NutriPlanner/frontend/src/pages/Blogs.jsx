import React, { useEffect, useState } from 'react'
import { BackButton } from '../components/BackButton'
import axios from 'axios';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';


export const Blogs = () => {
  const [blog,setBlog] = useState([]);
  const navigate = useNavigate();

  const handleCreate = () =>{
    navigate('/blogs/create');
  }

  const handleClick = (id) =>{
    const findBlog = blog.find((obj)=>{
      return obj.id === id;
    })
      navigate('/blogs/detail',{
        state:{
          output : findBlog
        }
    });
  }

  useEffect(()=>{
    const getBlog = async()=>{
      try {
        const response = await axios.get('/api/blogs/all');
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBlog();
  },[])


  const cardBlog = blog.map((obj,ind)=>{
    return (
      <div key={obj.id}>
        <p>{obj.title}</p>
        <p>{obj.description}</p>
        <p>{obj.author}</p>
        <button onClick={() => handleClick(obj.id)}>Read in Detail</button>
      </div>
    )
  })

  return (
    <div>
      <BackButton />
      <div>
        <h1>Blogs Nutrition</h1>
        <button onClick={handleCreate}>Create Post</button>
        {cardBlog}
      </div>
    </div>
  )
}
