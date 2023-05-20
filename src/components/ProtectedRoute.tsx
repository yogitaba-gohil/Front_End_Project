import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/user_context'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext()
  console.log('user', user)
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
export default ProtectedRoute