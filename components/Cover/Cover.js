import Image from "next/image";

export const Cover = ({ children, background }) => {
  return (
    <div className="h-screen bg-slate-800 relative min-h-[400px] flex justify-center items-center text-white">
      <Image
        className="object-cover mix-blend-soft-light"
        alt="Cover"
        src={background}
        fill
        priority="high"
      />
      <div className="max-w-5xl z-10">{children}</div>
    </div>
  );
};