"use client"

import { AuthLoadingView } from "@/features/auth/component/authLoading-view";
import { UnauthenticatedView } from "@/features/auth/component/unauthenticated-view";
import { ClerkProvider,SignInButton,SignUpButton,useAuth, UserButton} from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Provider({ children }: { children: React.ReactNode }) {
  return (<ClerkProvider>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <Authenticated>
      {children}

<UserButton/>
      </Authenticated>
      <Unauthenticated>
       <UnauthenticatedView/>
     </Unauthenticated>
      <AuthLoading>
       <AuthLoadingView/>
      </AuthLoading>
        </ThemeProvider>
      </ConvexProviderWithClerk>
      </ClerkProvider>)
}
