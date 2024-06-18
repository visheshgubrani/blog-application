import { forwardRef } from "react"

const Input = forwardRef(({ placeholder, value, ...rest }, ref) => (
  <div>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className="input input-bordered w-full max-w-xs m-2"
      ref={ref}
      {...rest}
    />
  </div>
))

export default Input
