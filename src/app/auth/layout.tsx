import React from "react";

const AuthLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
