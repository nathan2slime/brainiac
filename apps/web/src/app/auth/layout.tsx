import { AppChildren } from '~/types'

const AuthLayout = ({ children }: AppChildren) => {
  return <div className="w-screen h-screen overflow-y-auto bg-base-base">{children}</div>
}

export default AuthLayout
