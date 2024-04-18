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
      <Input
        name="email"
        className="max-w-lg flex-1 border-gray-900 bg-gray-800 text-white"
        placeholder="Enter your email"
        type="email"
      />
      <Button className="bg-white text-black" type="submit">
        Subscribe
      </Button>
      {message && <p className="text-red-700">{message.message}</p>}
    </form>
  );
};

export default SubscribeForm;
