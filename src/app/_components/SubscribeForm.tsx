"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeUser } from "@/lib/actions/subscribeUser";
import { useFormState, useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Submit = () => {
  // useFormStatus needs to be used in a child component of the form component
  // https://react.dev/reference/react-dom/hooks/useFormStatus
  const { pending } = useFormStatus();
  return (
    <Button className="" type="submit" disabled={pending}>
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Please wait" : "Subscribe"}
    </Button>
  );
};

const SubscribeForm = () => {
  const [data, formAction] = useFormState(subscribeUser, null);
  return (
    <form action={formAction} className="flex flex-col space-x-2">
      <div className="flex w-full items-center justify-center gap-x-1">
        <Input
          name="email"
          className="max-w-lg flex-1 border-gray-900"
          placeholder="Enter your email"
          type="email"
        />
        <Submit />
      </div>
      {data && (
        <span
          className={cn("pt-2", data.error ? "text-red-500" : "text-green-500")}
        >
          {data.message}
        </span>
      )}
    </form>
  );
};

export default SubscribeForm;
