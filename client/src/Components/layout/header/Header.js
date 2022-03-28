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
							height="80px"
						/>
					</a>
					<h2>WE ARE HERE</h2>
					<p className="about_text">
						Join WE ARE HERE as a trainee or volunteer.
					</p>
					<p className="about_text">
						It is a manual clock in system for trainees
					</p>
					<p className="about_text">
						{" "}
						and volunteers for upcoming events and classes.
					</p>
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
							About
						</a>
					</li>
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
							FAQs
						</a>
					</li>
				</ul>
			</header>
		</div>
	);
};
