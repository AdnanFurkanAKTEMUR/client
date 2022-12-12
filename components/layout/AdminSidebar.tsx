import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faHome, faProjectDiagram, faBoxArchive, faBoxesStacked, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/image'

export default function AdminSidebar(props: any) {
  //let image = `/image/${props.product.image}.jpg`
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"></svg>
        <span className="fs-4"><FontAwesomeIcon icon={faListAlt} /> Hızlı Menü</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link href={'/admin'} className='nav-link text-white'>
            <FontAwesomeIcon icon={faHome} className='mx-2' />
            Home
          </Link>
        </li>
        <li>
          <Link href={'/admin'} className='nav-link text-white'>
            <FontAwesomeIcon icon={faProjectDiagram} className='mx-2' />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href={'/admin/user'} className='nav-link text-white'>
            <FontAwesomeIcon icon={faUser} className='mx-2' />
            Users
          </Link>
        </li>
        <li>
          <Link href={'/admin/product'} className='nav-link text-white'>
            <FontAwesomeIcon icon={faBoxArchive} className='mx-2' />
            Products
          </Link>
        </li>
        <li>
          <Link href={'/admin/category'} className='nav-link text-white'>
            <FontAwesomeIcon icon={faBoxesStacked} className='mx-2' />
            Categories
          </Link>
        </li>
        <li>
          <Link href={'/admin/brand'} className='nav-link text-white'>
            <FontAwesomeIcon icon={faBars} className='mx-2' />
            Brands
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  )
}

