const postRegister = async ({
  email,
  username,
  fullName,
  password,
  avatar,
}) => {
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      body: formData,
    })
    if (!response.ok) {
      throw new Error(response?.error || "Something went wrong")
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error("Failed to register: ", error?.message)
  }
}

export default postRegister
