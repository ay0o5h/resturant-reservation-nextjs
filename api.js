import Cookies from "js-cookie";
export const URL = "https://resturant-booking.herokuapp.com/v1";

export const ApiLogin = (info, callback) => {
  console.log(info);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${URL}/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
export const ApiRegister = (info, callback) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};

export const ApiRestaurant = async (callback) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${URL}/resturant-all`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      console.log(result.rest);
      if (result.status) return callback(result.rest);
      return callback(null, "Error Occured");
    })
    .catch((error) => console.log("error", error));
};
export const ApiRestaurantOne = (info, callback) => {
  var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch(`${URL}/resturant/${parseInt(info)}`, requestOptions)
  .then(response => response.json())
  .then(result => {
     if (result.status) return callback(result.rest);
      return callback(null, "Error Occured");
  })
  .catch(error => console.log('error', error));
}
export const makeReservation = async (id, info, callback) => {
  
    const token = await Cookies.get("token");
  console.log(info);
   console.log(id);
  
  var myHeaders = new Headers();
   myHeaders.append("token", token);
myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${URL}/resturant/${parseInt(id)}/booking`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      console.log(result.book);
      callback(null, result.errMsg);
      console.log(result)
    })
    .catch((error) => console.log("error", error));

}
export const getActiveBookings = async (callback) => {
    const token = await Cookies.get("token");

  var myHeaders = new Headers();
myHeaders.append("token", token);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/booking/active`, requestOptions)
  .then(response => response.json())
  .then(result => {
      if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
      console.log(result)
  })
  .catch(error => console.log('error', error));
}
export const getPreviousBookings = async (callback) => {
    const token = await Cookies.get("token");

  var myHeaders = new Headers();
myHeaders.append("token", token);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/booking/previous`, requestOptions)
  .then(response => response.json())
  .then(result => {
      if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
      console.log(result)
  })
  .catch(error => console.log('error', error));
}

export const deleteBooking = async (info, callback)=>{
  const token = await Cookies.get("token");

  var myHeaders = new Headers();
myHeaders.append("token", token);
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${URL}/booking/delete/${parseInt(info)}`, requestOptions)
  .then(response => response.json())
  .then(result => {
     if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
      console.log(result)
  })
  .catch(error => console.log('error', error));
}
export const cancalBooking = async (info, callback) => {
 const token = await Cookies.get("token");

  var myHeaders = new Headers();
myHeaders.append("token", token);
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify({
  "status": "cancaled"
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${URL}/booking/cancel/${parseInt(info)}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if (result.status) return callback(result, null);
      console.log(result.data);
      callback(null, result.errMsg);
      console.log(result)
  })
  .catch(error => console.log('error', error));
}