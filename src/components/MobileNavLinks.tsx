import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { SheetClose } from "./ui/sheet";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <SheetClose asChild>
        <Link
          to="/order-status"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          Order Status
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          to="/user-profile"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          User Profile
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          to="/manage-restaurant"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          Manage Restaurant
        </Link>
      </SheetClose>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Logout
      </Button>
    </>
  );
};

export default MobileNavLinks;
