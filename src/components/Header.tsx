import { Search, ShoppingCart, User, Menu, Leaf, Gift, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4 gap-6">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-[#BCF181] rounded-full p-2">
              <Leaf className="w-5 h-5 text-black" />
            </div>
            <span className="font-['Lora'] tracking-wider">Sustainique</span>
          </a>

          {/* Search Bar - Large like Etsy */}
          <div className="flex-1 max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm phôi áo, thiết kế độc đáo, vouchers..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#BCF181] transition-colors"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Account</span>
              </button>

              {/* Account Dropdown */}
              {showAccountMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <a
                    href="#dashboard"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </a>
                  <a
                    href="#dashboard"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </a>
                  <div className="border-t my-2"></div>
                  <a
                    href="#admin"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-[#ca6946]"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <Leaf className="w-5 h-5" />
                    <span>Admin Panel</span>
                  </a>
                  <div className="border-t my-2"></div>
                  <a
                    href="#login"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-red-600"
                    onClick={() => setShowAccountMenu(false)}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </a>
                </div>
              )}
            </div>
            
            <a href="#cart" className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-[#ca6946] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </a>

            <button className="lg:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t">
          <a
            href="#blanks"
            className="flex items-center gap-2 hover:text-[#ca6946] transition-colors"
          >
            <span>Shop Blanks</span>
            <span className="text-gray-400">(Phôi áo)</span>
          </a>
          <a href="#designs" className="hover:text-[#ca6946] transition-colors">
            Design Gallery
          </a>
          <a href="#about-green" className="flex items-center gap-1 hover:text-[#ca6946] transition-colors">
            <Leaf className="w-4 h-4" />
            <span>About Green</span>
          </a>
          <a href="#dashboard" className="flex items-center gap-1 hover:text-[#ca6946] transition-colors">
            <Gift className="w-4 h-4" />
            <span>Rewards</span>
          </a>
          <a href="#help" className="hover:text-[#ca6946] transition-colors">
            Help
          </a>
        </nav>
      </div>
    </header>
  );
}
