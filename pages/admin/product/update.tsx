import Image from 'next/image'
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import ProductForm from '../../../components/ProductForm'
import Layout from '../../../components/layout/Layout';


const getProduct = gql`
   query Query($productId: String!) {
			getProduct(productId: $productId) {
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

export default function Product() {
	//let image = `/image/${props.product.image}.jpg`
	const router = useRouter()
	const productId = router.query.productId
	const { loading, error, data } = useQuery(getProduct, {
    variables: { productId }
  });

	if(loading) return <p>Bekleyin</p>
	if(error) return <p>error</p>
	return (
		<Layout>
			<div className='border rounded bg-white p-3 m-3'>
				<ProductForm data={data.getProduct} />
				</div>
		</Layout>	
	)
}

