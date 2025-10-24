import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // MOD: Imported Badge

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, Package, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import CustomerNotifications from "@/components/customer/CustomerNotifications";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { customer, isAuthenticated, logout } = useCustomerAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Navigate to home if not already there
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <nav className="bg-white/80 shadow-sm sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-4"
              onClick={scrollToTop}
            >
              <img
                src={logo}
                alt="Camco Prefab Logo"
                className="h-12 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-blue-950 transition-colors duration-300 hover:text-blue-600">
                Camco Prefab
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-prefab-600 font-medium transition-all duration-300 hover:scale-105 story-link"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-prefab-600 font-medium transition-all duration-300 hover:scale-105 story-link"
            >
              Shop
            </Link>
            <Link
              to="/projects"
              className="text-gray-700 hover:text-prefab-600 font-medium transition-all duration-300 hover:scale-105 story-link"
            >
              Projects
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-prefab-600 font-medium transition-all duration-300 hover:scale-105 story-link"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-prefab-600 font-medium transition-all duration-300 hover:scale-105 story-link"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className="text-gray-700 hover:text-prefab-600 font-medium transition-all duration-300 hover:scale-105 story-link"
            >
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && customer ? (
              <div className="flex items-center space-x-3">
                {/* Bell Icon */}
                <div className="transition-all duration-300 hover:scale-110">
                  <CustomerNotifications />
                </div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-prefab-600 text-white">
                          {getInitials(customer.firstName, customer.lastName)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-white border shadow-lg animate-scale-in"
                    align="end"
                    forceMount
                  >
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">
                          {customer.firstName} {customer.lastName}
                        </p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/order-history"
                        className="flex items-center transition-colors duration-200"
                      >
                        <Package className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/customer-dashboard"
                        className="flex items-center transition-colors duration-200"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 transition-colors duration-200"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-prefab-500 text-prefab-600 hover:bg-prefab-50 transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-prefab-600 hover:bg-prefab-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              size="icon"
              className="transition-transform duration-300 hover:scale-110"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-prefab-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                onClick={(e) => {
                  scrollToTop(e);
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-prefab-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/projects"
                className="text-gray-700 hover:text-prefab-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-prefab-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-prefab-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="text-gray-700 hover:text-prefab-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>

              {isAuthenticated && customer ? (
                <>
                  <div className="px-3 py-2 border-t">
                    <div className="flex items-center space-x-3 mb-3">
                      <CustomerNotifications />
                      <div>
                        <p className="font-medium">
                          {customer.firstName} {customer.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/order-history"
                    className="text-gray-700 hover:text-prefab-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 flex items-center transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 flex items-center w-full text-left transition-all duration-300"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex space-x-2 pt-2">
                  <Link
                    to="/login"
                    className="w-1/2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-prefab-500 text-prefab-600 hover:bg-prefab-50 transition-all duration-300"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/signup"
                    className="w-1/2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-prefab-600 hover:bg-prefab-700 text-white transition-all duration-300">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
