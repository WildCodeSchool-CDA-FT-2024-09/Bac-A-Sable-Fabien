import { useRef, useState, useEffect } from "react";
import { useLoginLazyQuery } from "../generated/graphql-types";
import { useNavigate } from "react-router";

export default function Login() {
  const [login] = useLoginLazyQuery();
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [emailRef, pwd]);

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("clicked", emailRef.current?.value, pwd);

    if (emailRef.current) {
      try {
        const response = await login({
          variables: {
            email: emailRef.current.value as string,
            password: pwd,
          },
        });
        console.log(pwd);

        console.log(response);

        if (response.data?.login) {
          navigate("/", { replace: true });
        } else {
          setErrMsg(
            "There is a problem with your credentials. Please try again.",
          );
        }
      } catch (error) {
        setErrMsg("Login Failed");
        console.error(error);

        if (errRef.current) errRef.current.focus();
      }
    }
  };

  return (
    <>
      <div className="container mx-auto md:max-w-md my-4">
        <div className="bg-darkgrey text-white p-4 rounded-md">
          <section>
            <p
              ref={errRef}
              className={`${
                errMsg ? "bg-red-600 text-white p-2 mb-4 rounded-md" : "hidden"
              }`}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </section>
          <h3 className="text-xl font-bold mb-2">Sign in</h3>
          <form id="signinForm" action="get" onSubmit={handleSignin}>
            <div className="relative mb-6">
              <label
                className="flex items-center mb-2 text-sm font-medium"
                htmlFor="email"
              >
                Name
              </label>
              <input
                type="text"
                id="email"
                className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs bg-lightgrey text-black border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                placeholder="Type your email"
                ref={emailRef}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex gap-x-6 mb-6">
              <div className="w-full relative">
                <label
                  className="flex items-center mb-2 text-sm font-medium"
                  htmlFor="password"
                >
                  Comment
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-black bg-lightgrey border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                  required
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                ></input>
              </div>
            </div>
            <button
              type="submit"
              className="w-52 h-12 shadow-sm rounded-md bg-black hover:bg-gray-800 transition-all duration-300 text-white text-base font-semibold leading-7"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
