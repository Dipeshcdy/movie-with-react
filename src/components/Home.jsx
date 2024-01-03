import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  //const [searchError,setSearchError]=userState(false);
  const [isErrortext, setIsErrorText] = useState("");
  const [iserror, setIsError] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isOpenprofile, setIsOpenProfile] = useState(false);
  const navigate = useNavigate();

  //searching code
  useEffect(() => {
    if (!isFirst) {
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          getMovieData();
          setSearchErrorText("");
        } else if (!searchMovieText) {
          getMovieData();
          setSearchErrorText("");
        } else {
          setSearchErrorText("should be 3 character long");
        }
      }, 1000);
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovieText]);

  //end of searching code

  const getMovieData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );
      setIsError(false);
      setMovies(response.data.moviesData);
      setLoading(false);
      setIsFirst(false);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
      setIsFirst(false);
      setLoading(false);
    }
    // console.log(response.data.moviesData);
  };

  useEffect(() => {
    getMovieData();
  }, []);

  const onMouseEnterProfile = () => {
    setIsOpenProfile(true);
  };
  const onMouseLeaveProfile = () => {
    setIsOpenProfile(false);
  };

  const getLogout = () => {
    localStorage.removeItem("accessToken");
    onMouseLeaveProfile();
    toast.success('Logged out Successfully', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      containerId:"login_logout"
      });
    // navigate("/login");
  };
  return (
    // <div>
    //  {movies.map((item)=>{
    //     return(
    //         <div key={item.id}>
    //             <img src="" alt="" />
    //             name: {item.name}
    //         </div>
    //     )
    //  })}

    // </div>
    <div>
      <ToastContainer containerId="login_logout"/>
      <div>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex">
          {isOpenprofile ? (
                    <>
                      <div
                        onMouseEnter={onMouseEnterProfile}
                        onMouseLeave={onMouseLeaveProfile}
                        className="text-xl fixed top-14 bg-gray-300 px-4 py-2 z-10 rounded-xl left-32"
                      >
                        <div className="hover:text-red-500">
                          <Link to="/me">profile</Link>
                        </div>
                        <div className="mt-2 hover:text-red-500">
                          <button onClick={getLogout}>Logout</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
            {localStorage.getItem("accessToken") ? (
              <>
                <div className="mx-auto">
                  <CgProfile
                    onMouseEnter={onMouseEnterProfile}
                    onMouseLeave={onMouseLeaveProfile}
                    className="  font-semibold mt-7 text-3xl cursor-pointer"
                  />
                  
                </div>
              </>
            ) : (
              <>
                <Link
                  className=" font-semibold mt-5 text-3xl mx-auto"
                  to={"/login"}
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <h2 className="mt-5 text-center col-span-2 font-bold text-4xl w-5/6">
            Movies
          </h2>
          <input
            value={searchMovieText}
            onChange={(e) => {
              setSearchMovieText(e.target.value);
            }}
            type="text"
            placeholder="search"
            className="mt-5 mr-2 py-2 px-3 rounded-full border border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <hr className=" border-t-2 border-red-500 w-1/2 mx-auto" />
        <div className="fixed right-1 ml-auto pl-10 w-1/6 mt-1">
          {searchErrorText}
        </div>
      </div>
      {iserror ? (
        <div className="bg-gray-400  py-4 mx-20 rounded-full mt-10 text-center text-xl text-red-500 font-bold">
          <h2>{isErrortext}</h2>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="text-center text-xl font-bold mx-20 mt-20 ">
              Loading...
            </div>
          ) : (
            <>
              {movies.length < 1 && !isFirst ? (
                <>
                  <div className="bg-gray-400  py-4 mx-20 rounded-full mt-20 text-center text-xl text-red-500 font-bold">
                    No match found..........
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-10 mt-20 mb-10 mx-20">
                    {movies.map((item) => {
                      return (
                        <div key={item.id} className="">
                          <Link to={`/movie/${item.id}`}>
                            <div className="w-11/12 parent relative overflow-hidden rounded-2xl cursor-pointer">
                              <img
                                className="w-full rounded-2xl "
                                src={item.image}
                                alt="Movie_image"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col items-center justify-center  transition-all duration-500 opacity-0 child">
                                <div>
                                  <h2 className="text-lg font-bold">
                                    Name:{" "}
                                    <span className="text-sm font-semi-bold">
                                      {item.name}
                                    </span>
                                  </h2>
                                  <h2 className="text-lg font-bold">
                                    Rating:{" "}
                                    <span className="text-sm font-semi-bold">
                                      {item.rating}%
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
