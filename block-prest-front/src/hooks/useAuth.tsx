/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSDK } from "@metamask/sdk-react";
// import { useDispatch } from "react-redux";
import { lsWallet } from "@/common/constants";
// import { changeDataAuth, cleanUser } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { routeNames } from "@/router/routes";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { IChain } from "@/models/chain.model";
// import { setShowModalNewUser, setShowModalUserExists } from "../../../redux/globalSlice";
const useAuthUserHandling = () => {
  const navigate = useNavigate();
  const { sdk, connected, connecting, provider } = useSDK();
  const [isSendingData, setIsSendingData] = useState(false);
  const configureNetwork = async (chain:IChain) => {
    try {
      const networkConfig = {
        chainId: chain.chainIdHex,
        chainName: chain.name,
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: chain.rpcUrl,
        blockExplorerUrls: chain.rpcBlockExplorerUrls,
      };
      console.info('========Network configuration:', networkConfig);
      try {
        const chainIdSelect = await provider?.request({ method: 'eth_chainId' });
        if (chainIdSelect === chain.chainId) {
          return
        }
        console.log('Switching network...');
        await provider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chain.chainIdHex }],
        });
        console.log('Switching network... success');
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await provider?.request({
              method: 'wallet_addEthereumChain',
              params: [networkConfig],
            });
            await configureNetwork(
              chain
            )
          } catch (error: any) {
            throw new Error('Failed to add'+' '+chain.name+' '+'network')
          }
        } else {
          throw new Error('Failed to switch to' +' '+chain.name+' '+'network')
        }
        throw new Error(switchError.message)
      }

      // provider?.setSDKProviderState({
      //   chainId: chain.chainIdHex, // Cambia este valor al ID de cadena que desees usar
      //   networkVersion: chain.chainId// Cambia este valor a la versión de red que desees usar
      // });
      console.log('Network and Chain configured.');
    } catch (error: any) {
      throw new Error(error.message)
    }
  };
  const disconnect = async () => {

    try {
      // localStorage.removeItem(lsId)
      sdk?.disconnect()
      // sdk?.terminate()
      // dispatch(cleanUser())
      return
    } catch (error: any) {
      toast.error(error.message)
    }
  }


  const saveData = async (account: string) => {
    try {
      localStorage.setItem(lsWallet, account)
      return;


    } catch (error: any) {
      console.log(error)
      sdk?.terminate();
      throw new Error(
        error.message
      )
    }
  };
  const connect = async (chain: IChain) => {
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
      await configureNetwork(chain)
      toast.success('User conectado con exito')
      localStorage.setItem(lsWallet, accounts[0])
    } catch (err: any) {
      sdk?.terminate()
      throw new Error(
        err.message
      )
    }
  }
  const validateSession = async (chain: IChain) => {
    try {
      const wallet = localStorage.getItem(lsWallet) ?? ''
      if (wallet === '' || wallet === undefined) {
        await disconnect()
        console.log('===== SESION INVALIDA ====== ')
        await connect(chain)
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
        return balanceFormat
      } else {
        return 0.0
      }

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const logout = async () => {

    try {
      sdk?.terminate()
      localStorage.clear()
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
