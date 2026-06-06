import { Bars, Xmark } from "@gravity-ui/icons";

const MobileMenuIcon = ({isMenuOpen, setIsMenuOpen}) => {
  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-400 hover:text-white p-2 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <Xmark className="w-5 h-5" />
        ) : (
          <Bars className="w-5 h-5" />
        )}
      </button>
    </>
  );
};

export default MobileMenuIcon;
