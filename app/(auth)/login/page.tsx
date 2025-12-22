import AuthForms from "@/app/components/Forms/AuthForms";

const page = () => {
  return (
    <section className="flex flex-col items-center justify-center py-4 font-sans px-4 sm:px-6 md:px-8">
      <AuthForms />
    </section>
  );
};

export default page;


/*
<section className="border-2 border-gray-200 p-10 rounded-md min-w-lg max-w-3xl">
        <p className="text-center pb-10">User Login</p>
       <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="input">Username</label>
            <input
              type="text"
              className="px-2 py-2 border-2 border-gray-200 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="input">Password</label>
            <input
              type="password"
              className="px-2 py-2 border-2 border-gray-200 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black font-medium rounded-md px-2 py-2 mt-4 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-center pt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline cursor-pointer">Signup</Link>
        </p>
      </section>
*/