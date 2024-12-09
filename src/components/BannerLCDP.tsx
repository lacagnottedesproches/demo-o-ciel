import Image from "next/image";
import Logo from "../../public/logo-visual+text.png";

const BannerLCDP = () => {
  return (
    <div className="p-5 flex flex-col gap-5 items-center w-full">
      <div className="flex flex-row items-center gap-5 text-sm">
        <p className="text-gray-500">{"En partenariat avec "}</p>
        <Image width={409 / 3} height={166 / 3} src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default BannerLCDP;
