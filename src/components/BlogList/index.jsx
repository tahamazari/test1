const BlogList = ({ blog }) => {
  const { title, body } = blog
  return (
    <div className="bg-[#9CA3AF] w-[750px] mb-[12px] text-left p-[12px] rounded-[16px]">
      <div className="font-bold capitalize">{title}</div>
      <div>{body}</div>
      <br/>
    </div>
  )
}

export default BlogList