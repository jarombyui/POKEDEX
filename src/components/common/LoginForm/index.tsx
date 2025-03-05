import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../Input'
import { useAuth } from '@/hooks/useAuth'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const { loginAction } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (data: LoginFormValues) => {
    try {
      loginAction(data)
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input id="password" type="password" label="Password" error={errors.password?.message} {...register('password')} />

        <div>
          <button
            type="submit"
            className="flex cursor-pointer w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
