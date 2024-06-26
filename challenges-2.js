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

// ===============================================================

// ---------------------------------------------------------------
// 1 -------------------------------------------------------------
// Return an array of all the values in data for a given property
// For example if property = 'fare' the output should be a list of
// all fares something like: [7.3125, 15.75, 7.775, 10.5, ...]
// Or if property = 'age' -> [40, 26, 22, 28, 23, 45, 21, ...]

const getAllValuesForProperty = (data, property) => {
	return(data.map(p => p.fields[property]))
}

// 2 -------------------------------------------------------------
// Return an array where a given property matches the given value
// For example property = 'sex' and value = 'male' returns an
// array of all the male passengers [{...}, {...}, {...}, ...]
// Here the goal is to return an array of passenger objects
// that patch the property and value.

const filterByProperty = (data, property, value) => {
	return(data.filter(p => p.fields[property] === value))
}

// 3 -------------------------------------------------------------
// Filter out missing values
// Return an array where the objects that have undefined for a
// given property have been removed

const filterNullForProperty = (data, property) => {
	return(data.filter(p => property in p.fields))
}

// 4 -------------------------------------------------------------
// Abstract the sum by creating a function that returns the sum
// for any (numeric) property
// Return the total of all values for a given property.
// You need to remove any missing values because n + undefined = NaN!

const sumAllProperty = (data, property) => {
	data = filterNullForProperty(data, property)
	data = getAllValuesForProperty(data, property)
	return(data.reduce((sum, current) => sum += current))
}


// 5 -------------------------------------------------------------
// Count unique values for property. The goal here is return an
// object with keys equal to the unique values for a property and
// values equal to the number of times that property appears. For
// example the embarked property has three unique values: S, C,
// and Q, and a couple passengers have undefined for this property.
// So the output should be: { S: 644, C: 168, Q: 77, undefined: 2 }
// That is 644 passengers embarked at South Hampton. 168 embarked
// at Cherbourg, 77 emabrked at Queenstown, and 2 are undedfined

const countAllProperty = (data, property) => {
	result = {}
	data.forEach(p =>
		{
			if (property in p.fields) {
				p.fields[property] in result ? result[p.fields[property]] += 1 : result[p.fields[property]] = 1
			} else {
				"undefined" in result ? result.undefined += 1 : result.undefined = 1
			}
		})
	return result
}

// Use reduce with an object as the starting accumulator!


// 6 ------------------------------------------------------------
// Make histogram. The goal is to return an array with values
// of a properties divided into buckets and counting the number
// of items in each bucket.
// step is the value division. For example if step were 10 and the
// property was age. You would be counting how many passengers were
// ages 0 - 10, 10 - 20, 20 - 30 etc.

const makeHistogram = (data, property, step) => {
	result = [];
	let values = getAllValuesForProperty(data, property);
	values = values.filter((val) => val !== undefined)
	values.sort((a, b) => a - b);
	let i = 0
	values.forEach((val) => {
		while (val >= (step * (i+1))) {
			i += 1;
		}
		result[i] ? result[i] += 1 : result[i] = 1
	})
	result = Array.from(result, (e) => e === undefined ? 0 : e)
	return result;
}

// Note! There may not be no values for a particular step. For example
// if we get passenger ages in increments of 5 there are 0 passengers in the
// 70 bracket but there are passengers in 60, and 80. So you might end up with
// Age bucket
//   5 10 15 20  25  30 35 40 45 50 55 60 65 70 75            80  85
// [40,22,16,86,114,106,95,72,48,41,32,16,15, 4, 6,<1 empty item>, 1]
// There are 0 passengers in the 76 to 80 year age bucket. You may have the
// right answer but if that slot in the array is empty the test will fail
// becuase that index should show 0. There are 0 passengers in that age range.


// 7 ------------------------------------------------------------
// normalizeProperty takes data and a property and returns an
// array of normalized values. To normalize the values you need
// to divide each value by the maximum value in the array.

const normalizeProperty = (data, property) => {
	let values = getAllValuesForProperty(data, property);
	values = values.filter((val) => val !== undefined);
	let max = values.reduce((prev, curr) => curr > prev ? curr : prev)
	return values.map((val) => val / max)
}

// Normalizing is an important process that can make many other
// operations easier. Normalizing allows you to take numbers in one
// range and convert them to any other range.
// For this example you need to find the max value first before
// generating an array of normalized values.

// If the range of data included negative numbers or did not start at 0
// we might also need to find the minimum value.

// 8 ------------------------------------------------------------
// Write a function that gets all unique values for a property.
// Given the array of data and a property string it should return
// an array of all of the unique values under that property.
// For example if the property string were "sex" this function
// would return ['male', 'female']

const getUniqueValues = (data, property) => {
	result = {};
	let values = getAllValuesForProperty(data, property);
	values.forEach((val) => val in result ? result : result[val] = true);
	delete result.undefined;
	return Object.keys(result);
}

// There are a couple ways to do this.
// Use an object and add each value as a key. The value can be anything.
// Use a Set. Be sure to convert this to an array before returning!

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
	getAllValuesForProperty,
	filterByProperty,
	filterNullForProperty,
	sumAllProperty,
	countAllProperty,
	makeHistogram,
	normalizeProperty,
	getUniqueValues
}
