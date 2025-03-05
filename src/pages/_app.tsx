import { useAuth } from '@/hooks/useAuth'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 0,
        gcTime: 0
      }
    }
  })
  const { refreshAuth, isLoading } = useAuth()
  useEffect(() => {
    refreshAuth()
  }, [])

  if (isLoading) return <div>cargando</div>

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
