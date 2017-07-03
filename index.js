'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: Designed to take the value of anything and return the value 
 * unchanged.
 * @param <Anything> Can be any datatype
 * @return <Anything> Can again be any datatype, so long as its value is
 * unchanged.
 */
function identity(value) {
  return value;  
}
module.exports.identity = identity;

/**
 * typeOf: Designed to take value of anything and return that value's 
 * datatype as a string.
 * @param <Anything> Can be any datatype
 * @return A string; returns the value of <Anything> as a string.
 */
function typeOf(value) {
  if(Array.isArray(value)) return 'array';
  if(value instanceof Date) return 'date';
  if(value === null) return 'null';
  return typeof value;
}
module.exports.typeOf = typeOf;

/**
 * first: Designed to first determine whether a parameter, <array>, is an array
 * If so, determines whether a second parameter <number>, is a number
 * If not, the first element in <array> is returned
 * If so, the first <number> item in <array> is returned
 *@param {Array} The collection from which to pull its first value
 *@param <Number> A value which is to be returned if it is the first element
 * or item in the collection
 */
function first(array, n) {
    if(!Array.isArray(array) || n < 0) return [];
    if(n === undefined || typeof n !== 'number') return array[0];
    return array.slice(0, n);
}
module.exports.first = first;

/**
 * last: Designed to first determine whether a parameter, <array>, is an array
 * If so, determines whether a second parameter <number>, is a number
 * If not, the last element in <array> is returned
 * If so, the last <number> item in <array> is returned
 *@param {Array} The collection from which to pull its first value
 *@param <Number> A value which is to be returned if it is the last element
 * or item in the collection
 */
 function last(array, n) {
    if(!Array.isArray(array) || n < 0) return [];
    if(n === undefined || isNaN(n)) return array[array.length -1];
    return array.slice(-n);
}
module.exports.last = last;

/**
 * each: Designed to loop over a collection, Array or Object, and apply the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * indexOf: Designed to loop over a collection, Array, and find and return the
 * index of the first occurrence of a given value, if said value is not in
 * Array.
 * This function is to be built without use of the native JS method .indexOf(),
 * as it itself is to perform the action of that method
 * @param [Array] The collection over which to iterate
 * @param <value> a value
 */
function indexOf (array, value) {
    if(!array.includes(value)) return -1;
        for(let i = 0; i < array.length; i++){
            if(array[i] === value){
                return i;
            }
        }
    }
module.exports.indexOf = indexOf;

/**
 * filter: Designed to take a collection and a test Function. It uses an
 * each Function that loops over the collection, inspects a value, and 
 * determines whether the inspected value has passed the test (is truthy). If 
 * so, the value is to be returned to an array.
 * @param {Collection} an array. The collection over which to iterate.
 * @param <test> The anonymous function to be implemented.
 */
 function filter(collection, test){
     const filtered = [];
    each(collection, function(value, pos, collection) {
        // execute the test, based on result, push passed values
        if(test(value, pos, collection)) filtered.push(value);
    });
    return filtered;
}
module.exports.filter = filter;

/**
 * reject: Designed to take a collection and a test Function. It uses a filter
 * Function to test each value in the collection. Those values 
 * that don't pass (are falsey) are to be returned into a new array.
 * @param {Collection} an array. The collection over which to iterate.
 * @param <test> The anonymous function to be implemented. 
 * Hint: Reject is essentially the inverse of filter.
 */
 function reject(array, test){
    const rejected = [];
    filter(array, function(element, index, array){
        if(!test(element, index, array)) rejected.push(element);
    });
    return rejected;
}
module.exports.reject = reject;

/**
 * partition: Designed to take a collection and a Function, and call the
 * Function (filter) for each element in the collection that passes filter's
 * arguments. It is to return an array made up of two sub-arrays: one
 * containing all the values for which the Function returned something truthy,
 * and one containing all the values for which the Function returned something
 * falsey.
 * @param [Array] a collection. The collection over which to iterate.
 * @param <test> The function to be implemented.
 */
 function partition(array, test){
  const partitioned = [[], []];
  filter(array, function(element, index, array){
      if(test(element, index, array)){
          partitioned[0].push(element);
      } else {
          partitioned[1].push(element);
      }
  });
  return partitioned;
}
module.exports.partition = partition;

