import React from "react";

interface MyButtonProps {
  text: string;
  onClick: () => void;
}

export default function MyButton({ text, onClick }: MyButtonProps) {
  return (
    <button onClick={onClick}>{text}</button>
  );
}