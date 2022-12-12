import { useState } from "react"
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image'
import Layout from "../../../components/layout/Layout";

const createUserVal = gql`
  mutation Mutation($body: Create) {
    createUser(body: $body) {
      _id
      name
      surname
      phone
      email
      address
    }
  }
`

type user = {
  name: string,
  surname: string,
  phone: string,
  email: string,
  address: string
}

export default function Create(){
  const [inputs, setInputs] = useState<user>({name:"", surname:"", phone:"", email:"", address:""})
  const [createUser, {data, loading, error}] = useMutation(createUserVal)

  const handleChange = (e: any)=>{
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e: any) =>{
    e.preventDefault()
    createUser({
      variables:{
        body:{
          name:inputs.name,
          description:inputs.surname,
          image:inputs.phone,
          email:inputs.email,
          address:inputs.address
        }
      }
    })
  }

  return(
    <Layout>
      <div className="border rounded bg-white p-3 m-3">
        <div className='row'>
          <div className='col-md-5'>
            <Image src={"/image/noimage.jpg"} width={400} height={300} alt="user image" />
          </div>
          <div className='col-md-7'>
            <form onSubmit={handleSubmit} className='form'>
              <label className='form-label'>Name</label>
              <input className='form-control' name='name' type='text' value={inputs.name} onChange={handleChange} />

              <label className='form-label'>Description</label>
              <input className='form-control' name='surname' type='text' value={inputs.surname} onChange={handleChange} />
              
              <label className='form-label'>Phone</label>
              <input className='form-control' name='phone' type='text' value={inputs.phone} onChange={handleChange} />

              <label className='form-label'>E-mail</label>
              <input className='form-control' name='email' type='text' value={inputs.email} onChange={handleChange} />

              <label className='form-label'>Address</label>
              <input className='form-control' name='address' type='text' value={inputs.address} onChange={handleChange} />
              
              <button type="submit" className="btn btn-success mt-2">Gönder</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}