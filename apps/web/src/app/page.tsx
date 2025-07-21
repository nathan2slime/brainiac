'use client'

import { useAuthStore } from '~/store/auth'

const Home = () => {
  const user = useAuthStore(state => state.user)

  return <div className="bg-base-foam p-4">{user?.username}</div>
}

export default Home
