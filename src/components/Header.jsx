import { useState } from "react";
import logo from "../assets/logo.png";
import { FiMenu, FiSearch, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

function Header() {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const { cartItems } = useCart();

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 shadow-lg ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="max-w-5xl mx-auto flex items-center justify-between p-4 relative">
                {/* left */}
                <div>
                    <img src={logo} alt="logo" className="w-30 h-20" />
                </div>
                
                {/* mobile menu button */}
                <div className="cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
                    <FiMenu className="w-6" />
                </div>

                {/* desktop menu */}
                <div className="items-center space-x-10 hidden md:flex">
                    <Link to="/" className="hover:text-orange-500">Home</Link>
                    <Link to="/about" className="hover:text-orange-500">About</Link>
                    <Link to="/products" className="hover:text-orange-500">Products</Link>
                    <FiSearch className="w-6 cursor-pointer hover:text-orange-500" />
                    <ThemeToggle />
                    <div className="relative">
                        <FiShoppingBag className="w-7 cursor-pointer hover:text-orange-500" />
                        {cartItems.length > 0 && (
                            <span className={`absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs ${
                                theme === 'dark' ? 'bg-orange-500 text-white' : 'bg-orange-600 text-white'
                            }`}>
                                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </div>
                </div>

                {/* mobile menu */}
                <div
                    className={`items-center space-y-10 md:hidden flex-col absolute left-0 top-full w-full ${
                        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                    } py-10 px-6 shadow-lg transition-all duration-300 ${
                        open ? "flex" : "hidden"
                    }`}
                >
                    <Link to="/" className="py-2 hover:text-orange-500" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/about" className="py-2 hover:text-orange-500" onClick={() => setOpen(false)}>About</Link>
                    <Link to="/products" className="py-2 hover:text-orange-500" onClick={() => setOpen(false)}>Products</Link>
                    <div className="flex items-center space-x-6 py-4">
                        <FiSearch className="w-6 cursor-pointer hover:text-orange-500" />
                        <ThemeToggle />
                        <div className="relative">
                            <FiShoppingBag className="w-7 cursor-pointer hover:text-orange-500" />
                            {cartItems.length > 0 && (
                                <span className={`absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center text-xs ${
                                    theme === 'dark' ? 'bg-orange-500 text-white' : 'bg-orange-600 text-white'
                                }`}>
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;