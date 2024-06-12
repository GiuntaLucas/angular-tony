import { Form } from "react-router-dom";

const LoginForm = () => {
  return (
    <Form method="post" action="/" className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="input w-full max-w-xs"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input w-full max-w-xs"
          />
        </div>
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-outline btn-primary btn-md">Save</button>
        </div>
      </div>
    </Form>
  );
};
export default LoginForm;
