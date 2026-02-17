import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect, useRef, useCallback } from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { X, Menu, Hammer, Wrench, Building2, Settings, MapPin, Cog, Users, Phone, Mail, Send, Briefcase, ArrowLeft, FileText, Upload, ChevronLeft, ChevronRight, HandHelping, Globe } from "lucide-react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isActive = (path) => {
    if (path === "/partners") {
      return location.pathname === path || location.pathname.startsWith("/partners/");
    }
    return location.pathname === path;
  };
  const isHomePage = location.pathname === "/";
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsScrolled(scrollPosition > heroHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const textColor = !isHomePage || isScrolled ? "text-[#001f3f]" : "text-white";
  const buttonInactiveClass = !isHomePage || isScrolled ? "text-[#001f3f] hover:bg-[#001f3f]/10" : "text-white hover:bg-white/10";
  const mobileMenuBorder = !isHomePage || isScrolled ? "border-gray-200" : "border-white/20";
  const mobileButtonColor = !isHomePage || isScrolled ? "text-[#001f3f]" : "text-white";
  const getBackgroundColor = () => {
    if (!isHomePage) {
      return "bg-white/90";
    }
    return isScrolled ? "bg-white/80" : "bg-transparent";
  };
  return /* @__PURE__ */ jsx("nav", { className: `fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm transition-colors ${getBackgroundColor()}`, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: `text-xl md:text-2xl font-bold transition-colors ${textColor}`, children: "B.R.M" }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            className: isActive("/") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : buttonInactiveClass,
            children: "Home"
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/about", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            className: isActive("/about") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : buttonInactiveClass,
            children: "About"
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/services", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            className: isActive("/services") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : buttonInactiveClass,
            children: "Services"
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/licenses", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            className: isActive("/licenses") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : buttonInactiveClass,
            children: "Licenses"
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/partners", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            className: isActive("/partners") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : buttonInactiveClass,
            children: "Partners"
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            className: isActive("/contact") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : buttonInactiveClass,
            children: "Contact Us"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleMenu,
          className: `md:hidden p-2 ${textColor} hover:bg-black/5 rounded-md transition-colors`,
          "aria-label": "Toggle menu",
          children: isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
        }
      )
    ] }),
    isMenuOpen && /* @__PURE__ */ jsx("div", { className: `md:hidden mt-4 pb-4 border-t ${mobileMenuBorder} pt-4`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", onClick: closeMenu, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          className: `w-full justify-start ${isActive("/") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`}`,
          children: "Home"
        }
      ) }),
      /* @__PURE__ */ jsx(Link, { to: "/about", onClick: closeMenu, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          className: `w-full justify-start ${isActive("/about") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`}`,
          children: "About"
        }
      ) }),
      /* @__PURE__ */ jsx(Link, { to: "/services", onClick: closeMenu, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          className: `w-full justify-start ${isActive("/services") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`}`,
          children: "Services"
        }
      ) }),
      /* @__PURE__ */ jsx(Link, { to: "/licenses", onClick: closeMenu, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          className: `w-full justify-start ${isActive("/licenses") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`}`,
          children: "Licenses"
        }
      ) }),
      /* @__PURE__ */ jsx(Link, { to: "/partners", onClick: closeMenu, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          className: `w-full justify-start ${isActive("/partners") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`}`,
          children: "Partners"
        }
      ) }),
      /* @__PURE__ */ jsx(Link, { to: "/contact", onClick: closeMenu, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          className: `w-full justify-start ${isActive("/contact") ? "bg-gray-200 text-[#001f3f] hover:bg-gray-300" : `${mobileButtonColor} ${isScrolled ? "hover:bg-[#001f3f]/10" : "hover:bg-white/10"}`}`,
          children: "Contact Us"
        }
      ) })
    ] }) })
  ] }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Navigation, {}), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Ship = "/assets/sunset-ship-CrxA2l8E.jpg";
