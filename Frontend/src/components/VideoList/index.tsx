import PageNotFound from '@/pages/PageNotFound'
import React from 'react'

const VideoList: React.FC<any> = (props: { category: string }) => {
  const { category } = props;
  console.log("current category:", category);

  return (
    <>
      <PageNotFound />
    </>
  )
}

export default VideoList