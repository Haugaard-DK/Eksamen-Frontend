import { useEffect, useState } from "react";
import facade from "../facade";
import { Form, Button, Alert } from "react-bootstrap";

export default function Booking() {
  const [getBookings, setBookings] = useState("Loading...");
  const [error, setError] = useState(null);
  const init = {
    startDate: "",
    numberOfNights: "",
    pricePerNight: "",
  };
  const [bookingCredentials, setBookingCredentials] = useState(init);

  const performBooking = (event) => {
    event.preventDefault();

    setError(null);

    if (
      bookingCredentials.startDate !== "" &&
      bookingCredentials.numberOfNights !== "" &&
      bookingCredentials.pricePerNight !== ""
    ) {
      facade
        .bookHotel(
          bookingCredentials.startDate,
          bookingCredentials.numberOfNights,
          bookingCredentials.pricePerNight
        )
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }
        });
    } else {
      setError(
        "All fields are mandatory, please verify you have provided all of the requested details."
      );
    }
  };

  const onChange = (event) => {
    setBookingCredentials({
      ...bookingCredentials,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    facade
      .getBookings()
      .then((bookings) => {
        setBookings(
          bookings.map((data) => {
            return (
              <ul key={"booking_" + data.startDate}>
                <li key={"startDate_" + data.startDate}>
                  Start date: {data.startDate}
                </li>
                <li key={"numberOfNights_" + data.numberOfNights}>
                  Number of nights: {data.numberOfNights}
                </li>
                <li key={"pricePerNight_" + data.pricePerNight}>
                  Price per night: {data.pricePerNight}
                </li>
                <br />
              </ul>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError("An error occurred while processing your request.");
      });
  }, []);

  return (
    <>
      <h2>Booking</h2>
      <Form onChange={onChange}>
        <Form.Group>
          <Form.Label>Start date</Form.Label>
          <Form.Control type="text" placeholder="31/01/12" id="startDate" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Number of nights</Form.Label>
          <Form.Control type="text" placeholder="42" id="numberOfNights" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price per night</Form.Label>
          <Form.Control type="text" placeholder="23" id="pricePerNight" />
        </Form.Group>
      </Form>

      <Button variant="primary" type="submit" onClick={performBooking}>
        Book Hotel
      </Button>

      {error ? (
        <>{error && <Alert variant="danger">{error}</Alert>}</>
      ) : (
        <>
          <br />
          <br />
          <h2>Bookings</h2>
          <ul>{getBookings}</ul>
        </>
      )}
    </>
  );
}
