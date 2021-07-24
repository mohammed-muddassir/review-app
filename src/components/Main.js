import React,{useState,useEffect} from 'react'
import Axios from'axios';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md'
import * as aiIcons from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';
import './Main.css'/* 
const {v4:uuidv4}=require('uuid') */
function Main() {
    const [aName,setName]=useState('');
    const [aReview,setReview]=useState('');
    const [sub,setSub]=useState(false);
    const[showrev,setshow]=useState(true)
    const [a_id,setId]=useState('');
    const [newRev,setNewrev]=useState('')
    const [aList,setList]=useState([]);

    const handleSubmit=()=>{
        if(!aName||!aReview){
            alert('Give some input')
        }
        else{
        const ident=uuidv4()
        setId(ident)
        /* alert(`Anime Name:${aName}\nAnime Review:${aReview}`); */
        setSub(!sub);
        setList([...aList,{
            an_id:ident,
            anime:aName,
            review:aReview
        }])
        console.log(ident)
        Axios.post('http://localhost:5000/api/insert',{user_id:ident,Anime_Name:aName,Anime_Review:aReview})
      }
      window.location.reload()
      
       
    }
    const handleDelete=(id)=>{
        Axios.delete(`http://localhost:5000/api/delete/${id}`);
       
       /*  Axios.get('http://localhost:5000/api/get').then((resp)=>{
          setList(resp.data);
          console.log(aList)
    }) */

   
    console.log('clicked')
    window.location.reload()
  
       
    }
   /*  const handleEdit=(id)=>{
      setshow(!showrev)
       

    } */
    const handleEdit=(id,rev)=>{
      /* const identity=uuidv4(); */
      setshow(!showrev)
      if(!newRev){
        setNewrev(rev)
      }
      else{
        Axios.put(`http://localhost:5000/api/update/${id}`,{
          an_id:id,
          anime:aName,
          review:newRev
      })
      }
      
    

  /* setshow(!showrev); */
  window.location.reload();

    }
    useEffect(()=>{
       Axios.get('http://localhost:5000/api/get').then((response)=>{
          setList(response.data)
    })
     } ,[])

   console.log('x')

    return (
        <div className="main-container">
          <div className="main-wrapper">
            <div className='main-head'>
                 <h3>Anime Review</h3>
            </div>
            <div className='main-input'>

                <input type='text' placeholder='Anime name' onChange={(e)=>{setName(e.target.value)}}></input>
                <textarea type='text' placeholder='User-sama, Give your review ' onChange={(e)=>{setReview(e.target.value)}}></textarea>
                
                <button className='main-btn' type='submit' onClick={handleSubmit}>Submit</button>

            </div>
            </div>
            {aList&&<div className='review-container'>
            { aList.map((val)=>{
                return (
                    <div className="review-wrapper" key={val.an_id}>
                            <div className="reviews" >
                              <div className='rev-head'>
                                <h3>{val.anime}</h3>
                                <aiIcons.AiFillDelete className='trash' onClick={()=>{handleDelete(val.an_id)}}></aiIcons.AiFillDelete>
                              </div>
                              <div className='rev-main'>
                             
                              <div>
                              <input style={{color:"rgb(80, 14, 94)"}} type='text' placeholder={val.review} onChange={(e)=>{setNewrev(e.target.value)}} className='inp-rev'></input>
                             { /* <MdIcons.MdDone onClick={()=>{handleRev()}}></MdIcons.MdDone> */}
                              </div>
                        
                             <FaIcons.FaEdit className='edit' onClick={()=>{handleEdit(val.an_id,val.review)}}/>
                            </div>
                            </div>
                    </div>
                    )
            })}
            </div>}
            
        </div>
    )
}

export default Main
