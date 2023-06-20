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

export default LoadingSkeleton