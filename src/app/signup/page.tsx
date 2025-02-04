"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
 
// Define the schema for validation using zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }), // New address field validation
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }), // New phone field validation
});

export default function Signup() {
  const router = useRouter();

  // Define the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    },
  });

  // const [error , setError] = useState<string>("")


  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/login");
        // console.log("user registered")
      }else {
        const data = await res.json();
        console.log(data)
        // setError(data.message || "User registration failed.");
      }
  
    } catch (error) {
      console.error("Error during signup:", error);
      // setError("An error occurred. Please try again.");
    }
  };

  return (
    <main className="max-w-[1920px] mx-auto flex justify-center items-center">
     

      <section className="  lg:mx-[170px] mx-[30px] my-24 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-6 h-auto w-[544px] p-5 lg:h-[474px]">
          <h1 className="text-[#101750] text-[24px] sm:text-[36px] font-bold text-center mt-52">Signup</h1>
          <p className="text-[#8D92A7] text-center text-[14px] sm:text-[16px]">
            Sign up to get access to all the features.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
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
                      <Input type="password" placeholder="Password" {...field} />
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm  Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem> <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


              <Button type="submit" className="h-[47px] w-full bg-[#FB2E86] text-white hover:bg-[#FB2E86]">
                Sign up
              </Button>
            </form>
          </Form>
          <p className="text-[#9096B2]">
            Already have an account?
            <Link href="/login" className="text-[#101c50]">
              {" "}
              Sign in{" "}
            </Link>
          </p>
        </div>
      </section>

     
    </main>
  );
}