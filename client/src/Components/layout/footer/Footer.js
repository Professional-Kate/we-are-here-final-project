import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
		<div className="col-footer__col">
			<ul className="footer__items">
				<li>
					<div className="footer__title">Community</div>
				</li>
				<li className="footer__item">
					<a
						href="https://www.codeyourfuture.io"
						target="_blank"
						rel="noopener noreferrer"
						className="footer__link-item"
					>
						<span>
							Website
							<svg
								width="13.5"
								height="13.5"
								aria-hidden="true"
								viewBox="0 0 24 24"
								className="iconExternalLink_I5OW"
							>
								<path
									fill="currentColor"
									d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
								></path>
							</svg>
						</span>
					</a>
				</li>

				<li className="footer__item">
					<a
						href="https://docs.codeyourfuture.io"
						target="_blank"
						rel="noopener noreferrer"
						className="footer__link-item"
					>
						<span>
							Documentation
							<svg
								width="13.5"
								height="13.5"
								aria-hidden="true"
								viewBox="0 0 24 24"
								className="iconExternalLink_I5OW"
							>
								<path
									fill="currentColor"
									d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
								></path>
							</svg>
						</span>
					</a>
				</li>

				<li className="footer__item">
					<a
						href="https://github.com/codeyourfuture/"
						target="_blank"
						rel="noopener noreferrer"
						className="footer__link-item"
					>
						<span>
							GitHub
							<svg
								width="13.5"
								height="13.5"
								aria-hidden="true"
								viewBox="0 0 24 24"
								className="iconExternalLink_I5OW"
							>
								<path
									fill="currentColor"
									d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
								></path>
							</svg>
						</span>
					</a>
				</li>
			</ul>

			<ul className="footer__items">
				<li>
					<div className="footer__title">Social</div>
				</li>
				<li>
					<a
						href="https://twitter.com/CodeYourFuture"
						target="_blank"
						rel="noopener noreferrer"
						className="footer__link-item"
					>
						<span>
							Twitter
							<svg
								width="13.5"
								height="13.5"
								aria-hidden="true"
								viewBox="0 0 24 24"
								className="iconExternalLink_I5OW"
							>
								<path
									fill="currentColor"
									d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
								></path>
							</svg>
						</span>
					</a>
				</li>

				<li className="footer__item">
					<a
						href="https://www.instagram.com/codeyourfuture_"
						target="_blank"
						rel="noopener noreferrer"
						className="footer__link-item"
					>
						<span>
							Instagram
							<svg
								width="13.5"
								height="13.5"
								aria-hidden="true"
								viewBox="0 0 24 24"
								className="iconExternalLink_I5OW"
							>
								<path
									fill="currentColor"
									d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
								></path>
							</svg>
						</span>
					</a>
				</li>
				<li className="footer__item">
					<a
						href="https://www.facebook.com/codeyourfuture.io"
						target="_blank"
						rel="noopener noreferrer"
						className="footer__link-item"
					>
						<span>
							Facebook
							<svg
								width="13.5"
								height="13.5"
								aria-hidden="true"
								viewBox="0 0 24 24"
								className="iconExternalLink_I5OW"
							>
								<path
									fill="currentColor"
									d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
								></path>
							</svg>
						</span>
					</a>
				</li>
			</ul>
		</div>
	);
};
export default Footer;