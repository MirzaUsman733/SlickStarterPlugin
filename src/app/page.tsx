import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
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
              className="animate__animated animate__backInLeft divBtn py-3 px-5  bg-blue-800 text-white rounded-full text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
