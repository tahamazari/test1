import { useEffect, useState } from "react";

import BlogList from "../BlogList";
import Skeleton from "../Skeleton"
import Button from "../Button"
import Input from "../Input"

import { containsOnlyNumbers } from "../../utils"

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
      <Button 
        onClick={previousPage}
        label={"Previous"}
        disabled={page === 5}
        className={`${page === 5 && 'opacity-50 cursor-not-allowed'} w-[110px] px-[16px] py-[8px] uppercase text-[#FFFFFF] bg-[#3B82F6] rounded-[4px] mr-[6px]`}
      />
      <Button 
        onClick={nextPage}
        label={"Next"}
        disabled={page === blogs.length}
        className={`${page === blogs.length && 'opacity-50 cursor-not-allowed'} w-[110px] px-[16px] py-[8px] uppercase text-[#FFFFFF] bg-[#3B82F6] rounded-[4px]`}
      />
      <Input
        className={"absolute right-0 top-0 self-end px-[16px] py-[8px] rounded-[6px]"}
        value={search}
        placeholder={"enter blog id"}
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
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      }
    </div>
   </div>
  )
}

export default Blogs
