import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom"
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from "react-validation/build/button";
import 'bootstrap/dist/css/bootstrap.css';
import AuthService from "../Service/AuthService";

const required = (value) => {
    if(!value) {
        return (
            <div className="alert alert-danger" role='alert'>
                This field is required!
            </div>
        )
    }
}

const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkButton = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if(checkButton.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                (response) => {
                  response.user.roles.includes("ADMIN") ? navigate("/orders") : navigate("/create-order");
                },
                (error) => {
                    const resMessage = error.response;
                    setLoading(false);
                    setMessage(resMessage);
                }
            )
        } else {
            setLoading(false);
        }
    };

        return (
            <div className="col-md-12">

        
                <Form onSubmit={handleLogin} ref={form}>
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required]}
                    />
                  </div>
        
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required]}
                    />
                  </div>
        
                  <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Login</span>
                    </button>
                  </div>
        
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <br/>
                  <CheckButton style={{ display: "none" }} ref={checkButton} />
                </Form>
                <br/>
                <a href="/register">Sign Up</a>
              </div>
          );
        };

export default Login;