import { useSelector } from "react-redux";

import { useActionData, useNavigate } from "react-router-dom";

import { useEffect, useLayoutEffect } from "react";

const Profile = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/Login");
    }
  }, [email]);
  return <h1>Profile</h1>;
};

export default Profile;
