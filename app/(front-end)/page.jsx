
import ParticlesDemo from "@/components/font/ParticlesDemo";
import ShinyButton from "@/components/magicui/shiny-button";

export default function Home() {
  return (
    <div className="relative">
      <ParticlesDemo />
        <ShinyButton className=" ml-10 absolute top-96 sm:top-[420px] border border-black" text="อ่านเพิ่มเติม "  />
    </div>
  );
}
