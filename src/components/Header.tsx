const Header = () => {
  return (
    <div className="bg-cyan-800 py-2">
      <div className="container mx-auto px-4 flex justify-between">
        {/* Logo */}
        <div>
          <a href="/" className="text-2xl font-bold cursor-pointer">
            E-commerce
          </a>
        </div>

        {/* Links */}

        <div>
          <ul className="flex justify-between gap-6">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Category</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
