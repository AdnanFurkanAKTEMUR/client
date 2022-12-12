import Layout from "../../../components/layout/Layout";
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import BrandForm from '../../../components/BrandForm';

const getBrand = gql`
  query GetBrand($brandId: ID!) {
    getBrand(brandId: $brandId) {
      _id
      name
      description
      image
    }
  }
`

export default function Update() {
  const router = useRouter()
  const brandId = router.query.brandId
  const { data, loading, error } = useQuery(getBrand, {
    variables: { brandId }
  })
  if (loading) return <div></div>
  if (error) return <div>Error</div>
  return (
    <Layout>
      <div className='border rounded bg-white p-3 m-3'>
        <BrandForm data={data.getBrand} />
      </div>
    </Layout>
  )
}