const SignInList = () => {
  return <ul id="card-list" className="card-list">
  <li>
    <h2 id="new-user-heading" className="card-heading underline underline-color-red">Join We Are Here</h2>
  </li>
  <li>
    <button id="sign-up-button" className="card-button box-shadow">Sign Up</button>
    </li>
  <li>
    <h2 id="old-user-heading" className="card-heading underline underline-color-red">Already have an account?</h2>
  </li>
  <li>
    <button id="sign-in-button" className="card-button box-shadow">Sign In</button>
  </li>
</ul>;
};

export default SignInList;