import ParticlesDemo from "@/components/frontend/ParticlesDemo";
import ShinyButton from "@/components/magicui/shiny-button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative mt-8">
      <ParticlesDemo />
      <Link href="/home" className="px-4 sm:px-60">
        <ShinyButton
          className=" ml-10  absolute top-96 sm:top-[420px]  border border-custom-border text-custom-text"
          text="อ่านเพิ่มเติม "
        />
      </Link>
    </div>
  );
}
