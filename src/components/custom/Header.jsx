import React from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between shadow-md z-10 px-5 p-2">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/sort">
                <NavigationMenuTrigger>Sort Algorithyms</NavigationMenuTrigger>
              </Link>
              <Link to="/graph">
                <NavigationMenuTrigger>Graph Algorithyms</NavigationMenuTrigger>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default Header;
