import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12 text-center text-gray-600">
      &copy; {new Date().getFullYear()} BookStore. All rights reserved.
    </footer>
  );
}

export default Footer;
