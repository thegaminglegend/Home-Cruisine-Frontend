import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-mainColor" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            // Email Header
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-mainColor" />
              {user?.email}
            </span>
          ) : (
            <span>Welcome to test testing!</span>
          )}
        </SheetTitle>

        <Separator />

        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            // Navigation Links
            <MobileNavLinks />
          ) : (
            // Login Button
            <Button
              onClick={async () => loginWithRedirect()}
              className="flex-1 font-bold bg-mainColor"
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
