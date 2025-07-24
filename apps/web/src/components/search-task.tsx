'use client'

import { Input } from '@iac/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { debounce } from '~/utils/debounce'

export const SearchTask = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const newParams = new URLSearchParams(searchParams.toString())

  const onSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.trim().length) {
      newParams.set('q', e.target.value)
    } else {
      newParams.delete('q')
    }

    router.push('/?'.concat(newParams.toString()))
  }, 300)

  return <Input onChange={onSearch} className="w-full lg:max-w-xs" placeholder="Search tasks..." />
}
