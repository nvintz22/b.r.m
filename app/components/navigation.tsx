import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const isActive = (path: string) => {
    if (path === "/partners") {
      return location.pathname === path || location.pathname.startsWith("/partners/");
    }
    return location.pathname === path;
  };
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true); // On other pages, treat as scrolled (white background)
      return;
    }

    const handleScroll = () => {
      // Check if scrolled past the hero section (100vh)
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsScrolled(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Text color: on other pages, always dark. On home page, depends on scroll
  const textColor = (!isHomePage || isScrolled) ? "text-[#001f3f]" : "text-white";
  const buttonInactiveClass = (!isHomePage || isScrolled)
    ? "text-[#001f3f] hover:bg-[#001f3f]/10" 
    : "text-white hover:bg-white/10";
  const mobileMenuBorder = (!isHomePage || isScrolled) ? "border-gray-200" : "border-white/20";
  const mobileButtonColor = (!isHomePage || isScrolled) ? "text-[#001f3f]" : "text-white";

  // Background color logic: white for other pages, transparent/white for home page
  const getBackgroundColor = () => {
    if (!isHomePage) {
      return "bg-white/90";
    }
    return isScrolled ? "bg-white/80" : "bg-transparent";
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm transition-colors ${getBackgroundColor()}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className={`text-xl md:text-2xl font-bold transition-colors ${textColor}`}>
            B.R.M
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/">
              <Button
                variant="ghost"
                className={isActive("/") 
                  ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                  : buttonInactiveClass}
              >
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="ghost"
                className={isActive("/about") 
                  ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                  : buttonInactiveClass}
              >
                About
              </Button>
            </Link>
            <Link to="/services">
              <Button
                variant="ghost"
                className={isActive("/services") 
                  ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                  : buttonInactiveClass}
              >
                Services
              </Button>
            </Link>
            <Link to="/licenses">
              <Button
                variant="ghost"
                className={isActive("/licenses") 
                  ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                  : buttonInactiveClass}
              >
                Licenses
              </Button>
            </Link>
            <Link to="/partners">
              <Button
                variant="ghost"
                className={isActive("/partners") 
                  ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                  : buttonInactiveClass}
              >
                Partners
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="ghost"
                className={isActive("/contact") 
                  ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                  : buttonInactiveClass}
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 ${textColor} hover:bg-black/5 rounded-md transition-colors`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t ${mobileMenuBorder} pt-4`}>
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/") 
                      ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                      : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`
                  }`}
                >
                  Home
                </Button>
              </Link>
              <Link to="/about" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/about") 
                      ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                      : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`
                  }`}
                >
                  About
                </Button>
              </Link>
              <Link to="/services" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/services") 
                      ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                      : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`
                  }`}
                >
                  Services
                </Button>
              </Link>
              <Link to="/licenses" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/licenses") 
                      ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                      : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`
                  }`}
                >
                  Licenses
                </Button>
              </Link>
              <Link to="/partners" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/partners") 
                      ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                      : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`
                  }`}
                >
                  Partners
                </Button>
              </Link>
              <Link to="/contact" onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/contact") 
                      ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" 
                      : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`
                  }`}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
