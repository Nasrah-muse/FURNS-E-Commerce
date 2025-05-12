import { useTheme } from "../context/ThemeContext";

 
function Footer() {
    const {theme} = useTheme()
  return (
    <div className={` text-center p-10 mt-4 text-white ${theme === 'dark'? 'bg-slate-800 ': 'bg-orange-500 '}`}>
      <h1>copyight &copy; Furns. All right reserved</h1>
    </div>
  );
}

export default Footer;