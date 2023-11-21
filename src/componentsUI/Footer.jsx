import LinkedInIcon from "../assets/LinkedInIcon.png";
import { useRef, useEffect } from "react";
import logoCompany from "../../public/logoCompany.svg"

function Footer() {
  const year = new Date().getFullYear();
  const logoLinkedin = useRef();
  const logo = useRef();
  useEffect(() => {
    logoLinkedin.current.src = LinkedInIcon;
    logoLinkedin.current.title = "Go LinkedIn LucasDiaz";
    logo.current.src = logoCompany;
  }, []);

  const sendLinkedin = () => {
    const urlLinkedin = 'https://www.linkedin.com/in/lucas-diaz-2a137979/';
    window.open(urlLinkedin, '_blank');
  };

  return (
    <>
      <footer className="border border-slate-800 bg-slate-200 rounded-md dark:bg-slate-800 dark:border-slate-200 bottom-0 left-0 right-0 z-30">
        <div className="w-full mx-auto max-w-screen-xl p-2 md:flex md:items-center md:justify-between">
        <img
              className="w-12 h-12 mr-1"
              ref={logo}              
            />
          <span className="text-sm text-gray-800 sm:text-center dark:text-gray-200">
            ©{year} Diaz Lucas ™
          </span>
          <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <img
              className="w-7 h-7 cursor-pointer mr-1"
              ref={logoLinkedin}
              onClick={sendLinkedin}
              
            />
            <a
              href="https://www.linkedin.com/in/lucas-diaz-2a137979/"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:text-center dark:text-gray-200"
            >
              View Linkedin
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
