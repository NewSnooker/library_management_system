import SwitchTheme from "@/components/SwitchTheme";

export default function Home() {
  return (
    <div className="pt-4">
      <div>Hello world</div>
      <SwitchTheme/>
      <div className="dark:text-green-200 text-blue-800">Custom color</div>
    </div>
  );
}