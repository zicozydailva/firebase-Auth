import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const PhoneSignup = () => {
  const navigate = useNavigate()
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(false)
  const [confirmObj, setConfirmObj] = useState("")
  const {setUpRecaptcha} = useUserAuth();

  const getOtp = async (e) => {
    e.preventDefault()
    setError("")
    if(number === "" || number === undefined) 
    return setError("Please Enter a valid phone Number")

    try {
      const response = await setUpRecaptcha(number)
      console.log(response);
      setConfirmObj(response)
      setFlag(true)
    } catch (error) {
      setError(error)
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    if(otp === "" || otp === null) return
    try {
      setError("")
      await confirmObj.confirm(otp)
      navigate("/home")
    } catch (error) {
      setError(error.message) 
    }
  }
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{display: !flag ? "block" : "none"}}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput
              defaultCountry="NG"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to='/'>
              <Button className="m-3" variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary">Send OTP</Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{display: flag ? "block" : "none"}} className="mt-4 ">
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control type="text" onChange={e => setOtp(e.target.value)} placeholder='Enter OTP'>
              
            </Form.Control>
          </Form.Group>
          <div className="button-right">
            <Link to='/'>
              <Button className="m-3" variant="secondary">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary">Verify OTP</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSignup;
