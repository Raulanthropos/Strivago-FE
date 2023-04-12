import React, { useEffect, useState } from "react";
import { Button, ListGroup, Navbar, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const [currentUser, setCurrentUser] = useState({});
  const [myAccommodations, setMyAccomodations] = useState([]);
  const [error, isError] = useState("false");

  const fetchUser = async () => {
    const response = await fetch("http://localhost:3001/users/me", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setCurrentUser(data);
  };

  const fetchMyAccommodations = async () => {
    const response = await fetch(
      "http://localhost:3001/users/me/accommodations",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 403) {
      isError(true);
    } else {
      isError(false);
      const data = await response.json();
      console.log(data);
      setMyAccomodations(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchMyAccommodations();
  }, []);

  return (
    <>
      <Navbar>
        <Navbar.Brand
          className="myProfile"
          onClick={() => {
            navigate("/home");
          }}
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
      <div className="App-header">
        <div>MyProfile</div>

        <ListGroup className="text-dark">
          <ListGroup.Item>{currentUser.email}</ListGroup.Item>
          <ListGroup.Item>{currentUser.createdAt}</ListGroup.Item>
          <ListGroup.Item>{currentUser.role}</ListGroup.Item>
        </ListGroup>

        <div>My Accommodations</div>
        {error === false ? (
          <Table className="text-white" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>maxGuests</th>
              </tr>
            </thead>
            <tbody>
              {myAccommodations.length !== 0 &&
                myAccommodations.map((accommodation, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{accommodation.name}</td>
                    <td>{accommodation.description}</td>
                    <td>{accommodation.maxGuests}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <div>You are not a host. You have 0 accommodations.</div>
        )}
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
    </>
  );
}

export default MyProfile;
