import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';
import ListBrands from '../../../components/ListBrands';

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

export default function Brand(){

  const {data, loading, error} = useQuery(getAllBrands)
  if(loading) return <div></div>
  if(error) return <div>Error</div>
  return(
    <Layout>
      <div className='border rounded bg-white p-3 m-3'>
        <ListBrands />
        <Link href={"/admin/brand/create"} className="btn btn-primary mx-3">Create New Brand</Link>
      </div>
    </Layout>
  )
}