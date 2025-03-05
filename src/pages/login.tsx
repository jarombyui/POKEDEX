import { LoginLayout } from '@/components/common/Layout/LoginLayout'
import LoginForm from '@/components/common/LoginForm'

const Login = () => {
  return (
    <LoginLayout>
      <div className="flex h-full w-full flex-col justify-center px-6 py-12 lg:px-8 items-center ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
        </div>
        <LoginForm />
      </div>
    </LoginLayout>
  )
}

export default Login
