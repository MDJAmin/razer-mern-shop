import React from "react";

const data = [
  {
    _id: "123456789",
    fullName: "john doe mirza ali",
    role: "user",
    idCard: "0912345678",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    role: "admin",
    phone: "09305009040",
    email: "john-doegholamhoseini@gmail.com",
    isActive: true,
    isComplete: false,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    phone: "09305009040",
    role: "admin",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    role: "user",
    idCard: "0912345678",
    phone: "09305009040",
    email: "alirezaghanbari@yahoo.com",
    isActive: false,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    role: "admin",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: false,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    phone: "09305009040",
    role: "user",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    phone: "09305009040",
    role: "user",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: false,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    role: "user",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    role: "user",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    role: "user",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    role: "user",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    role: "user",
    idCard: "0912345678",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: false,
  },
  {
    _id: "123456789",
    fullName: "john doe",
    idCard: "0912345678",
    role: "admin",
    phone: "09305009040",
    email: "john-doe@gmail.com",
    isActive: true,
    isComplete: true,
  },
];

export default function Users() {
  return (
    <div className="overflow-x-auto scrollbar-hide p-4 w-full text-[16px]">
      <form className="mb-2">
        <input
          type="text"
          className="authInp text-lg py-2"
          placeholder="Search For User: UserId"
        />
      </form>
      <table className="w-full border-collapse dark:bg-admin-green rounded-lg">
        <thead>
          <tr className="text-left text-dark dark:text-light text-lg">
            <td className="p-3 py-8 whitespace-nowrap">User ID</td>
            <td className="p-3 py-8 whitespace-nowrap">Role</td>
            <td className="p-3 whitespace-nowrap">Full Name</td>
            <td className="p-3">Email</td>
            <td className="p-3 whitespace-nowrap">ID Card</td>
            <td className="p-3">Phone</td>
            <td className="p-3">Complete</td>
            <td className="p-3 whitespace-nowrap">Is Active</td>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="border-t border-gray dark:border-light">
              <td className="p-3 text-dark dark:text-light tracking-wide cursor-pointer hover:underline">
                {user._id}
              </td>
              <td className="p-3 text-dark opacity-90 dark:text-light tracking-wide cursor-pointer hover:underline" title="Change Role">
                {user.role ? user.role : "Null"}
              </td>
              <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap">
                {user.fullName ? user.fullName : "Null"}
              </td>
              <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap">
                {user.email ? user.email : "Null"}
              </td>
              <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                {user.idCard ? user.idCard : "Null"}
              </td>
              <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                {user.phone ? user.phone : "Null"}
              </td>
              <td
                className={`p-3 tracking-wide whitespace-nowrap ${
                  user.isComplete
                    ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                    : "text-error"
                }`}
              >
                {user.isComplete ? "Complete" : "Not Complete"}
              </td>
              <td
                className={`p-3 tracking-wide whitespace-nowrap ${
                  user.isActive
                    ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                    : "text-error"
                }`}
              >
                {user.isActive ? "Active" : "Not Active"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
