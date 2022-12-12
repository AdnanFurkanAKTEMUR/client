import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import CategoryForm from '../../../components/CategoryForm';
import Layout from '../../../components/layout/Layout';


const getCategory = gql`
   query GetCategory($categoryId: String!) {
    getCategory(categoryId: $categoryId) {
      _id
      name
      description
      image
    }
  }
`

export default function Product() {
	//let image = `/image/${props.product.image}.jpg`
	const router = useRouter()
	const categoryId = router.query.categoryId
	const { loading, error, data } = useQuery(getCategory, {
    variables: { categoryId }
  });

	if(loading) return <p>Bekleyin</p>
	if(error) return <p>error</p>
	return (
    <Layout>
      <div className='border rounded bg-white p-3 m-3'>
        <CategoryForm data={data.getCategory} />
      </div>
    </Layout>
	)
}

