import { StatusButton } from "@/models/enums";

interface ButtonLargeSecondaryProps {
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  status?: StatusButton;
  onClick?: () => void;
  className?: string; // Clases CSS opcionales
}

const ButtonLargeSecondary: React.FC<ButtonLargeSecondaryProps> = ({ type, children, status=StatusButton.Enabled, onClick, className }) => {
  return (<>
    {status === StatusButton.Enabled && (
      <button className={`rounded-md  flex-row justify-center items-center w-full  h-12 px-5 text-sm bg-background border border-primary text-primary hover:bg-hintColor transition ${className}`} onClick={onClick} type={type}>{children}</button>)
    }
    {
      status === StatusButton.Loading && (
        <button className={`rounded-md flex flex-row justify-center items-center w-full h-12 px-5 bg-background
          text-primary hover:bg-background transition ${className}`}>
          <svg
            className="w-8 h-8 mr-2 animate-spin text-primary"
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


export default ButtonLargeSecondary;