const fiona = require('../')

const data = {
  male: {
    firstname: ['Jack', 'James', 'Oliver', 'Lewis', 'Logan', 'Harry', 'Noah', 'Leo', 'Charlie', 'Alexander', 'Jacob', 'Lucas', 'Harris', 'Mason', 'Alfie', 'Finlay', 'Ethan', 'Daniel', 'Aaron', 'Max', 'Archie', 'Thomas', 'Matthew', 'Adam', 'Rory', 'Nathan', 'Callum', 'Joshua', 'Oscar', 'Brodie', 'Cameron', 'Harrison', 'William', 'Finn', 'Riley', 'Dylan', 'Samuel', 'Jaxon', 'Liam', 'Ollie', 'Jamie', 'Connor', 'Luke', 'Theo', 'Ryan', 'Andrew', 'Caleb', 'Jude', 'Joseph', 'Benjamin', 'Muhammad', 'Arran', 'Angus', 'John', 'David', 'Isaac', 'Cole', 'Hamish', 'Robert', 'Jackson', 'Michael', 'George', 'Kai', 'Leon', 'Kyle', 'Ben', 'Luca', 'Blake', 'Murray', 'Aiden', 'Carter', 'Jake', 'Owen', 'Cooper', 'Freddie', 'Ruaridh', 'Jayden', 'Aidan', 'Fraser', 'Reuben', 'Euan', 'Sam', 'Blair', 'Calvin', 'Christopher', 'Alex', 'Arthur', 'Calum', 'Cody', 'Elliot', 'Josh', 'Lachlan', 'Zac', 'Arlo', 'Kayden', 'Robbie', 'Tyler', 'Conor', 'Henry', 'Hunter', 'Zachary'],
    title: ['Mr', 'Dr', 'Sir', 'Lord']
  },
  female: {
    firstname: ['Fiona', 'Aria', 'Mia', 'Emily', 'Sophie', 'Ava', 'Amelia', 'Jessica', 'Ella', 'Lucy', 'Charlotte', 'Ellie', 'Lily', 'Grace', 'Sophia', 'Chloe', 'Evie', 'Emma', 'Millie', 'Eilidh', 'Anna', 'Eva', 'Hannah', 'Erin', 'Layla', 'Ruby', 'Orla', 'Harper', 'Georgia', 'Maisie', 'Isabella', 'Katie', 'Zoe', 'Holly', 'Robyn', 'Amber', 'Rosie', 'Zara', 'Emilia', 'Sofia', 'Skye', 'Poppy', 'Daisy', 'Alice', 'Lilly', 'Esme', 'Rebecca', 'Scarlett', 'Ivy', 'Abigail', 'Imogen', 'Leah', 'Amy', 'Lacey', 'Maya', 'Niamh', 'Willow', 'Thea', 'Elizabeth', 'Abbie', 'Lexi', 'Hollie', 'Molly', 'Brooke', 'Gracie', 'Sarah', 'Cara', 'Sienna', 'Mila', 'Phoebe', 'Rose', 'Lola', 'Iona', 'Ayla', 'Megan', 'Paige', 'Kayla', 'Julia', 'Mya', 'Alexandra', 'Arianna', 'Summer', 'Hope', 'Quinn', 'Maria', 'Eve', 'Violet', 'Ariana', 'Arya', 'Bella', 'Elsie', 'Lillie', 'Florence', 'Hanna', 'Madison', 'Amelie', 'Matilda', 'Lauren'],
    title: ['Miss', 'Mrs', 'Dr', 'Ms', 'Dame']
  },
  lastname: ['Moon', 'Smith', 'Brown', 'Wilson', 'Robertson', 'Campbell', 'Stewart', 'Thomson', 'Anderson', 'Scott', 'MacDonald', 'Reid', 'Murray', 'Clark', 'Taylor', 'Ross', 'Young', 'Paterson', 'Watson', 'Mitchell', 'Fraser']
}

const getGender = gender => (gender && (gender[0].toLowerCase() === 'f' ? 'female' : 'male'))

fiona.plugin('gender', ({ seeded }) => {
  return seeded.random() < 0.5 ? 'male' : 'female'
})

fiona.plugin('title', ({ seeded }, { gender } = {}) => {
  return seeded.oneOf(data[getGender(gender || seeded.gender())].title)
})

fiona.plugin('firstname', ({ seeded }, { gender } = {}) => {
  return seeded.oneOf(data[getGender(gender || seeded.gender())].firstname)
})

fiona.plugin('firstnames', ({ seeded }, { gender } = {}) => {
  return seeded.choose(seeded.clone().weighting(x => x * x * x).number({ min: 1, max: 3 }), data[getGender(gender || seeded.gender())].firstname).join(' ')
})

fiona.plugin('lastname', ({ seeded }) => {
  return seeded.choose(seeded.clone().weighting(x => x * x * x).number({ min: 1, max: 2 }), data.lastname).join(seeded.bool() ? ' ' : '-')
})

fiona.plugin('name', ({ seeded }, { gender } = {}) => {
  const myGender = getGender(gender || seeded.gender())
  return `${seeded.title({ gender: myGender })} ${seeded.firstnames({ gender: myGender })} ${seeded.lastname()}`
})

fiona.namedata = data
