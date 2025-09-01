import Link from "next/link";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const navigation = [
    {
      name: "Футбол",
      link: "/football",
      logo: "https://img.icons8.com/?size=100&id=9820&format=png&color=209BFF",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow-lg shadow-cyan-500/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image src="/globe.svg" alt="Your Company" width={32} height={32} />
              <span className="text-white text-xl font-bold ml-2">PromtBetAI</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700/50 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium flex items-center transition-colors duration-300"
                    )}
                  >
                    <img className="w-5 mr-2" src={item.logo} alt="logo" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/10 backdrop-blur-lg border-t border-cyan-400/30">
        <div className="flex justify-around items-center py-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="flex flex-col items-center text-gray-300 hover:text-white transition-colors duration-300 p-2 rounded-lg"
            >
              <img className="w-6 h-6" src={item.logo} alt="logo" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;