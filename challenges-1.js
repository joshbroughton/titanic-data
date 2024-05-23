// ================================================================

// Titanic Dataset challenges!

// Your goal is to write some functions that will extract
// relevant data from the dataset.

// Write your code here in this file.

// *************************************
// Test your code by running: `npm test`
// *************************************

// Each of the functions below expects to receive the Titanic data
// as the parameter data. Your goal is to extract the relevant
// piece of information from the data and return it.

// =================================================================
const filterSingleField = (data, field, value) => {
	return(data.filter(p => p.fields[field] === value).length)
}
// 1 ---------------------------------------------------------------
// Return the total number of passengers.
// Returns a number.

const getTotalPassengers = (data) => {
	return data.length
}

// 2 ---------------------------------------------------------------
// Return the number of surviving passengers. A passenger survived
// if their survived property is "Yes".
// Return a number.

const getSurvivorCount = (data) => {
	return(filterSingleField(data, 'survived', 'Yes'))
}

// 3 ---------------------------------------------------------------
// Return the number of passengers who did not survive. A passenger
// did not survive if their survived property is "No".
// Return a number.

const getCasualityCount = (data) => {
	return(filterSingleField(data, 'survived', 'No'))
}

// 4 ---------------------------------------------------------------
// Return the number of passengers in any class. This function
// takes the data and the passenger class a string. Find all of the
// passengers whose pclass matches and return the count.
// Return a number

const countPassengersInClass = (data, pclass) => {
	return(filterSingleField(data, 'pclass', pclass))
}

// 5 ---------------------------------------------------------------
// Return the number of survivors in a class. This function takes
// the data and passenger class.
// Return the count of survivors in that pclass.

const getSurvivorCountForClass = (data, pclass) => {
	return(data.filter(p => p.fields.pclass === pclass && p.fields.survived === 'Yes').length)
}

// 6 ---------------------------------------------------------------
// Return the number of passengers who did not survive in a class.
// This function takes the data and the passenger class and returns
// the number of passengers who did not survive for that class.

const getCasualityCountForClass = (data, pclass) => {
	return(data.filter(p => p.fields.pclass === pclass && p.fields.survived === 'No').length)
}

// 7 ---------------------------------------------------------------
// Return the age of the youngest passenger. You need to filter
// passenger data where the age is missing.

const getMinAge = (data) => {
	data = data.filter(p => "age" in p.fields )
	return(data.reduce((prev, current) => {
		return(prev < current.fields.age ? prev : current.fields.age)
  }, data[0].fields.age))
}

// 8 ---------------------------------------------------------------
// Return the age of the oldest passenger. Filter passengers where
// age is missing.

const getMaxAge = (data) => {
	data = data.filter(p => "age" in p.fields )
	return(data.reduce((prev, current) => {
		return(prev > current.fields.age ? prev : current.fields.age)
  }, data[0].fields.age))
}

// 9 ---------------------------------------------------------------
// Return the number of passengers that embarked at a given stop.
// Each passenger has a embarked property with a value of: S, C,
// or Q. This function takes in the passenger data and the
// embarkation code. Return the count of passenegers with that code.

const getEmbarkedCount = (data, embarked) => {
	return(filterSingleField(data, 'embarked', embarked))
}

// 10 ---------------------------------------------------------------
// Return the lowest fair paid by any passenger. The fare is missing
// for some passengers you'll need to filter this out!

const getMinFare = (data) => {
	data = data.filter(p => "fare" in p.fields )
	return(data.reduce((prev, current) => {
		return(prev < current.fields.fare ? prev : current.fields.fare)
  }, data[0].fields.fare))
}

// 11 ---------------------------------------------------------------
// Return the highest fare paid by any passenger. Some of the
// passengers are missing data for fare. Be sure to filter these!

const getMaxFare = (data) => {
	data = data.filter(p => "fare" in p.fields )
	return(data.reduce((prev, current) => {
		return(prev > current.fields.fare ? prev : current.fields.fare)
  }, data[0].fields.fare))
}

