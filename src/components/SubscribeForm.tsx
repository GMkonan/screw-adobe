"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeUser } from "@/lib/actions/subscribeUser";
import { useFormState } from "react-dom";

const SubscribeForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, formAction] = useFormState(subscribeUser, null);
  return (
    <form action={formAction} className="flex space-x-2">
      <div className="flex w-full items-center justify-center gap-x-1">
        <Input
          name="email"
          className="max-w-lg flex-1 border-gray-900"
          placeholder="Enter your email"
          type="email"
        />
        <Button className="" type="submit">
          Subscribe
        </Button>
      </div>
      {message && <p className="pt-2 text-green-500">{message.message}</p>}
    </form>
  );
};

export default SubscribeForm;
