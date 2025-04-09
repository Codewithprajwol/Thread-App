
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/PasswordInput'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'



export default function Login({setAuthScreenState}) {
  // Zustand store for authentication state 
  const {logIn, isLoading}=useAuthStore();
  const form = useForm({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  })

  async function onSubmit(values) {
    try {
      // Assuming an async login function
      await logIn({
        emailOrUsername: values.emailOrUsername,
        password: values.password,
      })
      form.reset()
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  return (
    <div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4 mt-7">
      <Card className="mx-auto w-[80%]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="emailOrUsername"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email Or Username</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="email / username"
                          type="text"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between gap-5 items-center ">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          to="/forget-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="#" className="underline" onClick={()=>{setAuthScreenState('signup')}}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
