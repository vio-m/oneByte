import { useState, useEffect } from 'react'
import "../styles/Footer.css"


function Footer() {
    const [isBottom, setIsBottom] = useState(false)

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

        if (bottom) {
            setIsBottom(true)
        } else {
            setIsBottom(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={isBottom ? "footer show" : "footer"}>
            <div className="footer-content"> &copy; 2022
                <a href="https://www.linkedin.com/in/viorel-moldovan/"> LinkedIn </a>
            </div>
        </footer>
    );
}

export default Footer;

