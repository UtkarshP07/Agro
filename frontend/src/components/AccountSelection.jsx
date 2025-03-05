import { useState } from "react";

const AccountSelection = ({ onAccountSelect }) => {
  const [accountType, setAccountType] = useState("");

  const handleSelection = (name) => {
    setAccountType(name);
    onAccountSelect(name); // Pass selection to parent component
  };

  return (
    <><div className="mt-2"><h1 className="text-gray-500 dark:text-gray-300 font-semibold">Select Your Category :</h1></div>
    <div className="flex justify-center mt-2">
      <div className="mt-1 md:flex md:items-center md:-mx-2">
        {["Farmer", "Manufacturer", "Transporter"].map((name) => (
          <button
            key={name}
            className={`font-semibold flex justify-center w-full px-6 py-3 mt-2 md:mt-0 md:w-auto md:mx-2 rounded-md focus:outline-none transition-all ${
              accountType === name
                ? "bg-[#3D8D7A] text-white"
                : "border border-[#3D8D7A] text-[#3D8D7A] dark:border-[#3D8D7A] dark:text-[#3D8D7A]"
            }`}
            onClick={() => handleSelection(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div></>
    
  );
};

export default AccountSelection;