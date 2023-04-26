import React, { useEffect, useState } from "react";
import { Button, Navbar, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken", accessToken, typeof accessToken)

  const [currentUser, setCurrentUser] = useState({});
  const [accommodations, setAccomodations] = useState([]);

  const fetchUser = async () => {
    console.log("accessToken within the fetchUser", accessToken);
    const response = await fetch("http://localhost:3001/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("response within the fetchUser", response);
    const data = await response.json();
    console.log("data within the fetchUser", data);
    setCurrentUser(data);
  };
    
  const fetchAccommodations = async () => {
    console.log("accessToken within the fetchAccommodations", accessToken);
    const response = await fetch("http://localhost:3001/accommodations", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("response within the fetchAccommodations", response);
    const data = await response.json();
    console.log("data within the fetchAccommodations", data);
    setAccomodations(data);
  };

  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchAccommodations();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="">
      <Navbar>
        <Navbar.Brand
          onClick={() => {
            navigate("/home");
          }}
          className="myProfile"
        >
          STRIVAGO
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text
            className="myProfile"
            onClick={() => {
              navigate("/myprofile");
            }}
          >
            Signed in as: {currentUser.email}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <div className="d-flex justify-content-between align-items-center mx-3 mb-3">
        <div>Find Accommodations list below</div>
        <Button
          onClick={() => {
            localStorage.removeItem("accessToken");
            setCurrentUser({});
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
      <div className="mx-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>maxGuests</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
  {accommodations &&
    accommodations.map((accommodation, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{accommodation.name}</td>
        <td>{accommodation.description}</td>
        <td>{accommodation.maxGuests}</td>
        <td>{accommodation.image ? <img src={accommodation.image} alt="Accommodation" width="200" height="150" /> : ""}</td>

      </tr>
    ))}
</tbody>

        </Table>
      </div>
    </div>
  );
}

export default Home;
