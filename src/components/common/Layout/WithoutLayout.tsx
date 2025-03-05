import Header from '@/components/common/Header/Header'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const WithoutLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuth } = useAuth()

  if (isLoading) return <div>cargando</div>

  return (
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 items-center ">
      <Header />
      {children}
    </div>
  )
}
