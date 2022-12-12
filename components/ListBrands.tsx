import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/image'
import { gql, useQuery, useMutation } from '@apollo/client';

const getAllBrands = gql`
  query GetAllBrands {
    getAllBrands {
      _id
      name
      description
      image
    }
  }
`

const deleteBr = gql`
  mutation Mutation($brandId: String!) {
    deleteBrand(brandId: $brandId) {
      _id
      name
      description
      image
    }
  }
`

export default function ListBrands() {
  const [deleteBrand, {data, error, loading}] = useMutation(deleteBr)
  const {data: brandsData, loading: brandsLoading, error: brandsError} = useQuery(getAllBrands)
  if(brandsLoading) return <div></div>
  if(brandsError) return <div>Error</div>
  return (
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
          brandsData.getAllBrands.map((b: any) => {
            return (
              <tr key={b._id}>
                <td>{b._id}</td>
                <td><Image src={"/image/" + b.image} width={50} height={50} alt="category image" /></td>
                <td>{b.name}</td>
                <td>{b.description}</td>
                <td>
                  <button className='btn btn-danger' onClick={(e) => { 
                    deleteBrand({
                    variables: {
                      brandId: b._id
                    }, refetchQueries: [
                      {query:getAllBrands}
                    ]
                    
                  })
                  }} ><FontAwesomeIcon icon={faTrash}/></button>
                </td>
                <td><Link href={`/admin/brand/update?brandId=${b._id}`}> <FontAwesomeIcon icon={faPen} /> </Link></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}