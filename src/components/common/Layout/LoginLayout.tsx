import Header from '@/components/common/Header/Header'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const { isLoading, isAuth } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuth) router.push('/')
    }
  }, [isLoading, isAuth])

  if (isLoading || isAuth) return <div>cargando</div>

  return (
    <div className="flex h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 items-center ">
      <Header />
      {children}
    </div>
  )
}
