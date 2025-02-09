import React from "react";
import { FaFacebook, FaXTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center mb-4">
          <div className="mx-4">
            <h4 className="font-semibold mb-3">ERM</h4>
            <ul className="list-none mb-1">
              <li><a href="#" className="text-muted-foreground hover:text-primary">About / Press</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Awards</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
            </ul>
          </div>
          <div className="mx-4">
            <h4 className="font-semibold mb-3">Employers</h4>
            <ul className="list-none">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Get a FREE Employer Account</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Employer Centre</a></li>
            </ul>
          </div>
          <div className="mx-4">
            <h4 className="font-semibold mb-3">Information</h4>
            <ul className="list-none">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Help</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Guidelines</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Use</a></li>
            </ul>
          </div>
          <div className="mx-4">
            <h4 className="font-semibold mb-3">Work With Us</h4>
            <ul className="list-none">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Advertisers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-muted-foreground hover:text-primary"><FaFacebook size={24} /></a>
          <a href="#" className="text-muted-foreground hover:text-primary"><FaXTwitter size={24} /></a>
          <a href="#" className="text-muted-foreground hover:text-primary"><FaInstagram size={24} /></a>
          <a href="#" className="text-muted-foreground hover:text-primary"><FaGithub size={24} /></a>
          <a href="#" className="text-muted-foreground hover:text-primary"><FaLinkedin size={24} /></a>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <span>Browse by: Companies, Jobs, Locations, Recent posts</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground text-center">
          <span>Copyright ©</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
