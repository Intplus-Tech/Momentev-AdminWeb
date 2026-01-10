import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  url?: string;
  className?: string;
  variant?: "default" | "white" | "mixed";
};

const Logo: React.FC<LogoProps> = ({
  url = "/assets/svg/logo.svg",
  className,
  variant = "default",
}) => {
  const imageSrc =
    variant === "white"
      ? "/assets/svg/logo-white.svg"
      : variant === "mixed"
      ? "/assets/svg/logo-mixed.svg"
      : url;

  return (
    <Link href="/" className={className}>
      <Image src={imageSrc} alt="Momentev logo" width={160} height={40} />
    </Link>
  );
};

export default Logo;
