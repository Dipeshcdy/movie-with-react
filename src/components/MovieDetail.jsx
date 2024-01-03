import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
//import img from "../assests/1.jpg";
const MovieDetail = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [iserror, setIsError] = useState(false);
  const [isErrortext, setIsErrorText] = useState("");
  const [loading, setLoading] = useState(true);

  const getSingleMovieData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        //${param.id}
        `https://api.dynoacademy.com/test-api/v1/movie/${param.id}`
      );
      setIsError(false);
      setData(response.data.singleMovieData);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      if (error.response.data.status) {
        setIsErrorText(error.response.data.errors[0].message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleMovieData();
  }, []);

  return (
    <div
      className={
        "bg-black text-white " + (iserror || loading ? "h-screen" : "")
      }
    >
      <div className="flex">
        <div className="  ml-14 mt-5">
          <IoArrowBackCircleSharp
            onClick={() => {
              navigate(-1);
            }}
            className="text-4xl text-blue-500 cursor-pointer"
          />
        </div>
        <div className="w-5/6">
          <h2 className="pt-5 text-center font-bold text-3xl">Movie Details</h2>
        </div>
      </div>
      <hr className=" border-t-2 border-red-500 w-1/2 mx-auto" />
      {iserror ? (
        <div className="bg-gray-400  py-4 mx-20 rounded-full mt-10 text-center text-xl text-red-500 font-bold">
          <h2>{isErrortext}</h2>
        </div>
      ) : (
        <>
          {loading ? (
            <>
              <div className="text-center text-xl font-bold mx-20 mt-10 ">
                Loading...
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="py-5">
                <div className="w-1/2 mx-auto">
                  <img className="w-1/2" src={data.image} alt="" />
                </div>
                <div className="w-1/2 mx-auto my-5">
                  <h2 className="my-5">Name : {data.name}</h2>
                  <h2 className="my-5">Description : {data.desc}</h2>
                  <h2 className="my-5">Info : {data.info}</h2>
                  <h2 className="my-5">Rating : {data.rating}%</h2>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default MovieDetail;
