import AdminSidebar from "./AdminSidebar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/image'
export default function Layout(props: any) {

  return (
    <div>
      <div className='row mw-100 bg-light'>
        <div className='col-md-12'>
          <div className='row bg-dark py-3 border-bottom border-4 border-warning '>
            <div className="col-md-3 text-white px-5">
              <Link href={`/admin`}> <FontAwesomeIcon icon={faStar} /> AKTEMUR </Link>
            </div>
            <div className='col-md-9 text-white'>
              Admin Paneli
            </div>
          </div>
        </div>
        <div className='col-md-2'>
          <AdminSidebar />
        </div>
        <div className="col">
          {props.children}
        </div>
      </div>
    </div>
  )
}