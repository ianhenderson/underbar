/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {return array.slice(-1)[0];}
    else {return n == 0 ? [] : array.slice(-n);}
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)){
      for (var i = 0; i < collection.length; i++) {iterator(collection[i], i, collection);}
    }
    else {
      for (var key in collection) {iterator(collection[key], key, collection);}
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    _.each(collection, function(item, index, collection) {
      if (test(item, index, collection)) {
        if (Array.isArray(collection)) {results.push(item);}  // For arrays, push values
        else {results.push(index);}                           // For objects, push keys
      }
    });

    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(value){
      return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // Used 'breadcrumbing' method here.
    var results = {};
    _.each(array, function(value){
      results[value] = true;
    });
    return Object.keys(results);
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var results = [];
    _.each(array, function(item, index, collection) {
      results.push(iterator(item, index, collection));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value){
      if (typeof functionOrKey === 'function'){
        return functionOrKey.apply(value, args);
      }
      else {
        return String.prototype[functionOrKey].apply(value, args);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    _.each(collection, function(value){
      accumulator = iterator(accumulator, value);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var iter = iterator || _.identity;
    return _.reduce(collection, function(previousValue, current){
      return (previousValue && !!iter(current));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    var iter = iterator || _.identity;
    return !_.every(collection, function(value){return !iter(value)}) ;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments, 1);  // args = [ obj1, obj2, ... ]
    _.each(args, function(value, keys){                   // loop over each obj in args
      _.each(value, function(v,k){                        // loop over each property in obj1, obj2, ...
        obj[k] = v;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(value, keys){
      _.each(value, function(v,k){
        if (!obj.hasOwnProperty(k)){ obj[k] = v;}
      })
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var data = {};
    return function(num){
      if (!data.hasOwnProperty(num)){
        data[num] = func.apply(this,arguments);
      }
      return data[num];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
   var arr = array.slice();

    // For-loop method:
    // for (var i = 0; i < arr.length - i; i++){
    //   var index = Math.floor(Math.random() * (arr.length - i));
    //   arr.push(arr.splice(index, 1)[0]);
    // }

    // While-loop method:
    var i = 0;
    while (i < arr.length - i){
      var index = Math.floor(Math.random() * (arr.length - i++));
      arr.push(arr.splice(index,1)[0]);
    }

    return arr;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(function(a,b){
      if (typeof iterator === 'function'){
        return iterator(a) - iterator(b);
      }
      if (iterator === 'length'){
        return a.length - b.length;
      }
      else {
        return a - b;
      }
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(arr1, arr2) {
    // First, we find the length of the longest array:
    var args = Array.prototype.slice.call(arguments);       // args === [['a','b','c','d'], [1,2,3]]
    var length = _.map(args, function(array){               // length === [4,3]
      return array.length; 
    });
    length = _.reduce(length, function(prev, current){      // length === 4
      return current > prev ? current : prev; 
    }, true)
    // Now, we blend the arrays together, automatically filling in "undefined" for the blank spots:
    var result = [];
    _.each(args, function(array){
      for (var i = 0; i < length; i++){
        if (!Array.isArray(result[i])) { result[i] = []; }
        result[i].push(array[i]);
      }
      
    });
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var results = result || [];
    _.each(nestedArray, function(value){
      if (!Array.isArray(value)) {results.push(value);}
      else {_.flatten(value, results);}
    });
    return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    // First, make one big array with all the values in the arguments:
    var flatArgs = _.flatten(arguments);
    // Create a hash that counts how often each item appears in flatArgs:
    var tallyHash = {};
    _.each(flatArgs, function(value) {tallyHash[value] = tallyHash[value] + 1 || 0;});
    // Filter keys with frequency > 0. (Note: I modified filter to work with objects for this to work.)
    return _.filter(tallyHash, function(value,key) {return value > 0;})
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var others = Array.prototype.slice.call(arguments, 1);
    others = _.flatten(others);
    return _.filter(array, function(value){
      return _.indexOf(others, value) === -1;
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var Ready2Go = true;
    var result;
    return function(){
      if (Ready2Go) {
        result = func.apply(this, arguments);
        Ready2Go = false;
      }
      setTimeout(function(){ Ready2Go = true; }, wait);
      return result;
    };
  };

}).call(this);
