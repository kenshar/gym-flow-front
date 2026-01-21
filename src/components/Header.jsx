import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../lib/api";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    // Clear auth token and redirect to home
    localStorage.removeItem('authToken');
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider gradient-text">
            GYMFLOW
          </h1>

          <div className="flex gap-3">
            {isAuthenticated() ? (
              <>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </Button>
                {user && user.role === 'admin' && (
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={() => navigate('/admin/invites')}
                  >
                    Admin Invites
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500/10 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        <nav className="mt-4 flex justify-end gap-6 md:gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="font-body text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="font-body text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("upcoming")}
            className="font-body text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Upcoming
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
