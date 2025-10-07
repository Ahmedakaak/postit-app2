import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
  Form,
  button,
} from "reactstrap";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const userlist = useSelector((state) => state.users.values);
  const onSubmit = (data) => {
    console.log("Form Data", data);
    alert("Validation all good."); // You can handle the form submission here
  };
  return (
    <Container>
      <h1>Register</h1>
      <Form className="div-form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            Name<br></br>
            <input type="text" name="name" {...register("name")}></input>
          </Col>
          <p className="error">{errors.name?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Email<br></br>
            <input type="email" name="email" {...register("email")}></input>
          </Col>
          <p className="error">{errors.email?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Password<br></br>
            <input
              type="password"
              name="password"
              {...register("password")}
            ></input>
          </Col>
          <p className="error">{errors.password?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Confirm Password<br></br>
            <input
              type="password"
              name="confirmpassword"
              {...register("confirmPassword")}
            ></input>
          </Col>
          <p className="error">{errors.confirmPassword?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            <Button>Register</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col md={6}>
          <h2>List of users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userlist.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button color="warning" size="sm">
                      Update
                    </Button>{" "}
                    <Button color="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
