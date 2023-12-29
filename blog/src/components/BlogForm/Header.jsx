import Logo from "../../images/logo.svg"
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="blogform-header">
            <Link to="/">
                <img src={Logo} alt="Logo" />
            </Link>
        </header>
    );
}