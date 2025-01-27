export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <h1 className="text-3xl lg:text-4xl !leading-tight font-bold mx-auto max-w-xl text-center">
          Dashfolio
        </h1>
      </div>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-4xl text-center">
        Everything you need to manage your online presence in one place
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
