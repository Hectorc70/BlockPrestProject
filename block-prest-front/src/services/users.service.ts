/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/models/user.model";
// import axios from "axios";


const login = async (IUser:IUser): Promise<IUser> => {
  try {

    // localStorage.setItem(lsToken, response.data.data.token)
  } catch (e: any) {
    throw handleError(e)
  }
}


const AuthService = {
  login,
  // refreshToken
}

export default AuthService
