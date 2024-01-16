// Define a custom error class named BaseError that extends the built-in Error class
export default class BaseError extends Error {
  
  // Constructor for the BaseError class
  constructor(message: string = "") {
    
    // Call the constructor of the parent class (Error) with the provided message else prints empty string as message
    super(message);
  }
}
