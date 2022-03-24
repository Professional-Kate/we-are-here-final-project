import React from "react";
import "./Header.css";
import cyfLogo from "../../../assets/CYF-Logo-No-BG.png";

export const Header = () => {
	return (
		<div className="container">
			<header className="header-navbar">
				<div className="logo-header">
					<a href="https://codeyourfuture.io" target="_blank" rel="noReferrer">
						<img
							className="cyf__logo"
							src={cyfLogo}
							alt="CYF Brand"
							height="70px"

						/>
					</a>
				</div>
				<a href="/" className="links">
					<svg
						className="bi me-2"
						width="40"
						height="32"
						role="img"
						aria-label="Bootstrap"
					>
						<use xlinkHref="#bootstrap" />
					</svg>
				</a>

				<ul className="list-navbar">
					<li>
						<a href="#" className="navbar-link">
							Home
						</a>
					</li>
					<li>
						<a href="#" className="navbar-link">
							Features
						</a>
					</li>
					<li>
						<a href="#" className="navbar-link">
							Pricing
						</a>
					</li>
					<li>
						<a href="#" className="navbar-link">
							FAQs
						</a>
					</li>
					<li>
						<a href="#" className="navbar-link">
							About
						</a>
					</li>
				</ul>

				{/* <div className="navbar-link">
					<button type="button" className="logout-btn">
						Log Out
					</button>
				</div> */}
			</header>
		</div>
	);
};
