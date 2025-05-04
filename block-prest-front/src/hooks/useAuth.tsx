/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSDK } from "@metamask/sdk-react";
// import { useDispatch } from "react-redux";
import { lsAddress, lsBalance, lsId } from "@/core/constants/constantsLocalStorage";
// import { changeDataAuth, cleanUser } from "@/redux/userSlice";
import toast from "react-hot-toast";
import UsersService from "@/services/usersService";
import { UserModel } from "@/models/userModel";
import { chainId, networkName } from "@/common/constants";
import { useNavigate } from "react-router";
import { routeNames } from "@/router/routes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { setShowModalNewUser, setShowModalUserExists } from "../../../redux/globalSlice";
const useAuthUserHandling = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sdk, connected, connecting, provider } = useSDK();
  const [isSendingData, setIsSendingData] = useState(false);
  const configureNetwork = async () => {
    try {
      const networkConfig = {
        chainId: chainId,
        chainName: networkName,
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: [`https://eth-sepolia.public.blastapi.io`,'https://api.zan.top/eth-sepolia'],
        blockExplorerUrls: ['https://sepolia.explorer.zksync.io'],
      };
      try {
        const chainIdSelect = await provider?.request({ method: 'eth_chainId' });
        if (chainIdSelect === chainId) {
          return
        }
        await provider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await provider?.request({
              method: 'wallet_addEthereumChain',
              params: [networkConfig],
            });
            await configureNetwork()
          } catch (error: any) {
            throw new Error('Failed to add Polygon Mumbai network')
          }
        } else {
          throw new Error('Failed to switch to Polygon Mumbai network')
        }
        throw new Error(switchError.message)
      }

      provider?.setSDKProviderState({
        chainId: chainId, // Cambia este valor al ID de cadena que desees usar
        networkVersion: '11155111' // Cambia este valor a la versión de red que desees usar
      });
      console.log('Network and Chain configured.');
    } catch (error: any) {
      throw new Error(error.message)
    }
  };
  const disconnect = async () => {

    try {
      localStorage.removeItem(lsId)
      sdk?.disconnect()
      // sdk?.terminate()
      dispatch(cleanUser())
      return
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  const saveData = async (account: string, uuid_referred: string = '') => {
    try {
      const response = await UsersService.createUser('default', account, uuid_referred);
      console.log(response);

      const balance = await getBalanceAddress(account);
      const model = new UserModel(
        response.id,
        response.username.slice(0, 5),
        response.address,
        balance ?? '0.0',
        response.id_membership,
        0,
        0,
        0, response.uuid_user,
        response.balance_rewards,
        response.total_referreals_users,
        response.commisions_rewards_referreals ?? 0.0,
        response.commisions_rewards_referreals_available ?? 0.0,
        response.commisions_rewards_referreals_total ?? 0.0,
        response.membership_name,
        response.membership_image,
        response.min_rwafi_ratio_in_staking,
        response.max_rwafi_ratio_in_staking,
        response.next_membership,
        response.next_membership_image,
        response.balance_tokens_nova,
        response.balance_staking_tokens,
      );

      dispatch(changeDataAuth(model));
      localStorage.setItem(lsId, response.id);
      localStorage.setItem(lsAddress, response.address);
      // Mostrar el modal si es un nuevo usuario
      console.log(response)
      // debugger
      if (response.is_new_user) {
        // dispatch(setShowModalNewUser(true));
      } else if (uuid_referred != '') {
        // dispatch(setShowModalUserExists(true))
      }
      // } else if (uuid_referred != '') {
      //   console.log('Show User Exists')
      //   setShowModalUserExists(true)
      // }

      return;


    } catch (error: any) {
      console.log(error)
      sdk?.terminate();
      // toast.error(error.message);
      throw new Error(
        error.message
      )
    }
  };
  const connect = async (uuid_referred: string = '') => {
    try {
      setIsSendingData(true)
      console.log(sdk)
      const accounts = await sdk?.connect();
      console.log(accounts)
      if (!accounts) {
        sdk?.terminate()
        throw new Error(
          'Error al conectar'
        )
      }
      await configureNetwork()


      const response = await saveData(accounts?.[0], uuid_referred)
      console.log(response)
      // toast.success('User logged in correctly in nova')
    } catch (err: any) {
      sdk?.terminate()
      throw new Error(
        err.message
      )
    }
  }
  const validateSession = async () => {
    try {
      const idUser = localStorage.getItem(lsId) ?? ''
      if (idUser === '' || idUser === undefined) {
        await disconnect()
        console.log('===== SESION INVALIDA ====== ')
        // await connect()
        // navigate(routesNames.uknow, { replace: true })
        return
      }

      // const balance = await getBalanceAddress(response.address)
      // dispatch(changeDataAuth(model))
      // localStorage.setItem(lsId, response.id)
      console.log('===== SESION VALIDA ====== ')
    } catch (error: any) {
      await disconnect()
    }
  }

  const getBalanceAddress = async (address: string) => {
    try {
      const balanceInWei = await provider?.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      }) as string
      const balanceInEther = (parseInt(balanceInWei, 16) / Math.pow(10, 18)).toString();
      const balanceFormat = balanceInEther.toString()
      if (balanceFormat !== 'NaN') {
        localStorage.setItem(lsBalance, balanceFormat)
        return balanceFormat
      } else {
        const balanceLs = localStorage.getItem(lsBalance) ?? '0.0'
        return balanceLs
      }

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const logout = async () => {

    try {
      disconnect()
      navigate(routeNames.initPage, { replace: true })
    } catch (error: any) {
      toast.error(error)
    }
  }


  const handleAccountsChanged = async (accounts: any) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      await saveData(accounts[0]);
    }
  }
  useEffect(() => {
    console.log("isSendingData updated:", isSendingData);
    if (!sdk) {
      console.log("SDK is undefined");
    } else {
      console.log("SDK initialized successfully", sdk);
    }
  }, [isSendingData]);
  return {
    disconnect,
    connect,
    validateSession,
    getBalanceAddress,
    configureNetwork,
    logout,
    handleAccountsChanged,
    isSendingData,
    connected,
    connecting,
    provider,
    sdk
  }
}

export default useAuthUserHandling
