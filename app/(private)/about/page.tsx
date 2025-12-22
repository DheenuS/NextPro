import { Modals } from "../../components/Modals";

const page = () => {

  return (
    <div className="flex flex-col text-center min-h-screen -mt-20 items-center justify-center font-sans py-4 gap-6 px-4 sm:px-6 md:px-8">
      <p>Hi Dheenu, I'm Next JS</p>
      <p>Click the below button to know more about me</p>
      <Modals />
    </div>
  );
};

export default page;
