import React from "react";
import { Facebook, Instagram, GitHub, Twitter } from "@mui/icons-material";

const Footer = () => {
    return (
    <footer className="bg-gray-800 text-foreground py-4 w-full fixed bottom-0 left-0">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-4 mb-2">
          <a href="#" className="text-muted text-white hover:text-muted-foreground">Home</a>
          <a href="#" className="text-muted text-white hover:text-muted-foreground">News</a>
          <a href="#" className="text-muted text-white hover:text-muted-foreground">About</a>
          <a href="#" className="text-muted text-white hover:text-muted-foreground">Contact Us</a>
          <a href="#" className="text-muted text-white hover:text-muted-foreground">Our Team</a>
        </div>
        <div className="flex space-x-4 mb-2">
          <a href="https://facebook.com" aria-label="Facebook" className="text-muted hover:text-muted-foreground">
            <Facebook style={{ color: "white", fontSize: 24 }} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="text-muted hover:text-muted-foreground">
            <Instagram style={{ color: "white", fontSize: 24 }} />
          </a>
          <a href="https://github.com" aria-label="GitHub" className="text-muted hover:text-muted-foreground">
            <GitHub style={{ color: "white", fontSize: 24 }} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="text-muted hover:text-muted-foreground">
            <Twitter style={{ color: "white", fontSize: 24 }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;







