import ReactDOM from 'react-dom/client'

import { MetaMaskProvider } from "@metamask/sdk-react";
import { infuraApiKey } from '@/common/constants.ts'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import App from './App.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: "BlockPrest",
          url: '',
        },
        infuraAPIKey: infuraApiKey,
        preferDesktop: true,
        checkInstallationImmediately: true,
        extensionOnly: true,

      }}
    >

      <App />
    </MetaMaskProvider>
  </Provider>

)