/**
 * unique: Designed to loop over an array and return a new array of all the
 * elements from the first array, with any duplicates removed. Uses the
 * each Function to loop over the array, and the indexOf Function to locate
 * the index at which a duplicate element exists.
 * @param [Array] a collection. The collection over which to iterate.
 */
 function unique(array) {
    const duplicatesRemoved = [];
    each(array, function(element, index, array) {
        if(indexOf(duplicatesRemoved, element) === -1) {
            duplicatesRemoved.push(element);
        }
    });
    return duplicatesRemoved;
}
module.exports.unique = unique;
 
/**
 * map: Designed to loop over a collection, Array or Object (using the each 
 * Function), applying the action Function to each value in the collection. 
 * Then, the return value of each function call is to be saved in a new array.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
 function map(collection, test){
   const mapped = [];
    each(collection, function(element, index, collection){
        mapped.push(test(element, index, collection));
    });
    return mapped;
}
module.exports.map = map;

/**
 * pluck: Designed to find the value of a property (using map) in every element 
 * of an objects array. Returns that value to a new array.
 * @param {Array} an array of objects.
 * @param <property> the value of a key/value pair at which something is to be
 * returned
 */
 function pluck(array, property){
    const plucked = [];
        map(array, function(element, index, collection){
        plucked.push(element[property]);
    });
    return plucked;
};
module.exports.pluck = pluck;

/**
 * every: Designed to take a collection (an Array or Object), as well as a 
 * predicate function, and calls this on every item in the collection (using
 * each). Returns the value of calling as a Boolean, returning false if
 * even one item in the collecion fails the predicate function test.
 * @param <A collection> The collection over which to iterate.
 * @param {Function} The function to be applied to each element.
 */
 function every(coll, func){
    let result = true;
    if (typeof func === 'function') {
        each(coll, function(element, index, array) {
          if (!func(element, index, array)) {
              result = false;
            }  
        });
    } else {
      each(coll, function(element, index, array) {
          if (!element) {
              result = false;
            }     
        });
    }
    return result;
};
module.exports.every = every;

/** 
 * some: Designed to take a collection (an Array or Object), as well as a 
 * predicate function, and calls this on every item in the collection (using
 * each). Returns the value of calling as a Boolean, returning true if
 * even one item in the collecion passes the predicate function test.
 * @param <A collection> The collection over which to iterate.
 * @param {Function} The function to be applied to each element.
 */
 function some(coll, func) {
    let result = false;
    if (typeof func === 'function') {
        each(coll, function(element, index, array) {
          if (func(element, index, array)) {
              result = true;
            }  
        });
    } else {
      each(coll, function(element, index, array) {
          if (element) {
              result = true;
            }     
        });
    }
    return result;
};
module.exports.some = some;

/**
 * reduce: Designed to take a collection, a function, and a seed, and boil a
 * list of values down into a single value. The value of <seed> changes with
 * each iteration.
 * @param {An Array} The collection over which to iterate.
 * @param {Function} The function to be applied.
 * @param <Seed> The initial value of the boiled down retun value.
 **/
 function reduce(array, test, seed) {
    let result;
    if (seed > -1) {
        result = seed;
        each(array, function(element, index, collection){
            result = test(result, element, index);
        });
    } else {
        result = array[0];
        for (let i = 1; i < array.length; i++) {
            result = test(result, array[i], i);
        }
    }
    return result;
};
module.exports.reduce = reduce;

/**
 * extend: Designed to take an initial Object and another or more, and copy each
 * successive Object's properties onto the initial Object, consecutively. The
 * initial Object is then returned,
 * @paam {An Object}
 * @param {An Object.. or several}
 */
 function extend(objectA, objectB){
    let result = objectA;
    for (let i = 0; i < arguments.length; i++){
        each(arguments[i], function(element, index, collection){
            result[index] = element;
        });
    }
     return result;
};
module.exports.extend = extend;