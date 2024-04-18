import SubscribeForm from "@/components/SubscribeForm";
import { cn } from "@/lib/utils";
import { db } from "@/server/db";

export default async function HomePage() {
  const sale = await db.query.onSale.findFirst();
  console.log("sale", sale);

  return (
    <section className="h-screen w-full bg-black py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                Screw Adobe, Buy Affinity
              </h1>
              <p className="mx-auto max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100">
                Get to know when Affinity Suite is on sale!
              </p>
            </div>
            <div
              className={cn(
                "text-xl font-bold",
                `${sale?.isOnSale === true ? " text-green-700" : "text-red-700"}`,
              )}
            >
              {sale?.isOnSale === true
                ? "On Sale :)"
                : "Current not on sale :("}
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="md:text-md mx-auto max-w-[600px] text-zinc-200 dark:text-zinc-100">
                Receive an email when Affinity Suite is on sale.
              </div>
              <SubscribeForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
