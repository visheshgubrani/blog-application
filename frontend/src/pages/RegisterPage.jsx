const RegisterPage = () => {
  const flexBetween = 'flex justify-center items-center'
  return (
    <div className={`${flexBetween} flex-col  h-screen`}>
      <p className='prose-lg'>Create an account</p>

      <form className={`${flexBetween} flex-col gap-4`}>
        <div className='w-full max-w-xs'>
          <input
            type='file'
            className='file-input file-input-bordered w-full'
          />
        </div>
        <div className='w-full max-w-xs'>
          <input
            type='text'
            placeholder='Name'
            className='input input-bordered w-full'
          />
        </div>
        <div className='w-full max-w-xs'>
          <input
            type='text'
            placeholder='Username'
            className='input input-bordered w-full'
          />
        </div>
        <div className='w-full max-w-xs'>
          <input
            type='text'
            placeholder='Email'
            className='input input-bordered w-full'
          />
        </div>
        <div className='w-full max-w-xs'>
          <input
            type='text'
            placeholder='Password'
            className='input input-bordered w-full'
          />
        </div>
        <div className='w-full max-w-xs'>
          <input
            type='text'
            placeholder='Password Confirmation'
            className='input input-bordered w-full'
          />
        </div>
        <input
          type='submit'
          className='w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 cursor-pointer'
        />
      </form>
    </div>
  )
}

export default RegisterPage
