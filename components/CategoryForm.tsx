import Image from 'next/image'
import { useState } from 'react';
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';


const updateCategoryVal = gql`
  mutation UpdateCategory($body: updateCategory) {
    updateCategory(body: $body) {
      _id
      name
      description
      image
    }
  }
`
type category = {
	_id: string,
	name: string,
	description: string,
	image: string
}

export default function CategoryForm(props: any) {
	//let image = `/image/${props.product.image}.jpg`
	const [updateCategory, { data, loading: updateLoading, error: updateError }] = useMutation(updateCategoryVal)
	const [inputs, setInputs] = useState<category>({ _id: props.data._id, name: props.data.name, description: props.data.description, image: props.data.image})
	
	const handleChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value	
    setInputs(values => ({ ...values, [name]: value }))
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()
		
		updateCategory({
			variables: {
				body: {
          _id: inputs._id,
					name: inputs.name,
					description: inputs.description,
					image: inputs.image
				}
			}
		})
	}
	if (updateLoading) return <p></p>
	if (updateError) return <p>Hata</p>
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-5'>
					<Image src={"/image/"+inputs.image} width={400} height={300} alt="category image" />
				</div>
				<div className='col-md-7'>
					<form onSubmit={handleSubmit} className='form'>
						<label className='form-label'>Name</label>
						<input className='form-control' name='name' type='text' value={inputs.name} onChange={handleChange} />
						<label className='form-label'>Description</label>
						<input className='form-control' name='description' type='text' value={inputs.description} onChange={handleChange} />
					  <label className='form-label'>Image</label>
						<input className='form-control' name='image' type='text' value={inputs.image} onChange={handleChange} />
						<button type="submit" className="btn btn-success mt-2">Gönder</button>
					</form>
				</div>
			</div>
		</div>
	)
}

