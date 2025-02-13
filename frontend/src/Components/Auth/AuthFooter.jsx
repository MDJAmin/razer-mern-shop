import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

export default function AuthFooter() {
  return (
    <div className="text-center dark:text-light text-gray">
      <p>Razer | All Rights Reserved</p>
      <div className="flex justify-center items-center mt-2 text-3xl gap-1">
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="hover:opacity-70 duration-100"
        >
          <AiOutlineYoutube className="text-[40px]" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="hover:opacity-70 duration-100"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.x.com/"
          target="_blank"
          className="hover:opacity-70 duration-100"
        >
          <RiTwitterXFill />
        </a>
      </div>
    </div>
  );
}
