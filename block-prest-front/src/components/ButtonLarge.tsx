import { StatusButton } from "@/models/enums";

interface ButtonLargeProps {
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  status?: StatusButton;
  onClick?: () => void;
}

const ButtonLarge: React.FC<ButtonLargeProps> = ({ type, children, status=StatusButton.Enabled, onClick }) => {
  return (<>
    {status === StatusButton.Enabled && (
      <button className="cursor-pointer rounded-2xl flex-row justify-center items-center w-full  h-12 px-5 text-sm bg-primary text-onPrimary hover:bg-hoverPrimary transition" onClick={onClick} type={type}>{children}</button>)
    }
    {
      status === StatusButton.Loading && (
        <button className="rounded-2xl flex flex-row justify-center items-center w-full h-12 px-5 bg-primary text-onPrimary hover:bg-hoverPrimary transition"> 
        <svg
          className="w-8 h-8 mr-2 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          type="button"
        >
          <circle
            className="opacity-75"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>

        </button>
      )
    }
  </>
  )
}


export default ButtonLarge;