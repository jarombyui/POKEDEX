import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React from 'react'

const Header = () => {
  const { isAuth, logoutAction } = useAuth()
  const router = useRouter()
  return (
    <div className="flex justify-between items-end absolute top-0 left-0 w-full flex-col gap-3 px-20">
      <div className=" text-gray-800 text-center font-semibold py-2">{isAuth ? 'Logeado' : 'No logeado'}</div>
      <div className="flex gap-4">
        <div className="flex gap-4">
          <button
            className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => router.push('/')}>
            Inicio
          </button>
          {!isAuth ? (
            <button
              className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => router.push('/login')}>
              Login
            </button>
          ) : (
            <>
              <button
                className="cursor-pointer bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                onClick={() => router.push('/user')}>
                User
              </button>
              <button
                className="cursor-pointer bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                onClick={logoutAction}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
