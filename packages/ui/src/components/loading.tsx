'use client'

import { chaoticOrbit } from 'ldrs'

import { createElement } from 'react'

chaoticOrbit.register()

export type Props = Partial<{
  size: string
  speed: string
  color: string
}>

export const Loading = ({ color = '#F4F4F4', speed = '1.5', size = '25', ...props }: Props) => {
  return createElement('l-chaotic-orbit', { ...props, size, speed, color })
}
