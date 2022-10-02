import React from "react";

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return <button className="dse-button-container">{label || 'Button'} label here</button>;
};

export default Button;
