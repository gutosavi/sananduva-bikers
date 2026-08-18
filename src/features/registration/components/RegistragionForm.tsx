import { Button } from "@/components/ui/button";
import { ParticipantDetailsCard } from "./ParticipantDetailsCard";
import { RegistrationDetailsCard } from "./RegistrationDetailsCard";

export function RegistrationForm() {
  return (
    <form className="flex flex-col gap-5">
      <div className="space-y-6">
        <ParticipantDetailsCard />
        <RegistrationDetailsCard />
      </div>

      <Button
        className="whitespace-nowrap px-3 text-xs glow-orange font-semibold lg:px-4 lg:text-sm"
        type="submit"
      >
        Confirmar Inscrição
      </Button>
    </form>
  );
}
