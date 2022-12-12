import Image from 'next/image'
import { useState } from 'react';
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';


const updateProductVal = gql`
  mutation UpdateProduct($body: Update) {
		updateProduct(body: $body) {
			_id
			name
			description
			brand {
				_id
				name
				description
				image
			}
			category {
				_id
				name
				description
				image
			}
			price
			stock
			image
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
	_id: string,
	name: string,
	description: string,
	price: number,
	stock: number,
	image: string,
	brand: string,
	category: Array<string>
	
}

export default function ProductForm(props: any) {
	let image = `/image/${props.data.image}`
	const [updateProduct, { data, loading: updateLoading, error: updateError }] = useMutation(updateProductVal)
	const { loading: brandsLoading, error: brandsError, data: brandsData } = useQuery(getBrands);
	const {loading: categoryLoading, error: categoryError, data: categoryData } = useQuery(getCategories)
	const [inputs, setInputs] = useState<product>({ _id: props.data._id, name: props.data.name, description: props.data.description, price: props.data.price, stock: props.data.stock, image: props.data.image, brand: props.data.brand._id, category: props.data.category.map((p: any) => { return p._id }) })
	
	const handleChange = (event: any) => {
		if (event.target.name == 'category'){
			const name = event.target.name
			const value = [...event.target.selectedOptions].map(o => o.value)
			setInputs(values => ({...values, [name]: value}))
		}else{
			const name = event.target.name
			const value = event.target.value	
			setInputs(values => ({ ...values, [name]: value }))
		}
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()
		
		updateProduct({
			variables: {
				body: {
					name: inputs.name,
					description: inputs.description,
					price: Number(inputs.price),
					stock: Number(inputs.stock),
					_id: props.data._id,
					image: inputs.image,
					brand: inputs.brand,
					category: inputs.category
				}
			}
		})
	}
	if (brandsLoading || updateLoading || categoryLoading) return <p>Bekleyin</p>
	if (brandsError || updateError || categoryError) return <p>Hata</p>
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-5'>
					<Image src={image} width={400} height={400} alt="product image" />
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
								brandsData.getAllBrands.map((p: any) => {
									return (
										<option key={p._id} value={p._id}>{p.name}</option>
									)
								})
							}
						</select>
						<label className='form-label'>Product Categories</label>
						<select className='form-control' name='category' onChange={handleChange} multiple>
							{
								categoryData.getAllCategories.map((p: any) => {
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
	)
}

