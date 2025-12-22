import Link from "next/link";

const page = () => {
  return (
     <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>Skills</p>
      <Link href="/" className="mt-10">
        Back to Home
      </Link>
    </div>
  );
};

export default page;
