/* eslint-disable @typescript-eslint/no-explicit-any */
// import { lsUsername } from "@/common/constants";
import ButtonSmall from "@/components/ButtonSmall";
// import ButtonLargeSecondary from "@/components/ButtonLargeSeconday";
import { StatusButton } from "@/models/enums";
import { RootState } from "@/redux/store";
import { routeNames } from "@/router/routes";
import { FaBars } from "react-icons/fa";
// import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaWallet } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { lsWallet } from "@/common/constants";
import useAuthUserHandling from "@/hooks/useAuth";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

// Definimos los tipos de las props del Header
interface HeaderProps {
    toggleSidebar: () => void; // Función para abrir/cerrar el Sidebar
}


const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const title = useSelector((state: RootState) => state.global.titleHeader);
    const navigate = useNavigate()
    const [stutusButton, setStatusButton] = useState(StatusButton.Enabled)
    const [addressUser, setAddressUser] = useState('')
    const { connect, disconnect } = useAuthUserHandling()

    // const username = localStorage.getItem(lsUsername) ?? ''
    const signOut = () => {
        navigate(routeNames.initPage, { replace: true })
        disconnect()
        setAddressUser('')
    }
    // const handleGoBack = () => {

    //     if (window.history.length > 1) {
    //         navigate(-1);
    //     }

    // };
    const connectWallet = async () => {
        try {
            setStatusButton(StatusButton.Loading)
            await connect({
                "name": "Arbitrum Sepolia",
                "chainId": "421614",
                "chainIdHex": "0x66eee",
                "rpcUrl": [
                    "sepolia-rollup.arbitrum.io/rpc"
                ],
                "rpcBlockExplorerUrls": [
                    "https://sepolia.arbiscan.io"
                ]
            },)
            setAddressUser(localStorage.getItem(lsWallet) ?? '')
            setStatusButton(StatusButton.Enabled)

        } catch (error: any) {
            toast.error(error.message)
            setStatusButton(StatusButton.Enabled)
        }
    }
    const init = () => {
        const wallet = localStorage.getItem(lsWallet)
        setAddressUser(wallet ?? '')
    }
    useEffect(() => {
        init();

    }, [])
    return (
        <header className="flex justify-between items-center p-2 bg-light-background text-onPrimary bg-backgroundSecondary ">
            <button
                className="sm:hidden p-2 text-colorText "
                onClick={toggleSidebar}
            >
                <FaBars className="text-xl" />
            </button>
            <div className="flex items-center justify  w-2/3 rounded-2xl ">
                {/* <div className="bg-primary p-1 rounded-md mr-2 hover:bg-hoverPrimary">
                    <IoChevronBackOutline className="text-xl cursor-pointer text-onPrimary" onClick={handleGoBack} />
                </div> */}
                <span className="text-colorText font-bold text-3xl">{title}</span>
            </div>
            <div className=" flex flex-row items-center">
                <div className="w-10 h-10 rounded-full p-1 bg-hintColor">
                    <img className="w-full h-full rounded-full" src="https://robohash.org/stefan-one" alt="" />
                </div>
                {/* <div className="flex flex-row items-center">
                    <FaUser />
                    <span className="font-bold text-primary px-3">{username}</span>
                </div> */}
                <div className="ml-10">
                    <ButtonSmall
                        classname="text-ellipsis flex flex-row items-center justify-between bg-hintColor text-onPrimary hover:bg-hoverPrimary"
                        type="button" onClick={addressUser !== '' ? signOut : connectWallet}
                        status={stutusButton}>
                        {addressUser !== '' ? 'Desconectar' : 'Conectar'}
                        {addressUser !== '' ? <IoCheckmarkDoneCircle className="ml-2" />:<FaWallet className="ml-2" />}
                    </ButtonSmall>
                </div>
            </div>

        </header>
    );
};

export default Header;

