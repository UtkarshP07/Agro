import logo from "./assets/logo.png";
import Carousel from "./components/Carousel";
import AccountSelection from "./components/AccountSelection";

const SignUpPage = ({
  isLoading,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  phone,
  setPhone,
  agreed,
  setAgreed,
  selectedAccount,
  setSelectedAccount,
  errors,
  location,
  handleSubmit,
  goback,
  setGoback
}) => {
  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      {/* Left Section */}
      <div
        className="relative hidden h-screen select-none flex flex-col items-center justify-center text-center md:flex md:w-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(178,218,255,1) 0%, rgba(54,161,131,1) 55%, rgba(204,252,140,1) 93%)",
        }}
      >
        <Carousel
          baseWidth={600}
          autoplay={true}
          autoplayDelay={2500}
          pauseOnHover={true}
          loop={true}
          round={true}
        />
      </div>

      {/* Right Section */}
      <div className="flex w-full flex-col md:w-1/2 justify-center">
        {/* Logo */}
        <div className="flex justify-center pt-6 md:justify-start md:pl-12">
          <img src={logo} alt="Logo" className="h-15 w-auto" />
          <button onClick={()=>setGoback(!goback)}>Go back</button>
        </div>

        {/* Form Section */}
        <div className="mx-auto flex flex-col justify-center px-6 pt-4 md:pt-4 lg:w-[25rem] flex-grow">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight">
            Create your free account
          </p>
          <p className="mt-4 text-center font-medium md:text-left">
            Already using Agro?
            <a
              href="/login"
              className="whitespace-nowrap font-semibold text-[#3D8D7A]"
            >
              {" "}
              Login here
            </a>
          </p>

          <AccountSelection onAccountSelect={setSelectedAccount} />

          <form className="flex flex-col items-stretch pt-3 md:pt-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#15F5BA]">
                <input
                  type="text"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#15F5BA]">
                <input
                  type="email"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#15F5BA]">
                <input
                  type="tel"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#15F5BA]">
                <input
                  type="password"
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="block flex justify-center mt-4">
              <input
                className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top text-black shadow checked:bg-[#3D8D7A] focus:border-[#3D8D7A] focus:shadow"
                type="checkbox"
                id="remember-me"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label className="inline-block" htmlFor="remember-me">
                I agree to the{" "}
                <a className="underline text-[#3D8D7A]" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`mt-6 rounded-lg bg-[#3D8D7A] px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-[#3D8D7A] ring-offset-2 transition focus:ring-2 md:w-32 flex items-center justify-center ${
                  isLoading
                    ? "hover:bg-[#3D8D7A] cursor-not-allowed"
                    : "hover:bg-[#347962]"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;