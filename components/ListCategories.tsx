import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/image'
import { gql, useMutation, useQuery } from '@apollo/client';

const deleteCategoryVal = gql`
	mutation Mutation($categoryId: String!) {
		deleteCategory(categoryId: $categoryId) {
			_id
			name
			description
			image
		}
	}
`
const allCategoryQuery = gql`
	query Query {
		getAllCategories {
			_id
			name
			description
			image
		}
	}
`

export default function ListCategories(){
	const [deleteCategory, {data, error, loading}] = useMutation(deleteCategoryVal)
	const { loading: ll, error: rr, data: dt } = useQuery(allCategoryQuery);

	if(loading || ll) return <div>Loading</div>
	if(error || rr) return <div>Error</div>

  return(
    <table className='table'>
			<thead>
				<tr>
					<th>id</th>
					<th>İmage</th>
					<th>Name</th>
					<th>Description</th>
					<th>Delete</th>
					<th>Update</th>
				</tr>
			</thead>
			<tbody>
				{
					dt.getAllCategories.map((c: any) => {
						return(
							<tr key={c._id}>
								<td>{c._id}</td>
								<td><Image src={"/image/"+c.image} width={50} height={50} alt="category image" /></td>
								<td>{c.name}</td>
								<td>{c.description}</td>
								<td><button className='btn btn-danger' onClick={(e) => { 
									deleteCategory({
									variables: {
										categoryId: c._id
									}, refetchQueries: [
										{query:allCategoryQuery}
									]
									
								})
								}} ><FontAwesomeIcon icon={faTrash}/></button></td>
								<td><Link href={`/admin/category/update?categoryId=${c._id}`}> <FontAwesomeIcon icon={faPen} className="text-warning"/> </Link></td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
  )
}