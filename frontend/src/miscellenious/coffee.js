import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, Select } from "@chakra-ui/react";
import { getStatesOfCountry } from "../assets/state";
import { countries } from "countries-list";

const CoffeeModal = () => {
  const toast = useToast();
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState(0);
  const [province, setProvince] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: country.name,
  }));

  const handleSubmit = async () => {
    if (!country || !amount) {
      toast({
        title: "Form was incomplete",
        status: "warning",
      });
      return;
    }
    try {
      const { data } = await axios.post("/api/donate", {
        country,
        province,
        amount,
      });
      toast({
        title: data.message,
        status: "success",
      });
    } catch (error) {
      console.error("Donation error:", error);
      toast({
        title: "An Error Occurred!",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(country);
      setSubdivisions(states);
    };

    if (country) {
      fetchSubdivisions();
    } else {
      setSubdivisions([]);
    }
  }, [country]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}>
      <h2>Donation details</h2>
      <p>
        Country: <strong>{country}</strong>
        <br />
        State: <strong>{province}</strong>
        <br />
        Donation: <strong>${amount}</strong>
      </p>
      {!showPayPalButtons && (
        <>
          <label>Country:</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select your country</option>
            {countryOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
              {country && subdivisions.length > 0 ? (
                <FormControl id="provinces" isRequired>
                  <FormLabel textColor={"grey"}>County/Province</FormLabel>
                  <Select
                    placeholder="Select your province"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textColor={"grey"}
                    width={"100%"}
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    {subdivisions.map((subdivision, index) => (
                      <option
                        key={index}
                        value={subdivision.value}
                        style={{ color: "black" }}
                      >
                        {subdivision.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl id="provinces">
                  <FormLabel textColor={"grey"}>County/Province</FormLabel>
                  <Input
                    type="text"
                    textColor={"grey"}
                    placeholder="Leave blank if not applicable..."
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </FormControl>
              )}
          <label>Donate:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={() => setShowPayPalButtons(true)} disabled={!country || !amount}>
            Pay
          </button>
        </>
      )}
      {showPayPalButtons && (
        <PayPalScriptProvider
        options={{
          clientId:
            "ASgI4T_UWqJJpTSaNkqcXbQ9H8ub0f_DAMR8SJByA19N4HtPK0XRgTv4xJjj4Mpx_KxenyLzBDapnJ82",
        }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: amount,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              await handleSubmit();
              return actions.order.capture().then(function (details) {
                toast({
                  title: "Transaction Successful",
                  description: "Thank you for your support!",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                  position: "bottom",
                });
              });
            }}
            onCancel={() => {
              toast({
                title: "Transaction Canceled",
                description: "Thank you for considering!",
                status: "info",
                duration: 3000,
                isClosable: true,
                position: "bottom",
              });
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              toast({
                title: "Transaction Error",
                description: "An error occurred with the PayPal transaction.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
              });
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default CoffeeModal;
