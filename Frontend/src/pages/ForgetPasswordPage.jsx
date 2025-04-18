
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
import { useAuthStore } from '@/store/useAuthStore'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ForgetPasswordPage() {
  const {forgetPassword,isLoading}=useAuthStore()
  const form = useForm({
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values) {
    try {
      // Assuming a function to send reset email
      await forgetPassword();
      console.log(values)
      toast.success('Password reset email sent. Please check your inbox.')
    } catch (error) {
      console.error('Error sending password reset email', error)
      toast.error('Failed to send password reset email. Please try again.')
    }
  }

  return (
    <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4 mt-7">
      <Card className="mx-auto w-[80%] ">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full cursor-pointer">
                  Send Reset Link
                </Button>
              </div>
            </form>
          </Form>
          <Link to="/auth" className='flex items-center justify-center gap-2 mt-2'><ArrowLeft/> Login  </Link>
        </CardContent>
      </Card>
    </div>
  )
}
