import { useEffect, useState, useRef } from "react";
import BlogList from "../BlogList";

const LoadingSkeleton = () => {
  return(
    <div class="border border-blue-[#9CA3AF] shadow rounded-md p-4 w-[750px] mx-auto mb-[12px]">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-[#9CA3AF] rounded w-3/4"></div>
          <div class="h-4 bg-[#9CA3AF] rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-#9CA3AF rounded"></div>
            <div class="h-4 bg-#9CA3AF rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function containsOnlyNumbers(str) {
  return /^[0-9]+$/.test(str);
}


const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(5)
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState([])

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    setCurrentPage(blogs.slice(page - 5, page))
  }, [blogs, page])

  useEffect(() => {
    if(!search){
      setCurrentPage(blogs.slice(page - 5, page))
    }
    if(containsOnlyNumbers(search) && search){
      const item = blogs.find(item => item.id == search)
      if(item){
        setCurrentPage([item])
      }
    }
  }, [search])

  const fetchBlogs =  async () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
      setBlogs(data)
    })
  }

  // const currentPage = blogs.slice(page - 5, page)

  const nextPage = () => {
    setPage(page + 5)
  }

  const previousPage = () => {
    if(page === 5) return
    setPage(page - 5)
  }

  return (
   <div className="pt-[12px] flex flex-col">
    <div className="pb-[12px] w-[750px] flex self-center justify-items-start relative">
      <button onClick={previousPage} disabled={page === 5} className={`${page === 5 && 'opacity-50 cursor-not-allowed'} w-[110px] px-[16px] py-[8px] uppercase text-[#FFFFFF] bg-[#3B82F6] rounded-[4px] mr-[6px]`}>
        Previous
      </button>
      <button onClick={nextPage} disabled={page === blogs.length} className={`${page === blogs.length && 'opacity-50 cursor-not-allowed'} w-[110px] px-[16px] py-[8px] uppercase text-[#FFFFFF] bg-[#3B82F6] rounded-[4px]`}>
        Next
      </button>
      <input 
        className="absolute right-0 top-0 self-end px-[16px] py-[8px] rounded-[6px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="flex flex-col justify-center items-center">
      {
        !!blogs.length ? 
        currentPage.map(item => {
          return <BlogList blog={item} />
        }) : 
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      }
    </div>

   </div>
  )
}

export default Blogs
