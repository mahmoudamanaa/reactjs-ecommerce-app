import React, {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface SidebarInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  closeHandler: () => void;
}

export const SidebarContext = createContext<SidebarInterface>({
  isOpen: false,
  setIsOpen: () => {},
  closeHandler: () => {},
});

const SidebarProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, closeHandler }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
