import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmailConfirmation() {
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    const verify = async () => {
      await axios
        .patch(`http://localhost:5000/api/update-verified/${id}`)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    verify();
  }, [id]);

  return <div>Your Encrypted ID: {id}</div>;
}

export default EmailConfirmation;
