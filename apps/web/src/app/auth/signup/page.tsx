'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@iac/ui/input'
import { Typography } from '@iac/ui/typography'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { createUserSchema } from '~/app/lib/schemas/user'

import Brainiac from '~/assets/icons/brainiac.svg'

const SignUp = () => {
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(createUserSchema)
  })

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center">
      <div className="min-h-[600px] w-full max-w-md">
        <div className="flex w-full justify-start gap-4">
          <Brainiac className="text-base-rose w-20" />
          <div className="flex flex-col gap-2 pt-3">
            <Typography.H1 className="text-base-text">Sign Up</Typography.H1>
            <Typography.Body className="text-base-subtle">Just a few quick things to get started!</Typography.Body>
          </div>
        </div>

        <div className="mt-4">
          <FormProvider {...form}>
            <Controller name="username" control={form.control} render={({ field }) => <Input {...field} />} />
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default SignUp
