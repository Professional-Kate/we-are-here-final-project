import React from "react";
import "./Header.css";
import cyfLogo from "../../../assets/CYF-Logo-No-BG.png";

export const Header = () => {
	return (
		<div className="container header__container" id="home">
			<div className="logout-button">
				<button className="logout-btn">Log Out </button>
			</div>

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
			</header>
		</div>
	);
};
