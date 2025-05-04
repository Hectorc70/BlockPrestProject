/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useNavigate } from "react-router";
// import { ScreenStatus } from "@/models/enums";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeTitle } from "@/redux/globalSlice";
// import { ILoan } from "@/models/lean.model";
import { SiCashapp } from "react-icons/si";
import ButtonLarge from "@/components/ButtonLarge";
import { useForm } from "react-hook-form";
import { IGroup } from "@/models/group.model";
import ModalComponent from "@/components/Modal";
import { ScreenStatus } from "@/models/enums";
import FormInput from "@/components/Input";

const HomePage: React.FC = () => {

  // const navigate = useNavigate()


  const dispatch = useDispatch<AppDispatch>();
  // const [items, setItems] = useState<Array<ILoan>>([])
  // const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  const [items, setItems] = useState<Array<ILoan>>([])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [statusModal, setStatusModal] = useState<ScreenStatus>(ScreenStatus.success)
  const [messageErrorModal, setErrorMessageModal] = useState("")
  const { register, handleSubmit, formState: { errors }, reset, setValue, } = useForm<IGroup>()
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


  const onSubmit = async (data: IGroup) => {
    try {
      setStatusModal(ScreenStatus.loading)
      configureNetwork()
      setStatusModal(ScreenStatus.success)

    } catch (error: any) {
      toast.error(error)
      setStatusModal(ScreenStatus.error)
      setErrorMessageModal(error.message)
    }
  }
  return (<>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className="h-full w-full flex flex-col items-end">
      <div className="w-full">
        <span className="text-primary font-bold text-2xl">Hola, de nuevo Usuario</span>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 rounded-lg p-2 my-3">
        <div className="cursor-pointer flex flex-col justify-center items-center p-5 w-[300px] h-[120px] bg-purple-300 rounded-2xl">
          <SiCashapp className="text-onBackground text-5xl mb-3" />
          <span className="font-bold text-onBackground font-2xl">Fondear prestamo</span>
        </div>
        <div className=" cursor-pointer flex flex-col justify-center items-center p-5 w-[300px] h-[120px] bg-blue-300 rounded-2xl">
          <SiCashapp className="text-onBackground text-5xl  mb-3" />
          <span className="font-bold text-onBackground font-2xl" onClick={() => setShowCreateGroup(true)}>Solicitar prestamo</span>
        </div>
      </div>
    </div>
    {
      showCreateGroup && (<ModalComponent
        statusModal={statusModal} messageError={messageErrorModal}
        cancelButton={false}
        onCancelAction={() => setShowCreateGroup(false)}
        onReintent={() => setStatusModal(ScreenStatus.success)}
        title={"Crear grupo para prestamo"}
      >
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 rounded-lg p-2 my-3">

            <FormInput label="Direcciónes de los miembros"
              name="addressStr" placeholder="separadas por ';': address;address" error={errors.addressStr} register={register('addressStr',
                {
                  required: {
                    value: true,
                    message: ""
                  },
                })} />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg p-2 my-3">

            <FormInput label="Monto de prestamo"
              name="amount" type="number" error={errors.amount} register={register('amount',
                {
                  required: {
                    value: true,
                    message: ""
                  },
                  min: {
                    value: 0.001,
                    message: ""
                  }
                })} />
            <FormInput label="Meses a pagar"
              name="amount"
              step="0.000001"
              type="number" error={errors.amount} register={register('amount',
                {
                  required: {
                    value: true,
                    message: ""
                  },
                  minLength: {
                    value: 1,
                    message: ""
                  },
                  maxLength: {
                    value: 36,
                    message: ""
                  }
                })} />
          </div>
          <div>
            <ButtonLarge type="submit">Guardar</ButtonLarge>
          </div>
        </form>

      </ModalComponent>)
    }
  </>)
}


export default HomePage