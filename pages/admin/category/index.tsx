import Layout from '../../../components/layout/Layout';
import ListCategories from '../../../components/ListCategories'
import Link from 'next/link';


export default function Category(){

  return(
    <Layout>
      <div className='border rounded bg-white p-3 m-3'>
        <ListCategories />
        <Link href={"/admin/category/create"} className="btn btn-primary mx-3">Create New Category</Link>
      </div>
    </Layout>
  )
}