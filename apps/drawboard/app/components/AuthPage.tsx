"use client"

import axios from "axios"
import Link from "next/link"
import { useForm, SubmitHandler } from "react-hook-form"
import { BACKEND_URL } from "../config"
import { useRouter } from "next/navigation"

type AuthFormInputs = {
  email: string
  password: string
  name: string 
}

interface AuthPageProps {
  isSignin: boolean
}

export default function AuthPage({ isSignin }: AuthPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>()
const router = useRouter()

const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
  try {
    if (isSignin) {
      const res = await axios.post(`${BACKEND_URL}/signin`, {
        username: data.email,
        password: data.password,
      })
      localStorage.setItem("token",res.data.token)
      router.push("/")
    } else {
      const res = await axios.post(`${BACKEND_URL}/signup`, {
        name:data.name,
        username: data.email,
        password: data.password,
      })
      router.push("/signin")
    }
  } catch (err: any) {
    console.error("Auth error:", err.response?.data || err.message)
  }
}

  return (
    <>
    <h2 className="text-center text-4xl py-10 italic">DrawBoard</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-4xl">
      
      <div className="flex w-screen justify-center items-center">
        <div className="space-y-2 border rounded-2xl max-w-md w-full p-10">

      {isSignin?(<h1 className="text-center text-5xl pb-10 pt-5">Log Into <br/><span className="italic">Your</span> Account</h1>):(<h1 className="text-center text-5xl pb-10 pt-5">Create your<br/> <span className="italic">Free</span> Account</h1>)}

      {!isSignin && (<div>
        <label>Name</label>
        <input
          type="name"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 border rounded-2xl text-gray-400"
          />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>)}

      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded-2xl text-gray-400"
          />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border rounded-2xl text-gray-400"
          />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button type="submit" className="bg-black text-white p-2 rounded-full w-full">
        {isSignin ? "Sign In" : "Sign Up"}
      </button>
          {isSignin?(<p className="text-center">New to Drawboard?{" "}<Link className="underline" href={"/signup"}>SignUp</Link></p>):(<p className="text-center">Already a user?{" "} <Link href={"/signin"} className="underline">SignIn</Link></p>)}
            </div>
      </div>
    </form>
            </>
  )
}
