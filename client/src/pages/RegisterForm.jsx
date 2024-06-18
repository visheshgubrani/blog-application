import { useForm } from "react-hook-form"
import Input from "../components/Input"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const RegisterForm = () => {
  const { register, handleSubmit } = useForm()
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return axios.post(
        "http://localhost:4080/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const onSubmit = (data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    mutation.mutate(formData)
  }

  const flexBetween = "flex justify-center items-center"
  return (
    <div className="container mx-auto flex-col justify-center items-center">
      <div className="text-center text-3xl">Register Form</div>
      <div className={`${flexBetween} mt-8`}>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              placeholder="Full Name"
              {...register("fullName", { required: true, maxLength: 25 })}
            />
            <Input placeholder="Username" {...register("username")} />
            <Input placeholder="email" {...register("email")} />
            <Input placeholder="password" {...register("password")} />
            <input
              type="file"
              className="file-input w-full max-w-xs"
              {...register("avatar")}
            />
          </div>
          <button type="submit" className="btn mt-4 text-xl p-4r">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
