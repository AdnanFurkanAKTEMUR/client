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

export default function ListProducts() {
  const { data: dataQuery, error: errorQuery, loading: loadingQuery } = useQuery(allProductQuery)

  if (loadingQuery) return <div>Loading</div>
  if (errorQuery) return <div>Error</div>
  return (
    <div className='row mt-5'>
      <div className='bg-dark text-white rounded pt-2'>
        <h1>Ürünler</h1>
      </div>
      {dataQuery.getAllProducts.map((p: any) => {
        return (
          <div className='card col-md-4 mx-2 mt-2' style={{ "width": "18rem" }} key={p._id}>
            <Image src={'/image/'+p.image} width={250} height={250} alt="product image" />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">Marka: {p.brand.name}</p>
              <p className='card-text'>Kategori: {p.category[0].name}</p>
              <p className='card-text'>Fiyat: {p.price} Tl</p>
              <p className='card-text'>Stok: {p.stock}</p>
              <a href="#" className="btn btn-primary">Detay</a>
            </div>
          </div>
        )
      })}

    </div>

  )
}

