/** @jsx jsx */
import React from "react"
import { css, jsx } from "@emotion/core";
import Container from "../Global/Container";
import FooterCard from "./FooterCard";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const [reviews, setReviews] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const addReview = async (email, reviews) => {
    try {
      const review = await axios.post(
        "http://localhost:8000/api/reviews/create",
        {
          email,
          reviews,
        }
      );
      console.log(review);
    } catch (error) {
      throw error;
    }
  };

  const addReviewHandler = () => {
    console.log(email, reviews);
    addReview(email, reviews);
    setEmail("");
    setReviews("");
  };

  return (
    <div className="footer" css={styles}>
      <Container>
        <FooterCard cardHeading="Contact Us">
          <div className="firstCard">
            <a href="">+91 367 826 2567</a>
            <a href="">sandeep.h.lohar@gmail.com</a>
            <div className="social">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-pinterest-p"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </FooterCard>
        <FooterCard cardHeading="Useful Links">
          <div className="usefulLinks">
            <Typography
              onClick={() => {
                navigate("/food");
              }}
              sx={{ color: "white", margin: "0.3rem", cursor: "pointer" }}
            >
              Food
            </Typography>
            <Typography
              onClick={() => {
                navigate("/exercise");
              }}
              sx={{ color: "white", margin: "0.3rem", cursor: "pointer" }}
            >
              Exercise
            </Typography>
            <Typography
              onClick={() => {
                navigate("/trainer");
              }}
              sx={{ color: "white", margin: "0.3rem", cursor: "pointer" }}
            >
              Trainer
            </Typography>
            <Typography
              onClick={() => {
                navigate("/activities");
              }}
              sx={{ color: "white", margin: "0.3rem", cursor: "pointer" }}
            >
              Activities
            </Typography>
          </div>
        </FooterCard>
        <FooterCard cardHeading="Reviews">
          <div className="subscribe">
            <div className="input" style={{ margin: "1rem 1rem 1rem 0" }}>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your Email"
              />
            </div>
            <div className="input" style={{ margin: "1rem 1rem 1rem 0" }}>
              <input
                type="text"
                name="reviews"
                value={reviews}
                onChange={(e) => {
                  setReviews(e.target.value);
                }}
                placeholder="Enter Reviews"
              />
            </div>
            <Button
              onClick={addReviewHandler}
              sx={{
                background: "red",
                color: "white",
                "&:hover": {
                  background: "red",
                },
              }}
            >
              Send
            </Button>
            {/* <p>
              Esteem spirit temper too say adieus who direct esteem esteems
              luckily.
            </p> */}
          </div>
        </FooterCard>
      </Container>
      <div className="copyright">
        <p>Copyright ©2020 All rights reserved</p>
      </div>
    </div>
  );
};

const styles = css`
  display: flex;
  flex-direction: column;
  min-height: 25vh;
  width: 100%;
  background: #000;

  .footer {
    flex-shrink: 0;
    margin-top: auto;
  }

  .container {
    padding: 75px 0;
    max-width: 1200px;
    display: flex;
    border-bottom: 1px solid rgb(26, 26, 26);
    justify-content: space-between;
  }

  .firstCard {
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 0;
    p {
      color: #ccc;
    }
    a {
      color: #ccc;
      padding: 10px 0 0 0;
      text-decoration: none;
      transition: 400ms ease-in-out;
      &:hover {
        color: red;
      }
    }
    .social {
      display: flex;
      padding: 20px 0 0 0;
      i {
        color: #ccc;
        margin: 0 10px 0 0;
        cursor: pointer;
        transition: all 300ms ease-in-out;
        &:hover {
          color: red;
        }
      }
    }
  }

  .usefulLinks {
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    a {
      color: #ccc;
      padding: 10px 0 0 0;
      text-decoration: none;
      transition: 400ms ease-in-out;
      &:hover {
        color: red;
      }
    }
  }

  .subscribe {
    padding: 20px 0 0 0;
    .input {
      position: relative;
      input {
        height: 44px;
        padding: 10px;
        width: 100%;
        border-radius: 10px;
        border: none;
        outline: none;
      }
      button {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 10px 20px;
        z-index: 20;
        right: -42px;
        border-radius: 10px;
      }
    }
    p {
      color: #ccc;
      padding: 20px 0 0 0;
    }
  }

  .copyright {
    p {
      padding: 20px 0;
      color: #ccc;
      text-align: center;
      i {
        color: red;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 700px) {
    .container {
      padding: 100px 0;
      flex-wrap: wrap;
      .footerCard {
        max-width: 200px;
        /* border: 1px solid green; */
        &:nth-child(3) {
          max-width: 400px;
          padding: 30px 0 0 0;
        }
      }
    }
    .copyright {
      max-width: 400px;
      margin: 0 auto;
    }
  }

  @media (min-width: 701px) and (max-width: 1000px) {
    .container {
      padding: 100px 0;
      flex-wrap: wrap;
      .footerCard {
        max-width: 300px;
        &:nth-child(3) {
          max-width: 400px;
          padding: 30px 0 0 0;
        }
      }
    }
  }

  @media (min-width: 1001px) and (max-width: 1200px) {
    .container {
      padding: 100px 0;
      flex-wrap: wrap;
      .footerCard {
        max-width: 200px;
        &:nth-child(3) {
          max-width: 400px;
          padding: 30px 0 0 0;
        }
      }
    }
  }
`;

export default Footer;