// 12 ---------------------------------------------------------------
// Return the count of passengers by gender. Each passenger object has
// "sex" property that is either "male" or "female"

const getPassengersByGender = (data, gender) => {
	return(filterSingleField(data, 'sex', gender))
}

// 13 ---------------------------------------------------------------
// Return the number of passengers who survived by gender. This
// function receives parameters of data and gender. Match the gender
// to the "sex" property and check the "survived" property.

const getSurvivorsByGender = (data, gender) => {
	return(data.filter(p => p.fields.sex === gender && p.fields.survived === 'Yes').length)
}

// 14 ---------------------------------------------------------------
// Return the number of passengers who did not survived by gender.

const getCasualitiesByGender = (data, gender) => {
	return(data.filter(p => p.fields.sex === gender && p.fields.survived === 'No').length)
}

// 15 --------------------------------------------------------------
// Return the total of all fares paid. Add up all of the fares and
// return that number. Be sure to filter the passengers records
// where the fare is missing!

const getTotalFare = (data) => {
	return(data.reduce((sum, current) => "fare" in current.fields ? sum += current.fields.fare : sum, 0))
}

// 16 --------------------------------------------------------------
// Return the average fare paid. Add up all of the fares and divide
// by the number of passengers. Be sure to filter passengers who are
// missing a fare!

const getAverageFare = (data) => {
	return(getTotalFare(data) / getTotalPassengers(data))
}

// 17 --------------------------------------------------------------
// Return the median fare. The median is the value equal distance
// from the minimum and maximum values. Filter passengers who are
// missing fares. Sort the passengers on the fare pick the one in
// the middle: [11,33,77] <- 33 is the median. If number of items
// is even average the two middle values. For example: [2,4,5,16]
// 4 + 5 = 9 / 2 median is 4.5!

const getMedianFare = (data) => {
	data = data.filter(p => "fare" in p.fields).map(p => p.fields.fare)
	data.sort((a, b) => b - a)
	length = data.length
	if (length % 2 !== 0) {
		return(data[Math.floor(length / 2)])
	} else {
		return((data[length / 2] + data[(length / 2) + 1]) / 2)
	}
}

// 18 --------------------------------------------------------------
// Return the average age of all passengers. Add all ages and divide
// by the number of passenegers. Be sure to filter where ages are not
// available.

const getAverageAge = (data) => {
	totalAge = data.reduce((sum, current) => "age" in current.fields ? sum += current.fields.age : sum, 0)
	return totalAge / data.filter(p =>"age" in p.fields).length
}

// 19 --------------------------------------------------------------
// Return the median age from passengers.

const getMedianAge = (data) => {
	data = data.filter(p => "age" in p.fields).map(p => p.fields.age)
	data.sort((a, b) => b - a)
	length = data.length
	if (length % 2 !== 0) {
		return(data[Math.floor(length / 2)])
	} else {
		return((data[length / 2] + data[(length / 2) + 1]) / 2)
	}
}

// 20 --------------------------------------------------------------
// Add up all of the ages for the gender provided and divide by the
// the total number.

const getAverageAgeByGender = (data, gender) => {
	totalAge = data.reduce((sum, current) => "age" in current.fields && current.fields.sex === gender ? sum += current.fields.age : sum, 0)
	return totalAge / data.filter(p => "age" in p.fields && p.fields.sex === gender).length
}

// --------------------------------------------------------------
// --------------------------------------------------------------

module.exports = {
	getTotalPassengers,
	getSurvivorCount,
	getCasualityCount,
  countPassengersInClass,
  getSurvivorCountForClass,
	getCasualityCountForClass,
	getMinAge,
	getMaxAge,
	getEmbarkedCount,
	getMaxFare,
	getMinFare,
	getPassengersByGender,
	getSurvivorsByGender,
	getCasualitiesByGender,
	getTotalFare,
	getAverageFare,
	getMedianFare,
	getAverageAge,
	getMedianAge,
	getAverageAgeByGender
}
