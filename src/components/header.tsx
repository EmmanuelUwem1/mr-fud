
function Header() {
  return (
    <header className="flex justify-between items-center px-4 sm:px-8 md:px-16">
      {/* logo */}
      <span></span>

      {/* nav links */}
      <nav className="flex justify-center items-center gap-8"></nav>
      {/* socials */}
      <div className="flex justify-center items-center gap-4"></div>
      {/* buttons */}
      <div className="flex justify-center items-center gap-4"></div>
    </header>
  );
}

export default Header