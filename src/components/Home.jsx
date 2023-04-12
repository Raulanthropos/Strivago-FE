import React, { useEffect, useState } from "react";
import { Button, Navbar, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [currentUser, setCurrentUser] = useState({});
  const [accommodations, setAccomodations] = useState([]);

  const fetchUser = async () => {
    const response = await fetch("http://localhost:3001/users/me", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setCurrentUser(data);
  };

  const fetchAccommodations = async () => {
    const response = await fetch("http://localhost:3001/accommodations", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
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
        <td>{accommodation.image ? <img src={accommodation.image} alt="Accommodation" /> : ""}</td>
      </tr>
    ))}
</tbody>

        </Table>
      </div>
    </div>
  );
}

export default Home;
