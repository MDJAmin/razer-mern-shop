import { GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";

export default function AddBtn({ content }) {
  const { lang } = useSelector((state) => state.i18n);
  return (
    <button
      className={`text-3xl flex gap-2 items-center fixed bottom-8 ${
        lang == "en" ? "right-2 sm:right-5" : "left-2 sm:left-5"
      } p-3 bg-light dark:bg-dark drop-shadow-lg rounded-lg text-dark dark:text-light hover:bg-soft-green dark:hover:bg-admin-green cursor-pointer duration-100 active:scale-[98%]`}
    >
      <GoPlusCircle />
      <span className="text-lg sm:text-xl">{content}</span>
    </button>
  );
}
