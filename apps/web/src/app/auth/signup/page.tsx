'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@iac/ui/button'
import { Input } from '@iac/ui/input'
import { Loading } from '@iac/ui/loading'
import { Message } from '@iac/ui/message'
import { Typography } from '@iac/ui/typography'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { signUpService } from '~/app/api/auth/signup/service'
import { CreateUserDto } from '~/app/lib/models/user'

import { createUserSchema } from '~/app/lib/schemas/user'
import { useAuthStore } from '~/store/auth'

import Brainiac from '~/assets/icons/brainiac.svg'

const SignUp = () => {
  const router = useRouter()
  const setUser = useAuthStore(state => state.setUser)
  const setLoggedIn = useAuthStore(state => state.setLoggedIn)

  const { mutate, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signUpService,
    onSuccess: data => {
      setUser(data)
      router.push('/')
      setLoggedIn(true)
    }
  })

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(createUserSchema)
  })

  const { isValid } = form.formState

  const onSubmit = async (data: CreateUserDto) => mutate(data)

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center gap-2 pt-3">
          <Brainiac className="text-base-rose w-20" />
          <Typography.H1 className="text-base-text">Sign Up</Typography.H1>
          <Typography.Body className="text-base-subtle text-center">Just a few quick things to get started!</Typography.Body>
        </div>

        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 p-3 flex mx-auto flex-col gap-3">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                  <div className="flex flex-col gap-2">
                    <Typography.Body className="text-base-text">Username</Typography.Body>

                    <Input autoComplete="username webauthn" {...field} />

                    {error && <Message>{error.message}</Message>}
                  </div>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                  <div className="flex flex-col gap-2">
                    <Typography.Body className="text-base-text">Email</Typography.Body>

                    <Input placeholder="example@gmail.com" autoComplete="email webauthn" {...field} />

                    {error && <Message>{error.message}</Message>}
                  </div>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                  <div className="flex flex-col gap-2">
                    <Typography.Body className="text-base-text">Password</Typography.Body>

                    <Input type="password" autoComplete="new-password" {...field} />

                    {error && <Message>{error.message}</Message>}
                  </div>
                )}
              />

              <Link href="/auth/login">
                <Typography.Link className="text-base-rose">Already have an account? Sign in</Typography.Link>
              </Link>

              <Button disabled={!isValid} className="w-full mt-4">
                {isPending ? <Loading /> : <Typography.Button>Continue</Typography.Button>}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default SignUp
