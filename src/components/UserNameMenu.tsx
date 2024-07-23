import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UserNameMenu = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-mainColor gap-2">
        <CircleUserRound className="text-mainColor" />
        {user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* Manage Restaurant  */}
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-mainColor"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>

        {/* User Profile */}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-mainColor">
            User Profile
          </Link>
        </DropdownMenuItem>

        <Separator />

        {/* Logout Button */}
        <DropdownMenuItem>
          <Button
            className="flex flex-1 font-bold bg-mainColor"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
