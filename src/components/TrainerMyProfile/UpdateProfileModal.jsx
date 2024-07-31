import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Box, Button, Table } from "@mui/material";
import { updateUser } from "../../store/user";

const UpdateProfileModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experiences, setExperiences] = useState("");
  const [specialization, setSpecialization] = useState("");
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const user = useSelector((state) => state?.user?.FindUserByID);
  const Userid = localStorage.getItem("id");
  const token = useSelector((state) => state.user.token);
  const handleEditClick = () => {
    dispatch(
      updateUser({
        name,
        email,
        specialization,
        experiences,
        Userid,
        token,
        addToast,
      })
    );
    setName("");
    setEmail("");
    setExperiences("");
    setSpecialization("");
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Update Your Profile
      </Box>
      <Table aria-label="basic table" sx={{ marginTop: "30px" }}>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input
                type="text"
                placeholder={user?.data?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              <input
                type="text"
                placeholder={user?.data?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          {user?.role === 1 && (
            <>
              <tr>
                <td>Experience:</td>
                <td>
                  <input
                    type="text"
                    placeholder={user?.data?.experiences}
                    value={experiences}
                    onChange={(e) => setExperiences(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Specialization:</td>
                <td>
                  <input
                    type="text"
                    placeholder={user?.data?.specialization}
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
      <Button
        sx={{ background: "black", color: "white", margin: "15px" }}
        onClick={handleEditClick}
      >
        EDIT
      </Button>
    </>
  );
};

export default UpdateProfileModal;
