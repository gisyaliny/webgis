console.log(8 * null);
// → 0
console.log("5" - 1);
// → 4
console.log("5" + 1);
// → 51
console.log("five" * 2);
// → NaN
console.log(false == 0);
// → true
console.log(null == undefined);
// → true
console.log(null == 0);
// → false
console.log(null || "user");
// → user
console.log("Agnes" || "user");
// → Agnes
let numbers = [1, 2, 3, 4, 5];
console.log(numbers); // Output: [1, 2, 3, 4, 5]
numbers.splice(2, 1); // Removes 1 element at index 2
console.log(numbers); // Output: [1, 2, 4, 5]

function Person(name, age) {
    this.name = name;
    this.age = age;
}
let john = new Person("John", 30);
console.log(john.name); // Output: John
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    hobbies: ["music", "movies", "sports"],
    address: {
      street: "50 main st",
      city: "Boston",
      state: "MA",
    },
  };
  
  const {
    firstName,
    lastName,
    address: { city },
  } = person;
//   console.log(address);
console.log(city);

const personJSON = JSON.stringify(person);
console.log(personJSON);