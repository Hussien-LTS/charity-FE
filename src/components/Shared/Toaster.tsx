// Toast.tsx
import React, { forwardRef } from "react";

interface ToastProps {
  type?: string;
  placement?: string;
  duration?: number;
  children: React.ReactNode;
  onClose: () => void;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const { children, onClose, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      style={{
        padding: 10,
        background: "#fff",
        borderRadius: 4,
        marginTop: 10,
      }}
    >
      {children}
      <hr />
      <button onClick={onClose}>Close</button>
    </div>
  );
});

export default Toast;
