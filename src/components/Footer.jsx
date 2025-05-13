import { useTheme } from "../context/ThemeContext";

function Footer() {
    const { theme } = useTheme();
    return (
        <footer className={`w-full text-center py-10 ${theme === 'dark' ? 'bg-slate-800' : 'bg-orange-500'} text-white`}>
            <div className="container mx-auto">
                <h1>copyright &copy; Furns. All rights reserved</h1>
            </div>
        </footer>
    );
}

export default Footer;