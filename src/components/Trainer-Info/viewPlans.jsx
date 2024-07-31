import * as React from "react";
import { Box, Button, Card, Typography, Container } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { useState, useEffect } from "react";
import { getservices, requestTrainer } from "../../store/trainer";
import { useDispatch, useSelector } from "react-redux";
import { UserByID, clientsRequest } from "../../store/user";

export default function OverlayRadio(props) {
  const { trainerID } = props;
  const { addToast } = useToasts();
  const [trainer, setTrainer] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const services = useSelector((state) => state?.trainer?.trainerServicesList);

  const handleSubmit = (selectedOption) => {
    console.log("Selected option:", selectedOption);
  };
  const user = useSelector((state) => state?.user?.FindUserByID);
  const [selectedOption, setSelectedOption] = React.useState("");

  const initPayment = (data) => {
    const options = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY,
      amount: data?.amount,
      currency: data?.currency,
      name: user?.name,
      description: "Test Transaction",
      image: user?.photo,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          if (data) {
            addToast(data.message, {
              appearance: "success",
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }
        } catch (error) {
          console.log(error);
        }
        dispatch(clientsRequest({ trainerID, token, charges: data?.amount }));
      },
      theme: {
        color: "#000000",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleCardClick = (charges) => {
    setSelectedOption(charges);
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8000/api/payment/order";
      const { data } = await axios.post(orderUrl, { amount: selectedOption });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceedClick = () => {
    handleSubmit(selectedOption);
  };

  const trainerDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/trainer/trainerDetail/${trainerID}`
      );
      setTrainer(data.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    dispatch(getservices({ trainerID, token }));
    dispatch(UserByID());
    trainerDetail();
  }, []);

  return (
    <Container sx={{ minHeight: "50vh" }}>
      <>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          <Typography variant="h6">
            Select the Plan according to your requirements
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {services?.map((serviceOffered) => (
            <>
              <Card
                key={serviceOffered?._id}
                sx={{
                  minHeight: "100px",
                  width: "100%",
                  marginTop: "2rem",
                  border:
                    selectedOption === serviceOffered?.charges
                      ? "black 2px solid"
                      : "1px solid rgba(0, 0, 0, 0.23)",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(serviceOffered?.charges)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#D1CBCB",
                  }}
                >
                  <Typography
                    sx={{
                      marginLeft: "1rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {serviceOffered?.duration} Month
                  </Typography>
                </Box>
                <Box>
                  <b style={{ margin: "10px" }}>The package includes</b>
                  <p style={{ margin: "10px" }}>
                    {serviceOffered?.description}
                  </p>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#D1CBCB",
                  }}
                >
                  <Typography>Charges: {serviceOffered?.charges}</Typography>
                </Box>
              </Card>
            </>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "0.5rem 0 1rem 1rem",
            }}
          >
            <Button
              onClick={handlePayment}
              sx={{
                background: "black",
                color: "white",
                height: "50px",
                width: "100px",
                "&:hover": {
                  background: "black",
                },
              }}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      </>
    </Container>
  );
}
