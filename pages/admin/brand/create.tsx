import { useState } from "react"
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image'
import Layout from "../../../components/layout/Layout";



const createBrandVal = gql`
  mutation CreateBrand($body: createBrand!) {
    createBrand(body: $body) {
      _id
      name
      description
      image
    }
  }
`
type brand = {
  name: string,
  description: string,
  image: string
}

export default function Create(){
  const [inputs, setInputs] = useState<brand>({name:"", description:"", image:""})
  const [createBrand, {data, loading, error}] = useMutation(createBrandVal)

  const handleChange = (e: any)=>{
    const name = e.target.name
    const value = e.target.value
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (e: any) =>{
    e.preventDefault()
    await createBrand({
      variables:{
        body:{
          name:inputs.name,
          description:inputs.description,
          image:inputs.image
        }
      }
    })
    setInputs({name:"", description:"", image:""})
  }
  return(
    <Layout>
      <div className="border rounded bg-white p-3 m-3">
        <div className='row'>
          <div className='col-md-5'>
            <Image src={"/image/"+inputs.image} width={400} height={300} alt="brand image" />
          </div>
          <div className='col-md-7'>
            <form onSubmit={handleSubmit} className='form'>
              <label className='form-label'>Name</label>
              <input className='form-control' name='name' type='text' value={inputs.name} onChange={handleChange} />
              <label className='form-label'>Description</label>
              <input className='form-control' name='description' type='text' value={inputs.description} onChange={handleChange} />
              <label className='form-label'>image</label>
              <input className='form-control' name='image' type='text' value={inputs.image} onChange={handleChange} />
              <button type="submit" className="btn btn-success mt-2">Gönder</button>
            </form>
          </div>
        </div>
      </div> 
    </Layout>
  )
}