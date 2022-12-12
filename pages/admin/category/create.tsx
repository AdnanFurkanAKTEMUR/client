import { useState } from "react"
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image'
import Layout from "../../../components/layout/Layout";


const createCategoryVal = gql`

  mutation CreateCategory($body: createCategory!) {
    createCategory(body: $body) {
      _id
      name
      description
      image
    }
  }

`

type category = {
  name: string,
  description: string,
  image: string
}

export default function Create(){

  const [inputs, setInputs] = useState<category>({name:"", description:"", image:""})
  const [createCategory, {data, loading, error}] = useMutation(createCategoryVal)

  const handleChange = (e: any)=>{
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e: any) =>{
    e.preventDefault()
    createCategory({
      variables:{
        body:{
          name:inputs.name,
          description:inputs.description,
          image:inputs.image
        }
      }
    })
  }

  return(
    <Layout>
      <div className="border rounded bg-white p-3 m-3">
        <div className='row'>
          <div className='col-md-5'>
            <Image src={"/image/"+inputs.image} width={400} height={300} alt="category image" />
          </div>
          <div className='col-md-7'>
            <form onSubmit={handleSubmit} className='form'>
              <label className='form-label'>Category Name</label>
              <input className='form-control' name='name' type='text' value={inputs.name} onChange={handleChange} />
              <label className='form-label'>Category Description</label>
              <input className='form-control' name='description' type='text' value={inputs.description} onChange={handleChange} />
              <label className='form-label'>Category image</label>
              <input className='form-control' name='image' type='text' value={inputs.image} onChange={handleChange} />
              <button type="submit" className="btn btn-success mt-2">Gönder</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}