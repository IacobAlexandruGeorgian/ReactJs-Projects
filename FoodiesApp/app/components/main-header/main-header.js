import logoImg from "@/assets/logo.png";
import Link from "next/link";
import classes from './main-header.module.css'
import Image from "next/image";
import MainHeaderBackgroung from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {

    return (
        <>
            <MainHeaderBackgroung/>
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image src={logoImg} alt="A place with food" priority/>
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}