import React from "react";
import "./Header.css";
import cyfLogo from "../../../assets/CYF-Logo-No-BG.png";
import LogOut from "../LogOut/LogOut";
 const Header = ( { state  } ) => {
	return (
		<div className="container header__container" id="home">
			<header className="header-navbar">
				<div className="logo-header">
					<img
						className="cyf__logo"
						src={cyfLogo}
						alt="CYF Brand"
						height="80px"
					/>
				</div>
			</header>
			<div>
				<h1>WE ARE HERE</h1>
			</div>
			<div className="log__out" onClick={() => state(true)}>
				<LogOut />
			</div>
		</div>
	);
};
export default Header;