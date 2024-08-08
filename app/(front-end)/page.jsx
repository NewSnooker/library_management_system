import ParticlesDemo from "@/components/fontend/ParticlesDemo";
import ShinyButton from "@/components/magicui/shiny-button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative ">
      <ParticlesDemo />
      <Link href="/books">
        <ShinyButton
          className=" ml-10 absolute top-96 sm:top-[420px] border border-black"
          text="อ่านเพิ่มเติม "
        />
      </Link>
    </div>
  );
}
