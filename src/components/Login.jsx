import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const email = useRef(); //email reference usestate alternative
  const pass = useRef(); //password reference
  const navigate = useNavigate(); // using navigate hoook


 
  //start of loginHandler function
  const loginHandler = async (e) => {
    e.preventDefault();

    // to make payload to send through api of user data through payload
    const loginData = {
      email: email.current.value,
      password: pass.current.value,
    };
    //

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData
      );
      if (response.data.status === "success") {
        const getAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", getAccessToken);
        navigate("/", { replace: true });
        toast.success('Logged in Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          containerId:"login_logout"
          });
       

      }
    } catch (error) {
      //console.log(error.response.data)
      if (error.response.data.status === "failed") {
        alert(error.response.data.errors[0].message);
      } else {
        alert("unknown error occured");
      }
    }
  };

  //end of loginHandler function
  return (
    <>
    {/* <ToastContainer containerId={'authorization'}/> */}
      <div className="mx-32 mt-28">
        <div className="mx-auto w-1/2">
          <div className="bg-slate-100 px-10 pt-20  rounded-md shadow-2xl">
            <h1 className="text-blue-600 text-2xl font-bold">Welcome</h1>
            <p className="text-lg font-light text-gray-600">
              Please, Proceed to login.
            </p>

            <div className="mt-3 pb-5">
              <form onSubmit={loginHandler}>
                <div className="">
                  <label htmlFor="email" className="text-lg font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={email}
                    className="block w-full px-4 py-2 my-2 rounded-lg shadow"
                  />
                  {/* @error('email')
                            <p className="text-red-500 mt-2 text-sm">* {{$message}}</p>   
                            @enderror */}
                </div>

                <div>
                  <label htmlFor="password" className="text-lg font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={pass}
                    className="block w-full  px-4 py-2 my-2 rounded-lg shadow"
                  />
                  {/* @error('password')
                            <p className="text-red-500 mt-2 text-sm">* {{$message}}</p>   
                            @enderror */}
                </div>

                <div className="mt-10 text-center">
                  <button
                    type="submit"
                    className="text-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-800 rounded-md"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
