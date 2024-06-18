import { useMutation } from "@tanstack/react-query"
import React from "react"
import { useForm } from "react-hook-form"
import Input from "../components/Input"

const LoginForm = () => {
  const { register, handleSubmit } = useForm()

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:4080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: (data) => console.log(data),
  })
  const onSubmit = (data) => {
    console.log(data)
    mutation.mutate(data)
  }
  return (
    <div className="container mx-auto">
      <h1>LoginForm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Username" {...register("username")} />
        {/* <Input placeholder="email" {...register("email")} /> */}
        <Input placeholder="password" {...register("password")} />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
