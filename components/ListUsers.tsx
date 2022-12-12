import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/image'
import { gql, useMutation, useQuery } from '@apollo/client';

const deleteUserVal = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId) {
      _id
    }
  }
`
const getAllUsers = gql`
  query Query {
    getAllUsers {
      _id
      name
      surname
      phone
      email
      address
    }
  }
`

export default function ListUsers(){
  const {data: qData, error: qError, loading: qLoading} = useQuery(getAllUsers)
  const [deleteUser, {data: mData, error: mError, loading: mLoading}] = useMutation(deleteUserVal)

  if(qLoading || mLoading) return <div>Loading</div>
  if(qError || mError) return <div>Error</div>
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {
          qData?.getAllUsers?.map((u: any) => {
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.surname}</td>
              <td>{u.phone}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>
                <button className='btn btn-danger' onClick={
                  (e) => {
                    deleteUser({
                      variables: {
                        userId: u._id
                      },
                      refetchQueries: [
                        {query: getAllUsers}
                      ]
                    })
                  }
                }>
                  <FontAwesomeIcon icon={faTrash}/>
                </button>
              </td>
              <td>
                <Link href={`/admin/category/update?categoryId=${u._id}`}> <FontAwesomeIcon icon={faPen} className="text-warning"/> </Link>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}