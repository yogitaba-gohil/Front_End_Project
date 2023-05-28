import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/user_context'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext()
  if (user.role !== "ADMIN") {
    alert("Only Admin user allowed to access")
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
export default ProtectedRoute