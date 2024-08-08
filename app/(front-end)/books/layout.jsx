import Sidebar from '@/components/fontend/Sidebar'
import React from 'react'

export default function Layout({ children }) {
  return (
    <div className='grid sm:grid-cols-12 gap-4  '>
        <div className="hidden sm:block sm:col-span-2 relative">
          <Sidebar />
        </div>
        <div className="sm:col-span-8">{children}</div>

    </div>
  )
}
