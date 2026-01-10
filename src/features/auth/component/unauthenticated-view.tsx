import {
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ShieldAlertIcon, LogIn } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const UnauthenticatedView = () => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <ItemContent className="flex max-w-md flex-col items-center gap-4 rounded-lg border bg-background p-6 text-center shadow-sm">
        <ItemMedia className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlertIcon className="h-6 w-6 text-destructive" />
        </ItemMedia>

        <ItemTitle className="text-lg font-semibold">
          Sign in required
        </ItemTitle>

        <ItemDescription className="text-sm text-muted-foreground">
          You need to sign in to access this content.
        </ItemDescription>

        <SignInButton mode="modal">
          <Button className="mt-2 flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </SignInButton>
      </ItemContent>
    </div>
  );
};