function meta$7({}) {
  return [{
    title: "BRM - Chartering and Maritime Services"
  }, {
    name: "description",
    content: "We are proud partners of leading organizations in the Chartering and Maritime services industry."
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const parallaxRef = useRef(null);
  const heroRef = useRef(null);
  const parallaxBgRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      if (heroRef.current) {
        const opacity = Math.max(0, 1 - scrolled / 500);
        heroRef.current.style.opacity = opacity.toString();
      }
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "relative",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative h-screen flex items-center justify-center overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        ref: parallaxRef,
        className: "absolute inset-0 bg-gradient-to-b from-[#001f3f] via-[#003d7a] to-[#001f3f]",
        style: {
          willChange: "transform"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "absolute inset-0 opacity-20",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        ref: heroRef,
        className: "relative z-10 text-center text-white px-4",
        style: {
          willChange: "opacity"
        },
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 animate-fade-in px-4",
          children: "B.R.M"
        }), /* @__PURE__ */ jsx("h1", {
          className: "text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 animate-fade-in px-4 text-center",
          children: "Chartering and Maritime Services"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto px-4",
          children: "We are proud partners of leading organizations in the Chartering and Maritime services industry."
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row gap-4 justify-center px-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/contact",
            children: /* @__PURE__ */ jsx(Button, {
              size: "lg",
              className: "bg-white text-[#001f3f] hover:bg-[#001f3f] hover:text-white w-full sm:w-auto",
              children: "Get Started"
            })
          }), /* @__PURE__ */ jsx(Link, {
            to: "/about",
            children: /* @__PURE__ */ jsx(Button, {
              size: "lg",
              className: "bg-white text-[#001f3f] hover:bg-[#001f3f] hover:text-white w-full sm:w-auto",
              children: "Learn More"
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "pt-20 pb-8 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-10 px-4",
          children: "Our Services"
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow",
            children: [/* @__PURE__ */ jsx(Hammer, {
              className: "w-12 h-12 text-[#001f3f] mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Chartering Minerals"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We assist major Mining Corporations with Chartering LCT vessels for the transportation of minerals, ore, and other raw materials."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow",
            children: [/* @__PURE__ */ jsx(Wrench, {
              className: "w-12 h-12 text-[#001f3f] mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Repairs Solutions"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "Our ship repair solutions help maintain mining support vessels, ensuring operational reliability and compliance with safety standards."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow",
            children: [/* @__PURE__ */ jsx(Building2, {
              className: "w-12 h-12 text-[#001f3f] mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Chartering for Construction Firms"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We collaborate with construction firms to provide vessels chartering for transporting Sand and Gravel, heavy Machinery, construction Materials, and project equipments."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow",
            children: [/* @__PURE__ */ jsx(Settings, {
              className: "w-12 h-12 text-[#001f3f] mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Maintenance Services"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "Our maintenance services for vessels helps clients meet project deadline with minimal disruptions."
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "relative h-[200vh] md:h-[200vh] lg:h-[150vh] overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        ref: parallaxBgRef,
        className: "absolute inset-0 bg-cover bg-center bg-fixed",
        style: {
          backgroundImage: `url(${Ship})`,
          transform: "translateY(0px)",
          willChange: "transform"
        },
        children: /* @__PURE__ */ jsx("div", {
          className: "absolute inset-0 bg-[#001f3f]/60"
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "relative z-10 h-full flex items-center justify-center",
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center text-white px-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4",
            children: "Excellence in Every Voyage"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg sm:text-xl max-w-2xl mx-auto px-4",
            children: "We're here to assist with your chartering and ship repair needs."
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4",
          children: "Why Choose Us"
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid md:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(MapPin, {
              className: "w-16 h-16 text-[#001f3f] mx-auto mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Global & Nation Wide Reach"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "Experienced in International and Domestic Shipping Operations"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Cog, {
              className: "w-16 h-16 text-[#001f3f] mx-auto mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Trusted & Reliable"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We're here to assist with your chartering and ship repair needs."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Users, {
              className: "w-16 h-16 text-[#001f3f] mx-auto mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Expert Team"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "Experienced professionals dedicated to your success"
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-[#001f3f] text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold mb-4 px-4",
          children: "Ready to Set Sail?"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4",
          children: "Contact us today to discover how we can help your maritime business thrive."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/contact",
          children: /* @__PURE__ */ jsx(Button, {
            size: "lg",
            className: "bg-white text-[#001f3f] hover:bg-gray-100",
            children: "Contact Us"
          })
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  return [{
    title: "About Us - BRM"
  }, {
    name: "description",
    content: "Learn about BRM and our commitment to excellence"
  }];
}
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4",
          children: "About BRM"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl max-w-3xl mx-auto px-4",
          children: "We are proud partners of leading organizations in the Chartering and Maritime services industry."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4",
        children: /* @__PURE__ */ jsxs("div", {
          className: "max-w-4xl mx-auto",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl sm:text-4xl font-bold text-[#001f3f] mb-8",
            children: "Our Company"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6 text-lg text-gray-700",
            children: [/* @__PURE__ */ jsx("p", {
              children: "B.R.M Chartering and Maritime Services, is an independent Company having its principal office in Sta Rita, Guiguinto, Bulacan. B.R.M Chartering offers Vessels Chartering, including Time Charters, Voyage Charters, Bareboat Charters, and Ship Repair ensuring efficient, and cost effective transportation for various types of Cargo."
            }), /* @__PURE__ */ jsx("p", {
              children: "Our extensive network and  In-depth Industry knowledge enables us to provide tailored solutions that align with your Business Goals. B.R.M Management Team has extensive experience both in actual on-board technical and management operations, as well as land-based technical and management operations."
            }), /* @__PURE__ */ jsx("p", {
              children: "Experience both in International and Domestic Shipping Operations in all forms of vessels, such as Petroleum Tankers, Containe Ships, and General Cargo Vessels."
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4",
          children: "Our Esteemed Clients"
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("p", {
            className: "text-lg text-gray-700 text-center mb-14",
            children: "At B.R.M Chartering and Maritime Services, we are proud to partner with leading organizations in the Mining and Construction sectors, providing specialized chartering and ship repair solutions to support their operations. Our reliable services ensure the seamless transportation of Nickel Ore, Equipments, Sand and Gravel."
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Hammer, {
              className: "w-16 h-16 text-[#001f3f] mx-auto mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Chartering Minerals"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We assist major Mining Corporations with Chartering LCT vessels for the transportation of minerals, ore, and other raw materials."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Wrench, {
              className: "w-16 h-16 text-[#001f3f] mx-auto mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Repairs Solutions"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "Our ship repair solutions help maintain mining support vessels, ensuring operational reliability and compliance with safety standards."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Building2, {
              className: "w-16 h-16 text-[#001f3f] mx-auto mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Chartering Construction Firms"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We collaborate with construction firms to provide vessels chartering for transporting Sand and Gravel, heavy Machinery, construction Materials, and project equipments."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx(Settings, {
              className: "w-16 h-16 text-[#001f3f] mx-auto mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold mb-2 text-[#001f3f]",
              children: "Maintenance Services"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "Our maintenance services for vessels helps clients meet project deadline with minimal disruptions."
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-[#001f3f] text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold mb-4 px-4",
          children: "Join Us on Our Journey"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4",
          children: "Whether you're a client, partner, or potential team member, we'd love to hear from you."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/contact",
          children: /* @__PURE__ */ jsx("button", {
            className: "bg-white text-[#001f3f] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors",
            children: "Get in Touch"
          })
        })]
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [{
    title: "Contact Us - BRM"
  }, {
    name: "description",
    content: "Get in touch with BRM for all your maritime business needs"
  }];
}
const contact = UNSAFE_withComponentProps(function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+63",
    phone: "",
    message: ""
  });
  const countryCodes = [{
    code: "+63",
    country: "Philippines",
    flag: "🇵🇭"
  }, {
    code: "+1",
    country: "United States",
    flag: "🇺🇸"
  }, {
    code: "+44",
    country: "United Kingdom",
    flag: "🇬🇧"
  }, {
    code: "+61",
    country: "Australia",
    flag: "🇦🇺"
  }, {
    code: "+65",
    country: "Singapore",
    flag: "🇸🇬"
  }, {
    code: "+60",
    country: "Malaysia",
    flag: "🇲🇾"
  }, {
    code: "+66",
    country: "Thailand",
    flag: "🇹🇭"
  }, {
    code: "+62",
    country: "Indonesia",
    flag: "🇮🇩"
  }, {
    code: "+84",
    country: "Vietnam",
    flag: "🇻🇳"
  }, {
    code: "+86",
    country: "China",
    flag: "🇨🇳"
  }, {
    code: "+81",
    country: "Japan",
    flag: "🇯🇵"
  }, {
    code: "+82",
    country: "South Korea",
    flag: "🇰🇷"
  }, {
    code: "+971",
    country: "UAE",
    flag: "🇦🇪"
  }, {
    code: "+91",
    country: "India",
    flag: "🇮🇳"
  }, {
    code: "+49",
    country: "Germany",
    flag: "🇩🇪"
  }, {
    code: "+33",
    country: "France",
    flag: "🇫🇷"
  }];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      countryCode: "+63",
      phone: "",
      message: ""
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4",
          children: "Contact Us"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl max-w-3xl mx-auto px-4",
          children: "We're here to help. Reach out to us for any questions or inquiries."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl sm:text-4xl font-bold text-[#001f3f] mb-8",
              children: "Get in Touch"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg text-gray-700 mb-8",
              children: "Whether you have a question about our services, need support, or want to explore partnership opportunities, we're ready to assist you."
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 bg-[#001f3f] rounded-lg flex items-center justify-center flex-shrink-0",
                  children: /* @__PURE__ */ jsx(MapPin, {
                    className: "w-6 h-6 text-white"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-[#001f3f] mb-1",
                    children: "Address"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-gray-600",
                    children: ["Sampaguita St. Sta Rita Village", /* @__PURE__ */ jsx("br", {}), "Sta Rita, Guiguinto", /* @__PURE__ */ jsx("br", {}), "Bulacan, Philippines"]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 bg-[#001f3f] rounded-lg flex items-center justify-center flex-shrink-0",
                  children: /* @__PURE__ */ jsx(Phone, {
                    className: "w-6 h-6 text-white"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-[#001f3f] mb-1",
                    children: "Phone"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-gray-600",
                    children: ["0945-578-5355 ", /* @__PURE__ */ jsx("br", {}), "0968-851-9338"]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 bg-[#001f3f] rounded-lg flex items-center justify-center flex-shrink-0",
                  children: /* @__PURE__ */ jsx(Mail, {
                    className: "w-6 h-6 text-white"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-semibold text-[#001f3f] mb-1",
                    children: "Email"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "brmchartering@gmail.com"
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl sm:text-4xl font-bold text-[#001f3f] mb-8",
              children: "Send us a Message"
            }), /* @__PURE__ */ jsxs("form", {
              onSubmit: handleSubmit,
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "name",
                  className: "block text-sm font-medium text-gray-700 mb-2",
                  children: "Full Name"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "name",
                  name: "name",
                  value: formData.name,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none",
                  placeholder: "John Doe"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "email",
                  className: "block text-sm font-medium text-gray-700 mb-2",
                  children: "Email Address"
                }), /* @__PURE__ */ jsx("input", {
                  type: "email",
                  id: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none",
                  placeholder: "john.doe@example.com"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "phone",
                  className: "block text-sm font-medium text-gray-700 mb-2",
                  children: "Phone Number"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex gap-2",
                  children: [/* @__PURE__ */ jsx("select", {
                    name: "countryCode",
                    value: formData.countryCode,
                    onChange: handleChange,
                    className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none bg-white",
                    children: countryCodes.map((country) => /* @__PURE__ */ jsxs("option", {
                      value: country.code,
                      children: [country.flag, " ", country.code]
                    }, country.code))
                  }), /* @__PURE__ */ jsx("input", {
                    type: "tel",
                    id: "phone",
                    name: "phone",
                    value: formData.phone,
                    onChange: handleChange,
                    className: "flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none",
                    placeholder: "Enter phone number"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "message",
                  className: "block text-sm font-medium text-gray-700 mb-2",
                  children: "Message"
                }), /* @__PURE__ */ jsx("textarea", {
                  id: "message",
                  name: "message",
                  value: formData.message,
                  onChange: handleChange,
                  required: true,
                  rows: 6,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none resize-none",
                  placeholder: "Tell us how we can help you..."
                })]
              }), /* @__PURE__ */ jsxs(Button, {
                type: "submit",
                size: "lg",
                className: "w-full bg-[#001f3f] hover:bg-[#003d7a] text-white",
                children: [/* @__PURE__ */ jsx(Send, {
                  className: "w-4 h-4 mr-2"
                }), "Send Message"]
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "p-20 bg-gray-50",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4",
        children: "Join Our Team"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-lg sm:text-xl max-w-3xl mx-auto px-4 mb-5 text-gray-700 text-center",
        children: "Join our team and be part of the maritime industry's future"
      }), /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4",
        children: /* @__PURE__ */ jsx("div", {
          className: "mb-8 flex justify-center",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/apply-now",
            children: /* @__PURE__ */ jsxs(Button, {
              size: "lg",
              className: "w-full bg-[#001f3f] hover:bg-[#003d7a] text-white text-lg py-6 px-8",
              children: [/* @__PURE__ */ jsx(Briefcase, {
                className: "w-5 h-5 mr-2"
              }), "Apply Now"]
            })
          })
        })
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4",
          children: "Find Us"
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-6xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "rounded-lg overflow-hidden shadow-lg",
            children: [/* @__PURE__ */ jsx("iframe", {
              src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3850.123456789!2d120.8765!3d14.7890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ3JzIwLjQiTiAxMjDCsDUyJzM1LjQiRQ!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph&q=Sampaguita+St.+Sta+Rita+Village,+Sta+Rita,+Guiguinto,+Bulacan",
              width: "100%",
              height: "450",
              style: {
                border: 0
              },
              allowFullScreen: true,
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              className: "w-full h-96",
              title: "BRM Location"
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-4 text-center",
              children: /* @__PURE__ */ jsx("a", {
                href: "https://maps.app.goo.gl/zgCg3yvXnSM7QJ188",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-[#001f3f] hover:text-[#003d7a] underline text-sm",
                children: "View on Google Maps"
              })
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 text-center",
            children: /* @__PURE__ */ jsxs("p", {
              className: "text-gray-700",
              children: [/* @__PURE__ */ jsx(MapPin, {
                className: "w-5 h-5 inline mr-2 text-[#001f3f]"
              }), "Sampaguita St. Sta Rita Village, Sta Rita, Guiguinto, Bulacan"]
            })
          })]
        })]
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Apply Now - BRM"
  }, {
    name: "description",
    content: "Apply for a position at BRM"
  }];
}
const applyNow = UNSAFE_withComponentProps(function ApplyNow() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+63",
    phone: "",
    position: ""
  });
  const countryCodes = [{
    code: "+63",
    country: "Philippines",
    flag: "🇵🇭"
  }, {
    code: "+1",
    country: "United States",
    flag: "🇺🇸"
  }, {
    code: "+44",
    country: "United Kingdom",
    flag: "🇬🇧"
  }, {
    code: "+61",
    country: "Australia",
    flag: "🇦🇺"
  }, {
    code: "+65",
    country: "Singapore",
    flag: "🇸🇬"
  }, {
    code: "+60",
    country: "Malaysia",
    flag: "🇲🇾"
  }, {
    code: "+66",
    country: "Thailand",
    flag: "🇹🇭"
  }, {
    code: "+62",
    country: "Indonesia",
    flag: "🇮🇩"
  }, {
    code: "+84",
    country: "Vietnam",
    flag: "🇻🇳"
  }, {
    code: "+86",
    country: "China",
    flag: "🇨🇳"
  }, {
    code: "+81",
    country: "Japan",
    flag: "🇯🇵"
  }, {
    code: "+82",
    country: "South Korea",
    flag: "🇰🇷"
  }, {
    code: "+971",
    country: "UAE",
    flag: "🇦🇪"
  }, {
    code: "+91",
    country: "India",
    flag: "🇮🇳"
  }, {
    code: "+49",
    country: "Germany",
    flag: "🇩🇪"
  }, {
    code: "+33",
    country: "France",
    flag: "🇫🇷"
  }];
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCvFile(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("CV File:", cvFile);
    alert("Thank you for your application! We'll review it and get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+63",
      phone: "",
      position: ""
    });
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/contact",
          className: "inline-flex items-center gap-2 text-white hover:text-gray-200 mb-8 transition-colors",
          children: [/* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-5 h-5"
          }), /* @__PURE__ */ jsx("span", {
            children: "Back to Contact"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-center",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4",
            children: "Apply Now"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg sm:text-xl max-w-3xl mx-auto px-4",
            children: "Join our team and be part of the maritime industry's future"
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4 max-w-3xl",
        children: /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit,
          className: "space-y-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-semibold text-[#001f3f] mb-4",
              children: "Personal Information"
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid md:grid-cols-2 gap-6",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "firstName",
                  className: "block text-sm font-medium text-gray-700 mb-2",
                  children: "First Name *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "firstName",
                  name: "firstName",
                  value: formData.firstName,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none",
                  placeholder: "John"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "lastName",
                  className: "block text-sm font-medium text-gray-700 mb-2",
                  children: "Last Name *"
                }), /* @__PURE__ */ jsx("input", {
                  type: "text",
                  id: "lastName",
                  name: "lastName",
                  value: formData.lastName,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none",
                  placeholder: "Doe"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "email",
                className: "block text-sm font-medium text-gray-700 mb-2",
                children: "Email Address *"
              }), /* @__PURE__ */ jsx("input", {
                type: "email",
                id: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none",
                placeholder: "john.doe@example.com"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "phone",
                className: "block text-sm font-medium text-gray-700 mb-2",
                children: "Phone Number"
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex gap-2",
                children: [/* @__PURE__ */ jsx("select", {
                  name: "countryCode",
                  value: formData.countryCode,
                  onChange: handleChange,
                  className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none bg-white",
                  children: countryCodes.map((country) => /* @__PURE__ */ jsxs("option", {
                    value: country.code,
                    children: [country.flag, " ", country.code]
                  }, country.code))
                }), /* @__PURE__ */ jsx("input", {
                  type: "tel",
                  id: "phone",
                  name: "phone",
                  value: formData.phone,
                  onChange: handleChange,
                  className: "flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none",
                  placeholder: "Enter phone number"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                htmlFor: "position",
                className: "block text-sm font-medium text-gray-700 mb-2",
                children: "Position Applied For *"
              }), /* @__PURE__ */ jsxs("select", {
                id: "position",
                name: "position",
                value: formData.position,
                onChange: handleChange,
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#001f3f] focus:border-transparent outline-none bg-white",
                children: [/* @__PURE__ */ jsx("option", {
                  value: "",
                  children: "Select a position"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Marine Engineer",
                  children: "Marine Engineer"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Operations Manager",
                  children: "Operations Manager"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Vessel Captain",
                  children: "Vessel Captain"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Port Operations Specialist",
                  children: "Port Operations Specialist"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Maritime Consultant",
                  children: "Maritime Consultant"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Fleet Manager",
                  children: "Fleet Manager"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Marine Surveyor",
                  children: "Marine Surveyor"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Safety Officer",
                  children: "Safety Officer"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Logistics Coordinator",
                  children: "Logistics Coordinator"
                }), /* @__PURE__ */ jsx("option", {
                  value: "Other",
                  children: "Other"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-8",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-semibold text-[#001f3f] mb-4",
              children: "Attach Your CV"
            }), /* @__PURE__ */ jsxs("div", {
              onClick: handleFileClick,
              onDrop: handleDrop,
              onDragOver: handleDragOver,
              className: "border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-[#001f3f] hover:bg-gray-50 transition-all",
              children: [/* @__PURE__ */ jsx("input", {
                ref: fileInputRef,
                type: "file",
                accept: ".pdf,.doc,.docx",
                onChange: handleFileChange,
                className: "hidden"
              }), cvFile ? /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(FileText, {
                  className: "w-12 h-12 text-[#001f3f] mx-auto"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-lg font-medium text-[#001f3f]",
                  children: cvFile.name
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-500",
                  children: "Click to change file"
                })]
              }) : /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx(Upload, {
                  className: "w-12 h-12 text-gray-400 mx-auto"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-lg font-medium text-gray-700",
                  children: "Attached you CV here"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-500",
                  children: "Click to upload or drag and drop"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-xs text-gray-400 mt-2",
                  children: "PDF, DOC, DOCX (Max 10MB)"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "pt-6",
            children: /* @__PURE__ */ jsxs(Button, {
              type: "submit",
              size: "lg",
              className: "w-full bg-[#001f3f] hover:bg-[#003d7a] text-white",
              children: [/* @__PURE__ */ jsx(Send, {
                className: "w-4 h-4 mr-2"
              }), "Submit Application"]
            })
          })]
        })
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: applyNow,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function ServiceModal(props) {
  const { isOpen, onClose } = props;
  const isServiceFormat = "service" in props && props.service !== void 0;
  const serviceData = isServiceFormat ? props.service : {
    title: props.title,
    description: props.description,
    images: [props.imageUrl]
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % serviceData.images.length);
  }, [serviceData.images.length]);
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + serviceData.images.length) % serviceData.images.length);
  }, [serviceData.images.length]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyboard);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [isOpen, onClose, prevImage, nextImage]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative max-w-5xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors p-2 bg-white rounded-full shadow-lg z-20",
                "aria-label": "Close modal",
                children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "max-h-[90vh] overflow-y-auto", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-video w-full overflow-hidden bg-gray-100", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "flex transition-transform duration-500 ease-in-out h-full",
                    style: {
                      transform: `translateX(-${currentImageIndex * 100}%)`
                    },
                    children: serviceData.images.map((image, index) => /* @__PURE__ */ jsx("div", { className: "min-w-full w-full h-full flex-shrink-0", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: image,
                        alt: `${serviceData.title} - Image ${index + 1}`,
                        className: "w-full h-full object-cover"
                      }
                    ) }, index))
                  }
                ),
                serviceData.images.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        prevImage();
                      },
                      className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10",
                      "aria-label": "Previous image",
                      children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        nextImage();
                      },
                      className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10",
                      "aria-label": "Next image",
                      children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10", children: serviceData.images.map((_, index) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      },
                      className: `w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"}`,
                      "aria-label": `Go to image ${index + 1}`
                    },
                    index
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#001f3f] mb-4", children: serviceData.title }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed text-lg mb-8", children: serviceData.description })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const MiningImg = "/assets/mining1-Bq1Zg1LQ.png";
const MiningImg2 = "/assets/mining2-C1DXqMR8.png";
const Sand = "/assets/sand-D0lnHCa6.png";
const Gravel = "/assets/gravel-C87ThOiD.png";
const Cargo = "/assets/cargo-H-kMhvW_.png";
const Shipping = "/assets/shipping-Cw3hP7kS.png";
const Repair1 = "/assets/repair1-9tpvySL8.png";
const Repair2 = "/assets/repair2-3DiG9Ejm.png";
const Support1 = "/assets/support1-Dm0H6_h3.png";
const Support2 = "/assets/support2-BDtTJnTX.png";
const Support3 = "/assets/support3-B_xwXduH.png";
const Support4 = "/assets/support4-DQlzTIkf.png";
function meta$3({}) {
  return [{
    title: "Services - BRM"
  }, {
    name: "description",
    content: "Comprehensive maritime services and solutions"
  }];
}
const services = UNSAFE_withComponentProps(function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const services2 = [{
    id: "mining",
    title: "Chartering Minerals",
    shortDescription: "We assist major Mining Corporations with Chartering vessels for the transportation of minerals, ore, sand, gravel, and other raw materials.",
    description: "We specialize in providing comprehensive chartering services for mining corporations, facilitating the transportation of minerals, ore, and other raw materials. Our vessels are specifically designed to handle heavy cargo loads and navigate challenging maritime routes. We work closely with mining companies to ensure efficient, safe, and timely delivery of materials from extraction sites to processing facilities or export terminals.",
    icon: Hammer,
    images: [MiningImg, MiningImg2, Sand, Gravel]
  }, {
    id: "repairs",
    title: "Repairs Solutions",
    shortDescription: "Our ship repair solutions help maintain mining support vessels, ensuring operational reliability and compliance with safety standards.",
    description: "Our comprehensive ship repair services are designed to keep mining support vessels in optimal condition. We provide maintenance, repairs, and upgrades for various vessel types, ensuring operational reliability and compliance with international safety standards. Our experienced team of marine engineers and technicians work around the clock to minimize downtime and maximize vessel performance.",
    icon: Wrench,
    images: [Repair1, Repair2]
  }, {
    id: "construction",
    title: "Chartering & Cargos",
    shortDescription: "We collaborate with construction firms to provide vessels chartering for transporting Sand and Gravel, heavy Machinery, construction Materials, and project equipments.",
    description: "We partner with construction firms to provide specialized vessel chartering services for transporting construction materials, heavy machinery, and project equipment. Our services are essential for large-scale construction projects, especially those in coastal or island locations. We handle everything from sand and gravel transport to heavy equipment delivery, ensuring your construction projects stay on schedule.",
    icon: Building2,
    images: [Cargo, Shipping]
  }, {
    id: "maintenance",
    title: "Supporting Communities",
    shortDescription: "We are proud to have partnered with humanitarian organizations, Government agencies, and local groups to make a meaningful difference in the lives.",
    description: `In the wake of typhoon Odette, B.R.M Chartering and Maritime Services, stepped up to provide critical support to heavily affected communities in the areas of Siargao, Surigao Del Norte, and Dinagat Islands. Understanding the urgent need for relief and recovery, we offered Free vessel chartering Services to transport essential goods, medical supplies, and relief personnel to the hardest hit areas.
We are proud to have partnered with humanitarian organizations, Government agencies, and local groups to make a meaningful difference in the lives of those impacted by Typhoon Odette. B.R.M, we believe in using our expertise and resources to contribute to the Greater Good.`,
    icon: HandHelping,
    images: [Support1, Support2, Support3, Support4]
  }];
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };
  const closeModal = () => {
    setSelectedService(null);
  };
  const benefits = [{
    icon: MapPin,
    title: "Global & Nation Wide Reach",
    description: "Experienced in International and Domestic Shipping Operations "
  }, {
    icon: Cog,
    title: "Trusted & Reliable",
    description: "We're here to assist with your chartering and ship repair needs."
  }, {
    icon: Users,
    title: "Expert Team",
    description: "Experienced professionals dedicated to your success"
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4",
          children: "Our Services"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl max-w-3xl mx-auto px-4",
          children: "Comprehensive maritime solutions tailored to your business needs"
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4",
        children: /* @__PURE__ */ jsx("div", {
          className: "max-w-4xl mx-auto",
          children: /* @__PURE__ */ jsx("div", {
            className: "space-y-4",
            children: services2.map((service) => {
              const IconComponent = service.icon;
              return /* @__PURE__ */ jsxs("div", {
                onClick: () => handleServiceClick(service),
                className: "flex items-center gap-6 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-[#001f3f] cursor-pointer group",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-16 h-16 bg-[#001f3f] rounded-lg flex items-center justify-center group-hover:bg-[#003d7a] transition-colors",
                  children: /* @__PURE__ */ jsx(IconComponent, {
                    className: "w-8 h-8 text-white"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-xl font-semibold mb-2 text-[#001f3f] group-hover:text-[#003d7a] transition-colors",
                    children: service.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 text-sm",
                    children: service.shortDescription
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0",
                  children: /* @__PURE__ */ jsx(ChevronRight, {
                    className: "w-6 h-6 text-gray-400 group-hover:text-[#001f3f] transition-colors"
                  })
                })]
              }, service.id);
            })
          })
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4",
          children: "Why Choose Our Services"
        }), /* @__PURE__ */ jsx("div", {
          className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto",
          children: benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return /* @__PURE__ */ jsxs("div", {
              className: "text-center",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-20 h-20 bg-[#001f3f] rounded-full flex items-center justify-center mx-auto mb-4",
                children: /* @__PURE__ */ jsx(IconComponent, {
                  className: "w-10 h-10 text-white"
                })
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-xl font-semibold mb-2 text-[#001f3f]",
                children: benefit.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: benefit.description
              })]
            }, index);
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-[#001f3f] text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold mb-4 px-4",
          children: "Ready to Get Started?"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4",
          children: "Contact us today to learn more about our services and how we can help your business."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/contact",
          className: "inline-block bg-white text-[#001f3f] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors",
          children: "Contact Us"
        })]
      })
    }), selectedService && /* @__PURE__ */ jsx(ServiceModal, {
      service: selectedService,
      isOpen: selectedService !== null,
      onClose: closeModal
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: services,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function ImageModal({ imageUrl, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative max-w-7xl max-h-[90vh] w-full",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2",
                "aria-label": "Close modal",
                children: /* @__PURE__ */ jsx(X, { className: "w-8 h-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl,
                alt: "License",
                className: "w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
              }
            )
          ]
        }
      )
    }
  );
}
const Cert1 = "/assets/crt1-B19S8V_p.jpg";
const Cert2$1 = "/assets/crt2-D9JPQtG-.jpg";
function meta$2({}) {
  return [{
    title: "Licenses & Certifications - BRM"
  }, {
    name: "description",
    content: "View our licenses and certifications"
  }];
}
const licenses = UNSAFE_withComponentProps(function Licenses() {
  const [selectedImage, setSelectedImage] = useState(null);
  const licenses2 = [{
    id: 1,
    title: "Business Permit",
    imageUrl: Cert1
  }, {
    id: 2,
    title: "Certificate of Registration",
    imageUrl: Cert2$1
  }];
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4",
          children: "Licenses & Certifications"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl max-w-3xl mx-auto px-4",
          children: "Our credentials and certifications demonstrate our commitment to excellence and compliance"
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          children: licenses2.map((license) => /* @__PURE__ */ jsxs("div", {
            className: "group cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:border-[#001f3f]",
            onClick: () => handleImageClick(license.imageUrl),
            children: [/* @__PURE__ */ jsxs("div", {
              className: "relative aspect-[4/3] overflow-hidden bg-gray-100",
              children: [/* @__PURE__ */ jsx("img", {
                src: license.imageUrl,
                alt: license.title,
                className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-[#001f3f]/0 group-hover:bg-[#001f3f]/60 transition-all duration-300 flex items-center justify-center",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-lg",
                  children: "Click to View"
                })
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "p-4",
              children: /* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-[#001f3f] mb-1",
                children: license.title
              })
            })]
          }, license.id))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 max-w-4xl",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-8 px-4",
          children: "Our Commitment to Compliance"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg text-gray-700 text-center mb-6",
          children: "At BRM, we maintain the highest standards of compliance and certification. Our licenses and certifications demonstrate our commitment to:"
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid md:grid-cols-2 gap-6 mt-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "p-6 bg-white rounded-lg",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-[#001f3f] mb-3",
              children: "Quality Assurance"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We adhere to international quality standards to ensure consistent, reliable service delivery."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 bg-white rounded-lg",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-[#001f3f] mb-3",
              children: "Safety & Security"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "Our safety management systems protect our clients, crew, and assets at all times."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 bg-white rounded-lg",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-[#001f3f] mb-3",
              children: "Environmental Responsibility"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We are committed to sustainable practices and environmental protection."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 bg-white rounded-lg",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-[#001f3f] mb-3",
              children: "Regulatory Compliance"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600",
              children: "We stay current with all maritime regulations and industry standards."
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx(ImageModal, {
      imageUrl: selectedImage || "",
      isOpen: selectedImage !== null,
      onClose: handleCloseModal
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: licenses,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const OceanSailors = "/assets/ocean-sailors-D3ytx_NP.png";
function meta$1({}) {
  return [{
    title: "Partners - BRM"
  }, {
    name: "description",
    content: "Our trusted partners and collaborators"
  }];
}
const partners = [{
  id: "ocean-sailors",
  name: "Ocean Sailors",
  logo: OceanSailors,
  description: "Our commitment to quality, integrity, and customer satisfaction is evident in every aspect of our operations.",
  industry: "Maritime Services",
  contactNo: "0917-114-2988, 0945-578-5355",
  email: "oceansailorsmaritime@gmail.com",
  address: "39 St. Sampaguita Sta Rita Village, Sta Rita, Guiguinto, Bulacan"
}];
const partners_default = UNSAFE_withComponentProps(function Partners() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4",
          children: "Our Partners"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl max-w-3xl mx-auto px-4",
          children: "We work with industry leaders to deliver exceptional maritime solutions"
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 min-h-[720px] bg-white",
      children: /* @__PURE__ */ jsx("div", {
        className: "container  mx-auto px-4",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-7xl mx-auto",
          children: partners.map((partner) => /* @__PURE__ */ jsx(Link, {
            to: `/partners/${partner.id}`,
            className: "group p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-[#001f3f] bg-white",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex flex-row items-start gap-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0",
                children: /* @__PURE__ */ jsx("img", {
                  src: partner.logo,
                  alt: partner.name,
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex-1 min-w-0",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-semibold text-[#001f3f] mb-2 group-hover:text-[#003d7a] transition-colors",
                  children: partner.name
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 mb-2",
                  children: partner.industry
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-500 line-clamp-3",
                  children: partner.description
                })]
              })]
            })
          }, partner.id))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-[#001f3f] mb-4 px-4",
          children: "Become a Partner"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4 text-gray-700",
          children: "Interested in partnering with us? Let's explore how we can work together."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/contact",
          className: "inline-block bg-[#001f3f] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#003d7a] transition-colors",
          children: "Contact Us"
        })]
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: partners_default,
  meta: meta$1,
  partners
}, Symbol.toStringTag, { value: "Module" }));
const ShipRepair = "/assets/oc-repair-DckaPKe1.png";
const ShipSalvage = "/assets/oc-ship-atNnFQ1r.png";
const ShipSalvage2 = "/assets/oc-ship2-BgT9TrEp.png";
const PitchPropeller = "/assets/oc-repair2-CXMPw3d2.png";
const Fab1 = "/assets/oc-fab-D38zS437.png";
const Fab2 = "/assets/oc-fab-ramp-DdQmI4gz.png";
const Fab3 = "/assets/oc-fab-ramp2-D9zTbZI2.png";
const DTI = "/assets/oc-business-perm-CBtwoR4Z.png";
const Cert2 = "/assets/oc-bus-prov-DYZ8ZV2z.png";
const Cert3 = "/assets/oc-bus-auth-vzpDwftz.png";
const Cert4 = "/assets/oc-bus-cor-C5gR9c_t.png";
const Cert5 = "/assets/oc-bus-perm24-6DqsiWAC.png";
const Cert6 = "/assets/oc-bus-mayr-C61Wln62.png";
const Cert7 = "/assets/oc-bus-phlhlt-BU1kwR4N.png";
const Cert8 = "/assets/oc-bus-sss-1AHkreGU.png";
const partnerServices = {
  "ocean-sailors": [{
    id: "1",
    title: "Ship Salvage",
    imageUrl: ShipSalvage
  }, {
    id: "2",
    title: "Ship Salvage",
    imageUrl: ShipSalvage2
  }, {
    id: "3",
    title: "Ship Repair and Welding",
    imageUrl: ShipRepair
  }, {
    id: "4",
    title: "Afloat Repair of Pitch Propeller",
    imageUrl: PitchPropeller
  }, {
    id: "5",
    title: "Fabrication of Rudder",
    imageUrl: Fab1
  }, {
    id: "6",
    title: "Fabrication of Ramp",
    imageUrl: Fab2
  }, {
    id: "7",
    title: "Fabrication of Ramp",
    imageUrl: Fab3
  }]
};
const defaultServices = [{
  id: "1",
  title: "Maritime Solutions",
  imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop"
}, {
  id: "2",
  title: "Fleet Management",
  imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop"
}, {
  id: "3",
  title: "Port Operations",
  imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop"
}];
const partnerLicenses = {
  "ocean-sailors": [{
    id: "1",
    title: "DTI Permit",
    type: "Business License",
    imageUrl: DTI
  }, {
    id: "2",
    title: "Provincial Certificate of Registration",
    type: "Business License",
    imageUrl: Cert2
  }, {
    id: "3",
    title: "Maritime Certificate",
    type: "Business License",
    imageUrl: Cert3
  }, {
    id: "4",
    title: "Certificate of Registration",
    type: "Business License",
    imageUrl: Cert4
  }, {
    id: "5",
    title: "Business Permit",
    type: "Business License",
    imageUrl: Cert5
  }, {
    id: "6",
    title: "Mayor's Permit",
    type: "Business License",
    imageUrl: Cert6
  }, {
    id: "7",
    title: "PhilHealth Certificate of Registration",
    type: "Business License",
    imageUrl: Cert7
  }, {
    id: "8",
    title: "SSS Certificate of Registration",
    type: "Business License",
    imageUrl: Cert8
  }]
};
const defaultLicenses = [{
  id: "1",
  title: "Business Permit",
  type: "Business License",
  imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop"
}, {
  id: "2",
  title: "Certificate of Registration",
  type: "Registration",
  imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop"
}];
function meta({
  params
}) {
  const partner = partners.find((p) => p.id === params.partnerId);
  return [{
    title: partner ? `${partner.name} - BRM` : "Partner - BRM"
  }, {
    name: "description",
    content: partner?.description || "Partner details"
  }];
}
const partners_$partnerId = UNSAFE_withComponentProps(function PartnerDetail() {
  const {
    partnerId
  } = useParams();
  const partner = partners.find((p) => p.id === partnerId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLicenseImage, setSelectedLicenseImage] = useState(null);
  const services2 = partnerId ? partnerServices[partnerId] || defaultServices : defaultServices;
  const licenses2 = partnerId ? partnerLicenses[partnerId] || defaultLicenses : defaultLicenses;
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services2.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services2.length) % services2.length);
  };
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };
  const closeModal = () => {
    setSelectedService(null);
  };
  const handleLicenseClick = (imageUrl) => {
    setSelectedLicenseImage(imageUrl);
  };
  const closeLicenseModal = () => {
    setSelectedLicenseImage(null);
  };
  if (!partner) {
    return /* @__PURE__ */ jsx("div", {
      className: "pt-20 min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl font-bold text-[#001f3f] mb-4",
          children: "Partner Not Found"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 mb-8",
          children: "The partner you're looking for doesn't exist."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/partners",
          className: "inline-block bg-[#001f3f] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#003d7a] transition-colors",
          children: "Back to Partners"
        })]
      })
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-20",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-b from-[#001f3f] to-[#003d7a] text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/partners",
          className: "inline-flex items-center gap-2 text-white hover:text-gray-200 mb-8 transition-colors",
          children: [/* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-5 h-5"
          }), /* @__PURE__ */ jsx("span", {
            children: "Back to Partners"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col md:flex-row items-center gap-8",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-32 h-32 rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center flex-shrink-0",
            children: /* @__PURE__ */ jsx("img", {
              src: partner.logo,
              alt: partner.name,
              className: "w-full h-full object-contain"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-4xl md:text-5xl font-bold mb-4",
              children: partner.name
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-gray-200 mb-2",
              children: partner.industry
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg text-gray-300",
              children: partner.description
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 max-w-4xl",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "grid md:grid-cols-2 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-lg border border-gray-200",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-3 mb-4",
              children: [/* @__PURE__ */ jsx(Building2, {
                className: "w-6 h-6 text-[#001f3f]"
              }), /* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold text-[#001f3f]",
                children: "Company Information"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-500 mb-1",
                  children: "Company Name"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-800 font-medium",
                  children: partner.name
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-500 mb-1",
                  children: "Industry"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-800 font-medium",
                  children: partner.industry
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-500 mb-1",
                  children: "Partnership Type"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-800 font-medium",
                  children: "Strategic Partner"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-lg border border-gray-200",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-3 mb-4",
              children: [/* @__PURE__ */ jsx(Globe, {
                className: "w-6 h-6 text-[#001f3f]"
              }), /* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold text-[#001f3f]",
                children: "Contact Information"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx(MapPin, {
                  className: "w-5 h-5 text-[#001f3f] mt-1 flex-shrink-0"
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-500 mb-1",
                    children: "Address"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-800",
                    children: partner.address
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx(Phone, {
                  className: "w-5 h-5 text-[#001f3f] mt-1 flex-shrink-0"
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-500 mb-1",
                    children: "Phone"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-800",
                    children: partner.contactNo
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [/* @__PURE__ */ jsx(Mail, {
                  className: "w-5 h-5 text-[#001f3f] mt-1 flex-shrink-0"
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-500 mb-1",
                    children: "Email"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-800",
                    children: partner.email
                  })]
                })]
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 p-6 rounded-lg border border-gray-200",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold text-[#001f3f] mb-4",
            children: "Our Company"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-700 leading-relaxed mb-4",
            children: "OceanSailors presents inclusive maritime services, with a focus on ship management, administrative tasks, and crew support. We guarantee safe, efficient, and cost-effective operations by offering personalized options to the shipping and maritime industries."
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-center text-[#001f3f] mb-12 px-4",
          children: "Services"
        }), /* @__PURE__ */ jsx("div", {
          className: "max-w-6xl mx-auto",
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative w-full",
            children: [/* @__PURE__ */ jsx("div", {
              className: "overflow-hidden rounded-lg w-full",
              children: /* @__PURE__ */ jsx("div", {
                className: "flex transition-transform duration-500 ease-in-out",
                style: {
                  transform: `translateX(-${currentIndex * 100}%)`
                },
                children: services2.map((service) => /* @__PURE__ */ jsx("div", {
                  className: "min-w-full w-full flex-shrink-0",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "cursor-pointer group",
                    onClick: () => handleServiceClick(service),
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "aspect-video w-full overflow-hidden bg-gray-100 rounded-t-lg",
                      children: /* @__PURE__ */ jsx("img", {
                        src: service.imageUrl,
                        alt: service.title,
                        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      })
                    }), /* @__PURE__ */ jsx("div", {
                      className: "bg-white p-6 rounded-b-lg border border-gray-200 border-t-0",
                      children: /* @__PURE__ */ jsx("h3", {
                        className: "text-2xl font-semibold text-[#001f3f] mb-2 group-hover:text-[#003d7a] transition-colors",
                        children: service.title
                      })
                    })]
                  })
                }, service.id))
              })
            }), services2.length > 1 && /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsx("button", {
                onClick: prevSlide,
                className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10",
                "aria-label": "Previous service",
                children: /* @__PURE__ */ jsx(ChevronLeft, {
                  className: "w-6 h-6"
                })
              }), /* @__PURE__ */ jsx("button", {
                onClick: nextSlide,
                className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#001f3f] p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10",
                "aria-label": "Next service",
                children: /* @__PURE__ */ jsx(ChevronRight, {
                  className: "w-6 h-6"
                })
              })]
            }), services2.length > 1 && /* @__PURE__ */ jsx("div", {
              className: "flex justify-center gap-2 mt-6",
              children: services2.map((_, index) => /* @__PURE__ */ jsx("button", {
                onClick: () => setCurrentIndex(index),
                className: `w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-[#001f3f] w-8" : "bg-gray-300 hover:bg-gray-400"}`,
                "aria-label": `Go to slide ${index + 1}`
              }, index))
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 max-w-6xl",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3 mb-8",
          children: [/* @__PURE__ */ jsx(FileText, {
            className: "w-8 h-8 text-[#001f3f]"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl sm:text-4xl font-bold text-[#001f3f]",
            children: "Licenses"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "overflow-x-auto",
          children: /* @__PURE__ */ jsxs("table", {
            className: "w-full border-collapse",
            children: [/* @__PURE__ */ jsx("thead", {
              children: /* @__PURE__ */ jsxs("tr", {
                className: "bg-gray-50 border-b-2 border-gray-200",
                children: [/* @__PURE__ */ jsx("th", {
                  className: "px-6 py-4 text-left text-sm font-semibold text-[#001f3f]",
                  children: "License Title"
                }), /* @__PURE__ */ jsx("th", {
                  className: "px-6 py-4 text-left text-sm font-semibold text-[#001f3f]",
                  children: "Type"
                })]
              })
            }), /* @__PURE__ */ jsx("tbody", {
              children: licenses2.map((license) => /* @__PURE__ */ jsxs("tr", {
                onClick: () => handleLicenseClick(license.imageUrl),
                className: "border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group",
                children: [/* @__PURE__ */ jsx("td", {
                  className: "px-6 py-4 text-gray-800 font-medium group-hover:text-[#001f3f]",
                  children: license.title
                }), /* @__PURE__ */ jsx("td", {
                  className: "px-6 py-4 text-gray-600",
                  children: license.type
                })]
              }, license.id))
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-[#001f3f] mb-4 px-4",
          children: "Interested in Partnership?"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg sm:text-xl mb-8 max-w-2xl mx-auto px-4 text-gray-700",
          children: "Learn more about how you can become a partner with BRM."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/contact",
          className: "inline-block bg-[#001f3f] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#003d7a] transition-colors",
          children: "Contact Us"
        })]
      })
    }), selectedService && /* @__PURE__ */ jsx(ServiceModal, {
      imageUrl: selectedService.imageUrl,
      title: selectedService.title,
      isOpen: selectedService !== null,
      onClose: closeModal
    }), selectedLicenseImage && /* @__PURE__ */ jsx(ImageModal, {
      imageUrl: selectedLicenseImage,
      isOpen: selectedLicenseImage !== null,
      onClose: closeLicenseModal
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: partners_$partnerId,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-dB7KbWoy.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DDmDNKWm.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/button-3wjiSMhM.js", "/assets/x-Bb0_G09A.js", "/assets/createLucideIcon-BpRde2Qk.js"], "css": ["/assets/root-CsRKp90z.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-C3WUdsDb.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/button-3wjiSMhM.js", "/assets/wrench-CKYfv6mp.js", "/assets/building-2-DWuHnnvb.js", "/assets/settings-DgYPz7mY.js", "/assets/map-pin-Bz5S0m7s.js", "/assets/users-iUtxJdR1.js", "/assets/createLucideIcon-BpRde2Qk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-TNaCVtsJ.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/wrench-CKYfv6mp.js", "/assets/building-2-DWuHnnvb.js", "/assets/settings-DgYPz7mY.js", "/assets/createLucideIcon-BpRde2Qk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-CCWGH-xs.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/button-3wjiSMhM.js", "/assets/map-pin-Bz5S0m7s.js", "/assets/phone-DhLQsXkH.js", "/assets/send-HnCn2LBJ.js", "/assets/createLucideIcon-BpRde2Qk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/apply-now": { "id": "routes/apply-now", "parentId": "root", "path": "apply-now", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/apply-now-Bj8yVkg0.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/button-3wjiSMhM.js", "/assets/file-text-D7lbF8gL.js", "/assets/createLucideIcon-BpRde2Qk.js", "/assets/send-HnCn2LBJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/services": { "id": "routes/services", "parentId": "root", "path": "services", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/services-DxIjS22n.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/service-modal-vXtbbZyk.js", "/assets/wrench-CKYfv6mp.js", "/assets/building-2-DWuHnnvb.js", "/assets/createLucideIcon-BpRde2Qk.js", "/assets/map-pin-Bz5S0m7s.js", "/assets/users-iUtxJdR1.js", "/assets/x-Bb0_G09A.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/licenses": { "id": "routes/licenses", "parentId": "root", "path": "licenses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/licenses--F7A5bb1.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/image-modal-g4F3-95m.js", "/assets/x-Bb0_G09A.js", "/assets/createLucideIcon-BpRde2Qk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/partners": { "id": "routes/partners", "parentId": "root", "path": "partners", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/partners-BTXC9Xut.js", "imports": ["/assets/partners-Bm6QqvS6.js", "/assets/chunk-EPOLDU6W-CceRlomA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/partners.$partnerId": { "id": "routes/partners.$partnerId", "parentId": "root", "path": "partners/:partnerId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/partners._partnerId-DWeoKMcS.js", "imports": ["/assets/chunk-EPOLDU6W-CceRlomA.js", "/assets/partners-Bm6QqvS6.js", "/assets/service-modal-vXtbbZyk.js", "/assets/image-modal-g4F3-95m.js", "/assets/file-text-D7lbF8gL.js", "/assets/building-2-DWuHnnvb.js", "/assets/createLucideIcon-BpRde2Qk.js", "/assets/map-pin-Bz5S0m7s.js", "/assets/phone-DhLQsXkH.js", "/assets/x-Bb0_G09A.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-b0f27af7.js", "version": "b0f27af7", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/apply-now": {
    id: "routes/apply-now",
    parentId: "root",
    path: "apply-now",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/services": {
    id: "routes/services",
    parentId: "root",
    path: "services",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/licenses": {
    id: "routes/licenses",
    parentId: "root",
    path: "licenses",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/partners": {
    id: "routes/partners",
    parentId: "root",
    path: "partners",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/partners.$partnerId": {
    id: "routes/partners.$partnerId",
    parentId: "root",
    path: "partners/:partnerId",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
