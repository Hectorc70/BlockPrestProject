import React from 'react';
import ButtonLarge from '@/components/ButtonLarge';
import { ScreenStatus, StatusButton } from '@/models/enums';
import ButtonLargeSecondary from '@/components/ButtonLargeSeconday';
import { CiCircleRemove } from "react-icons/ci";
import { motion } from "framer-motion"
import LoaderComponent from './Loader';
import ButtonSmall from './ButtonSmall';

interface ModalComponentProps {
  children: React.ReactNode;
  title: string
  onCancelAction?: () => void;
  onConfirmAction?: () => void;
  childConfirmButton?: React.ReactNode;
  cancelButton?: boolean
  width?: string
  statusModal?: ScreenStatus
  messageError?: string
  onReintent?: () => void;
}


const ModalComponent: React.FC<ModalComponentProps> = ({ children,
  title, childConfirmButton, cancelButton = true,
  onCancelAction, onConfirmAction,
  statusModal = ScreenStatus.error,
  messageError = 'Ocurrio algo inesperado', onReintent }) => {

  return (
    <div className="min-h-screen absolute">
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
        < motion.div initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }} className={`bg-backgroundSecondary rounded-lg shadow-lg p-5 w-full max-h-3/4  sm:w-1/2 overflow-auto`}>
          {/* Encabezado */}
          <div className='px-4  text-lg font-semibold text-colorText  flex justify-between'>
            <span className='font-bold text-colorText'>{title}</span>
            <CiCircleRemove className='cursor-pointer' onClick={onCancelAction} />
          </div>

          {/* Contenido */}
          <div className="px-4 py-6 bg-hintColor rounded-md my-5">
            {statusModal === ScreenStatus.success && children}
            {statusModal === ScreenStatus.error && <div className="w-full py-10 flex  flex-col justify-center items-center">
              <span className="text-colorText text-sm text-center mt-5">{messageError}</span>
              <ButtonSmall type="button" onClick={onReintent} children="Reintentar" />
            </div>}
            {statusModal === ScreenStatus.loading && <div className={`w-full`}> <LoaderComponent /></div>}

          </div>
          {/* Footer */}
          {statusModal !== ScreenStatus.loading && <div className="flex justify-end px-4 py-2 space-x-1">
            {cancelButton && <div>
              <ButtonLargeSecondary type="button" onClick={onCancelAction} status={StatusButton.Enabled}>Cerrar</ButtonLargeSecondary>
            </div>}
            {onConfirmAction && childConfirmButton === undefined ? <div>
              <ButtonLarge type="button"
                onClick={onConfirmAction}
                status={StatusButton.Enabled}>Aceptar</ButtonLarge>
            </div> : childConfirmButton}
          </div>}
        </motion.div>




      </div>
    </div>
  );
};

export default ModalComponent;