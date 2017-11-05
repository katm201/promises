/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var constructors = require('./promiseConstructor.js');
var promisified = require('./promisification.js')

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return constructors.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(profileName) {
      return promisified.getGitHubProfileAsync(profileName);
    })
    .then(function(profile) {
      fs.appendFile(writeFilePath, JSON.stringify(profile) + '\n', function(err) {
        if (err) {
          console.error(err);
        }
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
