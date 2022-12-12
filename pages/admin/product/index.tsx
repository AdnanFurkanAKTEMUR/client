import { gql, useQuery } from '@apollo/client';
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import Layout from '../../../components/layout/Layout';
import ListProducts from '../../../components/ListProducts';

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


export default function Product() {
  const { data, error, loading } = useQuery(allProductQuery)
  if (loading) return <h1>Bekleyin</h1>
  if (error) return (<div>error</div>)


  return (
    <Layout>
      <div className='border rounded bg-white p-3 m-3'>
        <ListProducts />
        <Link href={"/admin/product/create"} className="btn btn-primary mx-3">Create New Product</Link>
      </div>
    </Layout>
  )
}