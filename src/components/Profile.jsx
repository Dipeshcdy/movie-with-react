import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Profile = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
   
        getProfile();
    
  }, []);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.status === "success") {
        // console.log(response.data.data);
        // const profileData=response.data.data;
        setProfileData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      if (error.response.data.status === "failed") {
        // alert(error.response.data.errors[0].message);
        navigate("/login",{replace:true});
      } else {
        alert("unknown error occured");
      }
    }
  };
  return (
    <>
      <div className="mx-20 mt-10">
        <IoArrowBackCircleSharp
          onClick={() => {
            navigate(-1);
          }}
          className="text-3xl text-blue-500 cursor-pointer"
        />

        <div className=" element flex py-5 text-2xl font-bold mt-5 ">
          {Loading ? (
            <>
              <div>
                <h2>Loading...</h2>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2>Name : {profileData.name}</h2>
                <h2>Email : {profileData.email}</h2>
                <h2>Country : {profileData.country}</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Profile;
