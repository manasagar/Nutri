import React from 'react'
import { useState,useEffect } from 'react';
import { Loading } from '../components/Loading';
import '../styles/signup.css';
import { BackButton } from '../components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Blogcreate = () => {
    const [blogForm,setBlogForm] = useState(
        {
            author:"",
            title:"",
            description:"",
            content:""
        }
    )
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e)=>{
        e.preventDefault();
        const submitData = async()=>{
            try {
              setLoading(true);
              const response = await axios.post('/api/blogs/create',blogForm);
              console.log(response.data);
              navigate('/blogs');
            } catch (error) {
              console.log(error);
              setError(error.response.data.data);
            }
            finally{
              setLoading(false);
            }
        }
        submitData();
      }

    const onChangeHandler =(e)=>{
        const {name,value} = e.target;
        setBlogForm((prevData)=>{
          return {
            ...prevData,
            [name] : value
          }
        })
      }


  return (
    <div className='signup_outer'>
    {loading && <Loading />}
    <BackButton />
    <div className='signup-main-container'>
      <div className="signup-container">
        <h1 className='signup-h1'>Write a Blog</h1>
        <form className='signup-form' onSubmit={handleSubmit}>
          <input
            className='signup-input'
            type="text"
            placeholder='Enter your Name'
            name="author"
            value={blogForm.author}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <br />
          <input
            className='signup-input'
            type="text"
            placeholder='Enter Title'
            name="title"
            value={blogForm.title}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <br />
          <input
            className='signup-input'
            placeholder='Enter Description'
            type="text"
            name="description"
            value={blogForm.description}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <br />
          <input
            className='signup-input'
            placeholder='Enter your content to post #NutriPlanner'
            type="text"
            name="content"
            value={blogForm.content}
            onChange={onChangeHandler}
            autoComplete="off"
            required
          />
          <br />
          {error && <p className="error">{error}</p>}
          <div className="signup-wrapper">
          <button className='signup-btn' disabled={loading}>Create</button>
          </div>
        </form>
     </div>
    </div>
    </div>
  )
}
