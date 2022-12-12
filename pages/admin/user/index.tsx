import Layout from "../../../components/layout/Layout";
import ListUsers from "../../../components/ListUsers";
import Link from 'next/link';

export default function Index(){

  return (
    <Layout>
      <div className='border rounded bg-white p-3 m-3'>
        <ListUsers />
        <Link href={"/admin/user/create"} className="btn btn-primary mx-3">Create New User</Link>
      </div>
    </Layout>
  )
}