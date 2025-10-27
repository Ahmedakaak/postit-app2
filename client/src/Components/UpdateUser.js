import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addUser, deleteUser, udpateUser } from "../Features/UserSlice";
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

const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const userlist = useSelector((state) => state.users.values);
  const dispatch = useDispatch();

  const { user_email, user_name, user_password } = useParams();
  const [name, setName] = useState(user_name);
  const [email, setemail] = useState(user_email);
  const [password, setpassword] = useState(user_password);
  const [confirmPassword, setconfirmPassword] = useState(user_password);
  const onSubmit = (data) => {
    try {
      const UserData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      dispatch(addUser(UserData)); //use the useDispatch hook to dispatch an action, passing as parameter the userData
      console.log("Form Data", data);
      alert("Validation all good."); // You can handle the form submission here
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = () => {
    const userData = {
      name: name, //create an object with the values from the state variables

      email: email,

      password: password,
    };

    dispatch(udpateUser(userData)); //use the useDispatch hook to dispatch an action, passing as parameter the userData
  };
  return (
    <Container>
      <h1>UpdateUser</h1>
      <Form className="div-form" onSubmit={handleSubmit(handleUpdate)}>
        <Row>
          <Col md={6}>
            Name<br></br>
            <input
              type="text"
              name="name"
              value={name}
              {...register("name", {
                value: name,
                onChange: (e) => setName(e.target.value),
              })}
            ></input>
            {name}
          </Col>
          <p className="error">{errors.name?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Email<br></br>
            <input
              type="email"
              name="email"
              value={email}
              {...register("email", {
                value: email,
                onChange: (e) => setemail(e.target.value),
              })}
            ></input>
          </Col>
          <p className="error">{errors.email?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Password<br></br>
            <input
              type="password"
              name="password"
              value={password}
              {...register("password", {
                value: password,
                onChange: (e) => setpassword(e.target.value),
              })}
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
              value={confirmPassword}
              {...register("confirmPassword", {
                value: confirmPassword,
                onChange: (e) => setconfirmPassword(e.target.value),
              })}
            ></input>
          </Col>
          <p className="error">{errors.confirmPassword?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            <Button>UpdateUser</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateUser;
