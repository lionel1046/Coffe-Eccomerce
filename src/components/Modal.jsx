import { useEffect, useRef, useState } from "react";

export default function Modal({ children, onClose }) {
  const ref = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    setShow(true);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      setShow(false);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      className={`fixed flex justify-center items-center w-full h-screen z-50 p-12 top-0 right-0 bg-black/50 transition-opacity duration-200 ${
        show ? "opacity-100 " : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-lg max-h-full overflow-y-auto transform transition-transform duration-200 ${
          show ? "scale-100 " : "scale-90"
        }`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
