import ThreeDCardDemo from "../component/ThreeDCardDemo";
import cross from '@/public/assets/both1.png';
import circle from '@/public/assets/both2.png';

export default function Option() {
  return (
    <main className="flex flex-col justify-evenly items-center min-h-screen bg-tic-tac-toe bg-cover bg-center">
      <div className="uppercase text-3xl md:text-5xl mt-4 text-amber-500">Select any one</div>
      <div className="flex flex-wrap w-full justify-center md:justify-evenly items-center gap-8">
        <ThreeDCardDemo src={circle} alt="circle" data="O"/>
        <ThreeDCardDemo src={cross} alt="cross" data="X"/>
      </div>
    </main>
  );
}
