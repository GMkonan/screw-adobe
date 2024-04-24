import SubscribeForm from "@/components/SubscribeForm";
import { cn } from "@/lib/utils";
import { db } from "@/server/db";
import { CheckCircle2Icon, CircleXIcon } from "lucide-react";

export default async function HomePage() {
  const sale = await db.query.onSale.findFirst();
  console.log("sale", sale);

  return (
    <section className="h-full w-full bg-background py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              {/* from-primary to-secondary text-transparent tracking-tighter bg-gradient-to-r bg-clip-text */}
              <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                Screw Adobe, Buy Affinity
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-zinc-100 md:text-xl">
                Get to know when Affinity Suite is on sale!
              </p>
            </div>
            <div
              className={cn(
                "w-full max-w-sm rounded-md border p-4",
                `${sale?.isOnSale === true ? "border-green-500 bg-green-300 text-green-800" : "border-red-500 bg-red-300 text-red-800"}`,
              )}
            >
              <span className="text-center text-xl font-bold">
                {sale?.isOnSale === true ? (
                  <span className="flex items-center justify-center gap-x-2">
                    On sale <CheckCircle2Icon className="h-6 w-6" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-x-2">
                    Not on sale <CircleXIcon className="h-6 w-6" />
                  </span>
                )}
              </span>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="md:text-md mx-auto max-w-[600px] text-muted-foreground dark:text-zinc-100">
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
