import { SlideComponents } from "./SlideComponents";

function BodyDashbord() {
  return (
    <div className="max-w-[100vw] sm:w-full sm:box-content flex flex-col items-center mx-auto">
      <div className=" m-auto max-w-[calc(100vw-20px)] sm:max-w-screen-xl  flex justify-center items-center ">
        <video autoPlay muted loop playsInline>
          <source
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/65fc0be058c63_HeaderAppUnTrucdeJESUS.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>

      <a
        href="https://trucdejesus.smartcommunity.biz/f/bDoqa"
        className="mt-4 mx-auto px-[40px] py-[10px] rounded-[80px] bg-[#f8e71c] font-bold cursor-pointer buttonConnect flex flex-col items-center transition-colors"
      >
        <p className="text-[18px] sm:text-[20px] font-sans text-center ">
          Déjà Abonné(e) ?
        </p>
        <p className="text-center text-[#bd10e0] text-[16px] sm:text-[18px] brightness-200">
          Connecte-toi ici
        </p>
      </a>

      <div className="w-full flex flex-col items-center mt-10 gap-8 abonnement">
        <a
          href="https://www.trucdejesus.com/rejoindre"
          className="text-center flex flex-col justify-center text-[24px] sm:text-[28px] font-extrabold cursor-pointer pp"
        >
          Pas encore Abonné(e) ?
        </a>
        <div className="text-[#000] w-[40px] text-center rotate-180 self-center triangle -mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-triangle"
          >
            <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          </svg>
        </div>
        <div className="w-full flex flex-col items-center">
          <a
            href="https://trucdejesus.com/rejoindre"
            className="flex flex-col items-center -mt-[32px] w-[311px] h-[500px] "
          >
            <img
              src="https://d1yei2z3i6k35z.cloudfront.net/5322770/66e14cea5fe8d_Capturedecran2024-03-27a18.13.05.png"
              alt="Accès rapide Réseau social 100% JESUS"
              loading="lazy"
              width={311}
              height={500}
              className="cursor-pointer rounded-lg shadow-2xl bg-white border-t-white border-solid border-[5px]"
            />
          </a>
        </div>
      </div>
      <div className="relative w-full mt-8">
        <a
          href="https://www.trucdejesus.com/donateurs-engages"
          className="relative text-center px-6 py-4 flex flex-col justify-center rounded-[45px] w-[311px] bg-[#e6c068] mx-auto z-[50] -translate-x-1 buttonAbonnement"
        >
          <p className="text-[18px] font-bold ">Deviens Donateur Engagé</p>
          <p className="text-white">En savoir plus</p>
        </a>
        <a
          href="https://www.trucdejesus.com/donateurs-engages"
          className="w-[100vw] sm:w-[434px] flex justify-center text-center text-[18px] font-bold pt-6 mx-auto -translate-y-[110px]"
        >
          <img
            src="https://d1yei2z3i6k35z.cloudfront.net/5322770/66e186a1cd0cb_GLOIREADIEU.png"
            alt="Devenir Donateur Engagé Un Truc de JÉSUS !"
            width="434"
            loading="lazy"
          />
        </a>
      </div>
      <div className="w-[98vw] sm:w-full self-center sm:px-5 flex flex-col items-center h-[200px]  sm:h-[400px] mx-auto">
        <div className="partQrcode w-full flex-[200px]  sm:flex-[400px] shadow-inner flex items-center justify-center ">
          <a
            href="https://www.trucdejesus.com"
            className=" text-[11px] sm:text-[16px] font-medium bg-black text-white py-2 sm:py-3 px-4 rounded-[6px] sm:rounded-[10px]  buttonRetourSurSitePublic"
          >
            Retour site Public
          </a>
        </div>
      </div>
      <div className="w-full flex flex-col items-center -translate-y-8 font-semibold text-[18px] ">
        <div className="flex flex-col">
          <p className="text-center">
            <span className="text-[#9b59b6] ">Partage l'Appli</span>
          </p>
          <p className="text-center">
            <span className="text-[#9b59b6]">✨&nbsp;Un Truc de JÉSUS !</span>
            <span className="text-[#cc9933]">&nbsp;</span>✨
          </p>
        </div>
        <ul className="text-white flex items-center gap-5 socialIcon mt-5">
          <li className="bg-black ">
            <a
              href="https://www.facebook.com/login/?locale=fr_FR"
              title="facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </li>
          <li className="bg-black">
            <a href="https://www.tiktok.com/login" title="tiktok">
              <svg
                fill="#fff"
                width="18px"
                height="18px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>tiktok</title>
                <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
              </svg>
            </a>
          </li>
          <li className="bg-black">
            <a href="https://www.linkedin.com/login/fr" title="Linkedln">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </li>
          <li className="bg-black">
            <a
              href="https://www.instagram.com/accounts/login/"
              title="instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full text-center py-2 font-semibold">
        <p>
          <span className="text-[14px] sm:text-[18px] ">
            Application créée avec et pour{" "}
            <span className="text-[#f8e71c]">JÉSUS</span>
            <span className="text-[#f1c40f]">&nbsp;</span>✨
          </span>
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        <SlideComponents />
      </div>
    </div>
  );
}

export { BodyDashbord };
