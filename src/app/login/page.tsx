"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/dashboard"); // Navigate to home page
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-[1920px] mx-auto">


      <section className="lg:mx-[170px] mx-[30px] my-20 flex flex-col md:grid md:grid-cols-2 md:gap-3 justify-center items-center min-h-screen">
        <div className="w-full md:block hidden">
          <Image src={'/image/login.png'} height={200} width={200} alt="login" className="h-auto w-full"/>

        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 max-w-md">
            <h1 className="text-[#101750] text-[24px] sm:text-[36px] font-bold text-center">Login</h1>
            <p className="text-[#8D92A7] text-center text-[14px] sm:text-[16px]">
              Please login using account details below.
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="border border-[#C2C5E1] text-[#9096B2] p-2"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="border border-[#C2C5E1] text-[#9096B2] p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-red-700 py-2">{error}</p>
            {/* <Link href="/dashboard"> */}
            <Button type="submit" className="h-[47px] w-full bg-[#FB2E86] text-white" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
            {/* </Link> */}
           
          </form>
        </Form>
      </section>
    </main>
  );
}

export default Login;



