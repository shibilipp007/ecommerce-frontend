import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, id, error, ...props }, ref) {
  return (
    <div className="mb-3">
      <label className="block mb-1 text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        ref={ref}
        className="block w-full h-9 border rounded border-gray-400 p-2 outline-none transition-all shadow-[0_1px_0_rgba(255,255,255,.5),0_1px_0_rgba(0,0,0,.07)_inset] focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"
        id={id}
        {...props}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
});

export default Input;
