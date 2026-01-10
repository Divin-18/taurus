import {
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Loader2 } from "lucide-react";

export const AuthLoadingView = () => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <ItemContent className="flex max-w-md flex-col items-center gap-3 rounded-lg border bg-background p-6 text-center shadow-sm">
        <ItemMedia className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </ItemMedia>

        <ItemTitle className="text-lg font-semibold">
          Authenticating
        </ItemTitle>

        <ItemDescription className="text-sm text-muted-foreground">
          Please wait while we verify your identity…
        </ItemDescription>
      </ItemContent>
    </div>
  );
};
