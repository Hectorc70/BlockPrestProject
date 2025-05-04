/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from "@/common/utils/errors.util";
import { ILean } from "@/models/lean.model";
import axios from "axios";





const getAll = async (page: number): Promise<Array<ILean>> => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}teachers/all?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data
  } catch (e: any) {
    throw handleError(e)
  }
}

const create = async (teacherData: ILean): Promise<ILean> => {
  try {
    const token = localStorage.getItem(lsToken)
    const teacher = new TeacherModel(teacherData);
    const response = await axios.post(`${baseApi}teachers/create/`,
      teacher.toJson(),
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data as Iteacher
  } catch (e: any) {
    throw handleError(e)
  }
}
const getDetail = async (uuid: string): Promise<ILean> => {
  try {
    const token = localStorage.getItem(lsToken)
    const response = await axios.get(`${baseApi}teachers/detail/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token} `

        }
      }
    )
    return response.data.data as Iteacher
  } catch (e: any) {
    throw handleError(e)
  }
}
const LoansService = {
  getAll,
  create,
  getDetail,
}

export default LoansService
