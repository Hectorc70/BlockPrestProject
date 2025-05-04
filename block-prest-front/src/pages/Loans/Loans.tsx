/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router";
import { ScreenStatus } from "@/models/enums";
import { useEffect, useState } from "react";
import ButtonSmall from "@/components/ButtonSmall";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeTitle } from "@/redux/globalSlice";
import TableComponent from "@/components/Table";
import { FaEdit } from "react-icons/fa";
import { ILoan } from "@/models/lean.model";

const LoansPage: React.FC = () => {

  const navigate = useNavigate()


  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<Array<ILoan>>([])
  const [statusScreen, setStatusScreen] = useState<ScreenStatus>(ScreenStatus.success)
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 25
  // })

  const init = () => {
    try {
      dispatch(changeTitle("Mis prestamos"));
      getData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getData = async () => {
    try {
      setStatusScreen(ScreenStatus.loading)
      // const page = pagination.pageIndex + 1
      // const response = await TeacherService.getAll(1)
      // setItems(response)
      setStatusScreen(ScreenStatus.success)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    init()
  }, [])
  // useEffect(() => {
  //   getData()
  // }, [pagination])



  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Monto de prestamo', accessor: 'amount' },
    { Header: 'Estado del prestamo', accessor: 'status' },
  ];

  const actions = [
    {
      icon: FaEdit,
      label: 'Editar',
      onClick: (row: ILoan) => {
        // navigate(getTeacherDetailPath(row.uuid ?? '')) 
      }
    }
  ]

  return (<>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <div className="h-full w-full flex flex-col items-end">
      <div className="w-full">
        <TableComponent
          columns={columns}
          data={items} status={statusScreen}
          actions={actions}
          onSearch={(value: string) => console.log(value)}
          headerRightComponent={<ButtonSmall onClick={() => navigate('')}>Solicitar nuevo prestamo</ButtonSmall>}
        />
      </div>
    </div>
  </>)
}


export default LoansPage