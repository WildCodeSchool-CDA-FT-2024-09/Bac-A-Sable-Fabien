import { ReactNode } from "react";

type ButtonPropsType = {
  children: ReactNode;
  variant: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = "info", ...props }: ButtonPropsType) => {
  let cssType = "text-sky-50 bg-sky-700 hover:bg-sky-600";
  if (variant === "danger") {
    cssType = "text-red-600 bg-red-200 hover:bg-red-300";
  } else if (variant === "warning") {
    cssType = "text-yellow-800 bg-yellow-200 hover:bg-yellow-300";
  } else if (variant === "success") {
    cssType = "text-green-800 bg-green-200 hover:bg-green-300";
  } else if (variant === "secondary") {
    cssType = "text-gray-800 bg-gray-200 hover:bg-gray-300";
  }

  // if (props?.href) {
  //   return (
  //     <a className={`rounded px-2 py-1 ${cssType}`} {...props}>
  //       {children}
  //     </a>
  //   );
  // }

  return (
    <button className={`rounded px-2 py-1 ${cssType}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
