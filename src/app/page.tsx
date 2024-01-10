"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Header from '@/components/Header';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
      {/* {loading ? ( */}
        {/* <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <ColorRing
  visible={true}
  height="200"
  width="200"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
  </div>
      ) : ( */}
        <>
          <Header />
          <div className="container mx-auto">
            <div className="flex flex-row">
              <div className="w-1/2 divStyle">
                <h1 className="flex flex-col justify-center heading1"><span> <span className="text-[#363B94]"> Slick </span> <span className="text-[#BE241F]"> Starter. </span>  </span></h1>
                <p className="paragraph">
                  Discover stories, thinking, and expertise from writers on any
                  topic.
                </p>
                <Link
                  href="/frontend"
                  className="animate__animated animate__backInLeft divBtn py-3 px-5 bg-blue-800 text-white rounded-full text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </>
      {/* )} */}
    </main>
  );
}
