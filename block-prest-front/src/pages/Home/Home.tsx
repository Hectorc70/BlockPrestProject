/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useNavigate } from "react-router";
// import { ScreenStatus } from "@/models/enums";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeTitle } from "@/redux/globalSlice";
// import { ILoan } from "@/models/lean.model";
import { SiCashapp } from "react-icons/si";

const HomePage: React.FC = () => {

  // const navigate = useNavigate()


  const dispatch = useDispatch<AppDispatch>();
  // const [items, setItems] = useState<Array<ILoan>>([])
  // const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)

  const init = () => {
    try {
      dispatch(changeTitle("Inicio"));
      getData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getData = async () => {
    try {
      // setStatusScreen(ScreenStatus.loading)
      // setStatusScreen(ScreenStatus.success)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    init()
  }, [])


  return (<>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className="h-full w-full flex flex-col items-end">
      <div className="w-full">
        <span className="text-primary font-bold text-2xl">Hola, de nuevo Usuario</span>
      </div>
      <div className="flex justify-start gap-5 w-full mt-10">
        <div className="cursor-pointer flex flex-col justify-center items-center p-5 w-[200px] h-[100px] bg-purple-300 rounded-2xl">
          <SiCashapp className="text-onBackground text-5xl mb-3" />
          <span className="font-bold text-onBackground font-2xl">Fondear prestamo</span>
        </div>
        <div className=" cursor-pointer flex flex-col justify-center items-center p-5 w-[200px] h-[100px] bg-blue-300 rounded-2xl">
          <SiCashapp className="text-onBackground text-5xl  mb-3" />
          <span className="font-bold text-onBackground font-2xl">Solicitar prestamo</span>
        </div>
      </div>
    </div>
  </>)
}


export default HomePage