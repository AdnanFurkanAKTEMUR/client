import Image from 'next/image'
import { useState } from 'react';
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import Layout from '../../../components/layout/Layout';

const createProductVal = gql`
  mutation CreateProduct($body: createProduct) {
    createProduct(body: $body) {
      _id
      name
      description
      category {
        _id
        name
        description
        image
      }
      price
      stock
      image
      brand {
        _id
        name
        description
        image
      }
    }
  }
`

const getBrands = gql`
    query GetAllBrands {
        getAllBrands {
            _id
            name
        }
    }
`

const getCategories = gql`
    query Query {
			getAllCategories {
				_id
				name
			}
		}
`

type product = {
  name: string,
  description: string,
  price: number,
  stock: number,
  image: string,
  brand: string,
  category: Array<string>

}

export default function Create() {
  const [createProduct, { data: cData, loading: cLoading, error: cError }] = useMutation(createProductVal)
  const { data: bData, loading: bLoading, error: bError } = useQuery(getBrands)
  const { data: caData, loading: caLoading, error: caError } = useQuery(getCategories)
  const [inputs, setInputs] = useState<product>({ name: "", description: "", price: 0, stock: 0, image: "", brand: "", category: [""] })

  const handleChange = (event: any) => {
    if (event.target.name == 'category') {
      const name = event.target.name
      const value = [...event.target.selectedOptions].map(o => o.value)
      setInputs(values => ({ ...values, [name]: value }))
    } else {
      const name = event.target.name
      const value = event.target.value
      setInputs(values => ({ ...values, [name]: value }))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    createProduct({
      variables: {
        body: {
          name: inputs.name,
          description: inputs.description,
          price: Number(inputs.price),
          stock: Number(inputs.stock),
          image: inputs.image,
          brand: inputs.brand,
          category: inputs.category
        }
      }
    })
  }
  if (cLoading || bLoading || caLoading) return <div>Loading...</div>
  if (cError || bError || caError) return <div>Error...</div>

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <Image src={"/image/"+inputs.image} width={400} height={400} alt="product image" />
          </div>
          <div className='col-md-7'>
            <form onSubmit={handleSubmit} className='form'>
              <label className='form-label'>Product Name</label>
              <input className='form-control' name='name' type='text' value={inputs.name} onChange={handleChange} />
              <label className='form-label'>Product Description</label>
              <input className='form-control' name='description' type='text' value={inputs.description} onChange={handleChange} />
              <label className='form-label'>Product Price</label>
              <input className='form-control' name='price' type='number' value={inputs.price} onChange={handleChange} />
              <label className='form-label'>Product Stock</label>
              <input className='form-control' name='stock' type='number' value={inputs.stock} onChange={handleChange} />
              <label className='form-label'>Product Image</label>
              <input className='form-control' name='image' type='text' value={inputs.image} onChange={handleChange} />
              <label className='form-label'>Brand</label>
              <select className="form-control" name="brand" value={inputs.brand} onChange={handleChange}>
                {
                  bData.getAllBrands.map((p: any) => {
                    return (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    )
                  })
                }
              </select>
              <label className='form-label'>Product Categories</label>
              <select className='form-control' name='category' onChange={handleChange} multiple>
                {
                  caData.getAllCategories.map((p: any) => {
                    return (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    )
                  })
                }
              </select>
              <button type="submit" className="btn btn-success mt-2">Gönder</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}