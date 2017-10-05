import fiona from '../src/fiona'

const data = {
  male: {
    firstname: ['Jack', 'James', 'Oliver', 'Lewis', 'Logan', 'Harry', 'Noah', 'Leo', 'Charlie', 'Alexander', 'Jacob', 'Lucas', 'Harris', 'Mason', 'Alfie', 'Finlay', 'Ethan', 'Daniel', 'Aaron', 'Max', 'Archie', 'Thomas', 'Matthew', 'Adam', 'Rory', 'Nathan', 'Callum', 'Joshua', 'Oscar', 'Brodie', 'Cameron', 'Harrison', 'William', 'Finn', 'Riley', 'Dylan', 'Samuel', 'Jaxon', 'Liam', 'Ollie', 'Jamie', 'Connor', 'Luke', 'Theo', 'Ryan', 'Andrew', 'Caleb', 'Jude', 'Joseph', 'Benjamin', 'Muhammad', 'Arran', 'Angus', 'John', 'David', 'Isaac', 'Cole', 'Hamish', 'Robert', 'Jackson', 'Michael', 'George', 'Kai', 'Leon', 'Kyle', 'Ben', 'Luca', 'Blake', 'Murray', 'Aiden', 'Carter', 'Jake', 'Owen', 'Cooper', 'Freddie', 'Ruaridh', 'Jayden', 'Aidan', 'Fraser', 'Reuben', 'Euan', 'Sam', 'Blair', 'Calvin', 'Christopher', 'Alex', 'Arthur', 'Calum', 'Cody', 'Elliot', 'Josh', 'Lachlan', 'Zac', 'Arlo', 'Kayden', 'Robbie', 'Tyler', 'Conor', 'Henry', 'Hunter', 'Zachary'],
    title: ['Mr', 'Dr', 'Sir', 'Lord']
  },
  female: {
    firstname: ['Fiona', 'Aria', 'Mia', 'Emily', 'Sophie', 'Ava', 'Amelia', 'Jessica', 'Ella', 'Lucy', 'Charlotte', 'Ellie', 'Lily', 'Grace', 'Sophia', 'Chloe', 'Evie', 'Emma', 'Millie', 'Eilidh', 'Anna', 'Eva', 'Hannah', 'Erin', 'Layla', 'Ruby', 'Orla', 'Harper', 'Georgia', 'Maisie', 'Isabella', 'Katie', 'Zoe', 'Holly', 'Robyn', 'Amber', 'Rosie', 'Zara', 'Emilia', 'Sofia', 'Skye', 'Poppy', 'Daisy', 'Alice', 'Lilly', 'Esme', 'Rebecca', 'Scarlett', 'Ivy', 'Abigail', 'Imogen', 'Leah', 'Amy', 'Lacey', 'Maya', 'Niamh', 'Willow', 'Thea', 'Elizabeth', 'Abbie', 'Lexi', 'Hollie', 'Molly', 'Brooke', 'Gracie', 'Sarah', 'Cara', 'Sienna', 'Mila', 'Phoebe', 'Rose', 'Lola', 'Iona', 'Ayla', 'Megan', 'Paige', 'Kayla', 'Julia', 'Mya', 'Alexandra', 'Arianna', 'Summer', 'Hope', 'Quinn', 'Maria', 'Eve', 'Violet', 'Ariana', 'Arya', 'Bella', 'Elsie', 'Lillie', 'Florence', 'Hanna', 'Madison', 'Amelie', 'Matilda', 'Lauren'],
    title: ['Miss', 'Mrs', 'Dr', 'Ms', 'Dame']
  },
  surname: ['Moon', 'Smith', 'Brown', 'Wilson', 'Robertson', 'Campbell', 'Stewart', 'Thomson', 'Anderson', 'Scott', 'MacDonald', 'Reid', 'Murray', 'Clark', 'Taylor', 'Ross', 'Young', 'Paterson', 'Watson', 'Mitchell', 'Fraser']
}

const getGender = gender => (gender && (gender[0].toLowerCase() === 'f' ? 'female' : 'male')) || this.gender()

fiona.fn.gender = function () {
  return this.random() < 0.5 ? 'male' : 'female'
}

fiona.fn.title = function (opts) {
  const gender = getGender((opts || {}).gender || this.gender())
  return this.oneOf(data[gender].title)
}

fiona.fn.firstname = function (opts) {
  const gender = getGender((opts || {}).gender || this.gender())
  return this.oneOf(data[gender].firstname)
}

fiona.fn.firstnames = function (opts) {
  const gender = getGender((opts || {}).gender || this.gender())
  return this.choose(this.number(3, 1), data[gender].firstname).join(' ')
}

fiona.fn.surname = function () {
  return this.oneOf(data.surname)
}

fiona.fn.name = function (opts) {
  const gender = getGender((opts || {}).gender || this.gender())
  return `${this.title({ gender })} ${this.firstnames({ gender })} ${this.surname()}`
}

fiona.namedata = data
