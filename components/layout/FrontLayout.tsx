import AdminSidebar from "./AdminSidebar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Image from 'next/image'
import Navbar from "./Navbar";
export default function Layout(props: any) {

  return (
      <div>
        <Navbar />
        {props.children}
      </div>
  )
}