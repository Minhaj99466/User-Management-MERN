import axiosInterceptorInstance from "../utils/UserMiddleware";

const userApi = axiosInterceptorInstance;

export async function UserSignUp(signupData) {
    try {
      const data = await userApi.post("/signup", signupData);
      return data;
    } catch (err) {
      throw new err(err);
    }
  }
  
  export async function UserLogin(loginData) {
      try {
          const data = await userApi.post("/login", loginData);
          return data;
        } catch (err) {
            throw new err(err);
        }
    }
    
  export async function OtpVerify(loginData) {
      try {
          const data = await userApi.post("/otp", loginData);
          return data;
        } catch (err) {
            throw new err(err);
        }
    }
  export async function ResendOTP(loginData) {
      try {
          const data = await userApi.post("/resendOtp", loginData);
          return data;
        } catch (err) {
            throw new err(err);
        }
    }
    
  export async function GetProfile(id) {
      try {
          const data = await userApi.get(`/profile/${id}`);
          return data;
        } catch (err) {
            throw new err(err);
        }
    }
  export async function UpDateProfile(profileData,id) {
      try {
        console.log(profileData,"profile adtatdgayud");
        const data = await userApi.put(`/addProfile/${id}`,profileData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }})
          console.log(data,"in APiiiii");
          return data
        } catch (err) {
            throw new err(err);
        }
    }
    
 