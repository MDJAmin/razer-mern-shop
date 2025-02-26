import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isNewToFalse } from "../../Context/Slices/authSlice";

export default function Notification({ title, content }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/");
    dispatch(isNewToFalse())
  };

  return (
    <div className="w-full bg-light dark:bg-dark p-4 flex flex-col gap-y-2 rounded-lg">
      <h2 className="text-2xl">{title}</h2>
      <p className="opacity-70">{content}</p>
      <div className="flex gap-2">
        <button
          className="authBtn text-sm sm:text-lg w-32 rounded-lg mt-4 px-2"
          onClick={handleClick}
        >
          {t("makeAsRead")}
        </button>
        <button
          className="authBtn text-sm sm:text-lg w-44 rounded-lg mt-4 px-2"
          onClick={() => navigate("/")}
        >
          {t("exploreOurWebsite")}
        </button>
      </div>
    </div>
  );
}
