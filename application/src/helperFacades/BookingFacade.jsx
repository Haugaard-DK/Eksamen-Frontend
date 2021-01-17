import apiFacade from "./ApiFacade";

function BookingFacade() {
  const getBookings = (token) => {
    const request = apiFacade.prepareRequest("GET", null, token);
    return apiFacade.submitRequest("/Booking/getAll", request);
  };

  const bookHotel = (token) => {
    const request = apiFacade.prepareRequest("POST", null, token);
    return apiFacade.submitRequest("/Booking/bookHotel", request);
  };

  return { getBookings, bookHotel };
}

const bookingFacade = BookingFacade();
export default bookingFacade;
