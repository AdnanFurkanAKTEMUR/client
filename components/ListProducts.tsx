import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/image'
import { gql, useQuery, useMutation } from '@apollo/client';

const allProductQuery = gql`
    query Query {
        getAllProducts {
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
const deleteProductVal = gql`
	mutation Mutation($productId: String!) {
		deleteProduct(productId: $productId) {
			_id
		}
	}
`

export default function ListProducts() {
	const {data: dataQuery, error: errorQuery, loading: loadingQuery} = useQuery(allProductQuery)
	const [deleteProduct, {data, error, loading}] = useMutation(deleteProductVal)

	if(loadingQuery || loading) return <div>Loading</div>
	if(errorQuery || error) return <div>Error</div>
	return (
		<table className='table'>
			<thead>
				<tr>
					<th>id</th>
					<th>İmage</th>
					<th>Name</th>
					<th>Category</th>
					<th>Brand</th>
					<th>Stock</th>
					<th>Price</th>
					<th>Delete</th>
					<th>Update</th>
				</tr>
			</thead>
			<tbody>
				{
					dataQuery.getAllProducts.map((p: any) => {
						return(
							<tr key={p._id}>
								<td>{p._id}</td>
								<td><Image src={'/image/'+p.image} width={50} height={50} alt="product image" /></td>
								<td>{p.name}</td>
								<td>{p.category[0].name}</td>
								<td>{p.brand.name}</td>
								<td>{p.stock}</td>
								<td>{p.price}</td>
								<td>  
									<button className='btn btn-danger' onClick={(e) => { 
                    deleteProduct({
                    variables: {
                      brandId: p._id
                    }, refetchQueries: [
                      {query:allProductQuery}
                    ]
                  })
                  }} ><FontAwesomeIcon icon={faTrash}/></button></td>
								<td><Link href={`/admin/product/update?productId=${p._id}`}> <FontAwesomeIcon icon={faPen} /> </Link></td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
	)
}

