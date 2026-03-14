const Register = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <div className="h-full py-[5%]">
        <form action="" className="px-10 flex flex-col gap-2 min-w-112.5">
          <h1 className="text-center text-4xl font-bold">Cocoa</h1>
          <p className="text-center">Sign in to your account</p>
          <label className="flex flex-col gap-2 mt-8">
            Email Address
            <input type="text" className="min-h-11 px-3 rounded border-2 outline-blue-600"/>
          </label>
          <label className="flex flex-col gap-2 mt-3">
            Password
            <input type="password" className="min-h-11 px-3 rounded border-2 outline-blue-600"/>
          </label>
          <button className="mt-6 bg-black min-h-10 rounded text-white">Sign In</button>
          <p className="hover:underline text-blue-600 text-center mt-2">Create an account</p>
        </form>
      </div>
    </div>
  )
}

export default Register
