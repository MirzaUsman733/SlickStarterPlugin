"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Image from "next/image";
export default function Header() {
  const [toggle, setToggle] = useState(false);
  const { data: session } = useSession();
  return (
    <div className='bg-white text-black'>
      <div className='max-w-screen-2xl py-2 px-5 items-center flex justify-between mx-auto'>
        <div className='text-3xl font-bold'> <Link href="/frontend">
          <Image
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBAQEBAVEBAQFhUWEBEQFhcQEhgYFRIXGBgWFxgaHSgiGhslHRYVITEtJyk3MDouFx8zODMtNygtLisBCgoKDg0OGxAQGzAlHh0tLSstLS0rLS83LTUrLjItLS0tLS0tLS0tLS0rLzUtLS41Li0rLi0tLS0tLS0tLS0tLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQcEBgECAwj/xAA8EAABAwIEAwYCCAUEAwAAAAABAAIDBBEFEiExBhNBByJRYXGBMpEUI0JSgqGxwTVTcnSzJDOy0WKDkv/EABoBAQACAwEAAAAAAAAAAAAAAAABAgMEBQb/xAApEQEAAgICAgAFAwUAAAAAAAAAAQIDEQQhEjEFIkFRoRNh4SMzcbHR/9oADAMBAAIRAxEAPwC8UREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREHC5XnI8NBc4hoAuSTYAeJK0DijtQp4Lx0gFTKNM+0IPru72081fHitedVhEzEN6rKyOBhkle2Njfic85WqtOKO1YDNHQNudvpEg0/Az93fIquscx6prn56iUvP2W7Mbf7rdgvTh7huqr35aeMlo+KR3djb6u/bddLHw6Y48sksc3meodYuJK1s/0gVMnOO7i4m+uxG2Xy2VlcL9qkcmWOubyn7c5gJjP9Td2+1/ZYj+x88ru1f11tjHaO/he9x6/kq/x3h+poX5KiIs+6/djv6XdVeY4+fqPaPmq+kqaoZK0Pje17HatcwhzSPIheq+a+H+Jaqgdmp5S1p+KN3ejd6t/fdW1wv2l0tVaOo/0sx07x+qcfJ3T3+ZWlm4d6dx3C8XiW9ouocDqNQuy1FxERAREQEREBERAREQEREBERAREQaN2wPIw0gEjNLGHW6jU2PyHyVHwxOe5rGi7nkNaPEk2A/RXf2xfw3/AN0f6OVL4XUiGeGUi4ikY8geDXg/suvwf7U6Yb+1q8MdlUUeWSufzX78mMkRj+p27vy91YDnQUkW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"
            width="100"
            height="100"
            alt="Slick Starter"
          />
        </Link></div>
        {
          toggle ?
            <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-2xl md:hidden block' />
            :

            <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-2xl md:hidden block' />
        }
        <ul className='hidden md:flex gap-10'>
           <li><Link href="/frontend">Home</Link></li>
         <li><Link href="/frontend/commentGenerated">Comments</Link></li>
          <li><Link href="/frontend/history">
            History
          </Link></li>
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-2 bg-blue-800 text-white rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        {/* Responsive menu */}
        <ul className={`duration-500 md:hidden fixed bg-slate-900 top-[84px] h-screen w-full space-y-7 ps-3
         ${toggle ? `left-0` : `left-[-100%]`}`}>
          <li></li>
          <li><Link href="/frontend">
            Home
          </Link></li>
          <li><Link href="/frontend/commentGenerated">
           Comments
          </Link></li>
          <li><Link href="/frontend/history">
            History
          </Link></li>
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
            </>
          ) : (
            <>
              {/* {session.user?.email} */}
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="p-2 px-5 -mt-2 bg-blue-800 text-white rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
