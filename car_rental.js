// Customer Object
var Customer = function (customerInfo) {
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.carRented = null;
};

// Car Object
var Car = function (carInfo) {
  this.id = carInfo.id;
  this.producer = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPrice;
  this.available = true;
  this.customer = null;
  this.rentalDuration = 0; // (days)

  this.quotePrice = function(rentalDuration) {
    return this.rentalPricePerDay * rentalDuration;
  }

  this.reserve = function(customer, rentalDuration) {
    if (this.available) {
      this.available = false;
      this.customer = customer;
      this.rentalDuration = rentalDuration;
      return true;
    }
    else {return false;}
  }

  this.return = function() {
    if (this.available) {
      return ("Sorry, this car has already been returned.");
    }
    else {
      this.available = true;
      this.customer = null;
      this.rentalDuration = null;
    }
  }
};

// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.addCar = function(carObj) {
    if (this.getCar(carObj.id) != undefined) {
      console.log("Car ID already exists.");
    }
    else {
      this.cars.push(carObj);
      console.log("Car added to warehouse.");
    }
  }

  this.addCustomer = function(customerObj) {
    if (this.getCustomer(customerObj.id) != undefined) {
      console.log("Customer ID already exists.");
    }
    else {
      this.customers.push(customerObj);
      console.log("Customer added to customer list.");
    }
  }

  this.removeCar = function(carID) {
    if (this.findCarIndex(carID) >= 0) {
      this.cars.splice(this.findCarIndex(carID), 1);
      console.log("Car deleted.");
    }
    else {
      console.log("Car not found.");
    }
  }

  this.removeCustomer = function(customerID) {
    if (this.findCustomerIndex(customerID) >= 0) {
      this.customers.splice(this.findCustomerIndex(customerID), 1);
      console.log("Customer deleted.");
    }
    else {
      console.log("Customer not found.");
    }
  }

  this.availableCars = function() {
    return (this.cars.filter(function(x) {
      return x.available === true;
    }));
  }

  this.rentCar = function(customerID, rentalDuration) {
    var rentable = this.availableCars();
    if (rentable.length === 0) {
      console.log("All our cars have been rented.");
    }
    else {
      var customerObj = this.getCustomer(customerID);
      var carForRent = rentable[0];
      if (customerObj != null) {
        customerObj.carRented = carForRent;
        carForRent.reserve(customerObj, rentalDuration);
        console.log("The car has been reserved.");
      }
      else {
        console.log("Please provide a valid customerID.");
      }
    }
  }

  this.returnCar = function(customerID) {
    var customerObj = this.getCustomer(customerID);
    if (customerObj != null) {
      customerObj.carRented.return();
      customerObj.carRented = null;
      console.log("Thank you for using our service.");
    }
    else {
      console.log("Please provide a valid customerID.");
    }
  }

  this.totalRevenue = function() {
    return this.cars.reduce(function(sum, car) {
      return sum + (car.quotePrice(car.rentalDuration));
    }, 0);
  }
};

// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};
var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};

var carA = new Car(carInfo);

var vendor = new Vendor('Jens Limited');
vendor.addCustormer(customerA);

console.log(vendor.availableCars());
vendor.addCar(carA);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);
