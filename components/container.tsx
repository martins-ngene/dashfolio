import clsx from "clsx";

export function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
}: Omit<React.ComponentPropsWithoutRef<T>, "as" | "className"> & {
  as?: T;
  className?: string;
}) {
  let Component = as ?? "div";

  return (
    <Component className={clsx(className, "min-h-full w-full")}>
      {children}
    </Component>
  );
}

Container.Header = function ContainerHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header className="bg-white shadow w-full">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 w-full">
          {children}
        </h1>
      </div>
    </header>
  );
};

Container.Main = function ContainerMain({
  children, className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={
        clsx("mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 w-full", className)
      }
    >
      {children}
    </main>
  );
};

Container.Grid = function ContainerGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full flex justify-between">{children}</div>;
};

Container.ColLeft = function ContainerColLeft({
  children, className
}: {
  children: React.ReactNode; className?: string;
}) {
  return <div className={clsx("w-[25%]", className)}>{children}</div>;
};

Container.ColRight = function ContainerColRight({
  children, className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "w-full sm:w-[70%] rounded border border-zinc-400 grid grid-cols-1 sm:grid-cols-2 gap-6 p-8",
        className
      )}
    >
      {children}
    </div>
  );
};
