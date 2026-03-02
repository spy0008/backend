import "../styles/form.scss";

const LoginForm = () => {
  return (
    <main className="main-body">
      <div className="form-body">
        <h1>Login</h1>
        <form className="login-form">
          <input type="text" placeholder="Enter Username or email" />
          <input type="password" placeholder="Enter Password" />
          <button className="login-btn">Login</button>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
