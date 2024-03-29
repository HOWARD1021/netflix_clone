import React from 'react'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import BasicMenu from './BasicMenu'
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
        
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className='flex space-x-2 items-center md:space-x-10'>
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="m-2 cursor-pointer object-contain" />
        <BasicMenu />
        <ul className='hidden space-x-4 md:flex'>
          <li className='headLink'>Home</li>
          <li className='headLink'>Tv Shows</li>
          <li className='headLink'>Movies</li>
          <li className='headLink'>New && Popular</li>
          <li className='headLink'>My List</li>

        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="sm hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            // onClick={logout}
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>

  )
}

export default Header