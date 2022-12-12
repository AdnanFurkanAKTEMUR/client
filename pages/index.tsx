import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import FrontLayout from '../components/layout/FrontLayout'
import { useState, useEffect } from 'react';
import Slideshow from '../components/Slideshow'
import CatalogProducts from '../components/CatalogProducts'


type auth = {
  email: string,
  password: string
}

export default function Home() {
  const [user, setUser] = useState<auth>({email:"", password:""})
  const [inputs, setInputs] = useState<auth>({email:"", password:""})

  const handleChange = (e: any)=>{
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e: any) =>{
    e.preventDefault()
    console.log(inputs);
    
    setUser({email:inputs.email, password:inputs.password})
    console.log(user);
    
    localStorage.setItem('user', JSON.stringify(inputs))
  }

  useEffect(() => {
    // @ts-ignore
    const userFrom = JSON.parse(localStorage.getItem('user'))
    if (userFrom) {
      setUser(userFrom)
    }
  }, [])
  if (user.email != "") {
    return (
      <FrontLayout>
        <div className='container'>
          <Slideshow/>
          <CatalogProducts/>
          <Link href={'/admin/product'}>Admin Ürünler</Link>
        </div>
      </FrontLayout>
    )
  } else {
    return (
      <div className='row justify-content-center align-items-center mt-5'>
        <div className='col-md-4'>
          <form className='form' onSubmit={handleSubmit}>
            <label className='form-label'>email</label>
            <input type="text" className='form-control' name='email' onChange={handleChange}/>

            <label className='form-label'>Şifre</label>
            <input className='form-control' type="text" name='password' onChange={handleChange}/>
            <button type='submit' className='btn btn-success'>Gönder</button>
          </form>
        </div>

      </div>
    )
  }
}
