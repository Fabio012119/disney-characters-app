import Form from "@/components/Form";
import DisneyImage from "@/components/DisneyImage";

const Login = () => {
  return (
    <main className="flex max-xl:flex-col xl:flex-row min-h-[100svh]">
      <div
        className="flex items-center justify-center bg-slate-50
                      w-full xl:w-1/2
                      min-h-[100svh] xl:min-h-[100svh] 
                      p-6 sm:p-8 lg:p-10"
      >
        <div className="w-full max-w-md flex flex-col items-center">
          <DisneyImage
            className="block xl:hidden w-40 sm:w-48 md:w-56 h-auto object-contain mb-6"
            device="mobile"
          />
          <Form />
        </div>
      </div>

      <div
        className="hidden xl:flex items-center justify-center
                      w-1/2 min-h-[100svh]
                      bg-gradient-to-r from-[#0A2A6C] via-[#0F3EBD] to-[#1A73FF]
                      p-6 lg:p-10"
      >
        <DisneyImage
          className="invert w-full max-w-md h-auto object-contain"
          device="desktop"
        />
      </div>
    </main>
  );
};

export default Login;
