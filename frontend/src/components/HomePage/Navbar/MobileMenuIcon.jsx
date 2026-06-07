import { HiMiniBars3, HiXMark } from "react-icons/hi2";

const MobileMenuIcon = ({isMenuOpen, setIsMenuOpen}) => {
  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-400 hover:text-white p-2 transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <HiMiniBars3 className="w-5 h-5" />
        ) : (
          <HiXMark className="w-5 h-5" />
        )}
      </button>
    </>
  );
};

export default MobileMenuIcon;
