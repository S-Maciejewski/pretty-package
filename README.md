# Pretty Package
Have you ever been asked to provide a list of all the dependencies in your project, along with their licenses?

It's often a part of delivery process, especially in consulting or contracting situations. It's also a pain to do by hand.

This project is a simple web-based formatter for `package.json` files to extract the dependencies, 
along with licenses and versions in a more readable format.

## Usage
Simply go to https://s-maciejewski.github.io/pretty-package and paste your `package.json` file contents into the text area.
Choose any of the options you need:
- include dev dependencies
- include the version of the package you're importing
- include the URL to a public npm site for the package (doesn't work for your private dependencies)
- include the license for the package (if available)
- output the table as markdown (for easy copy/paste into a README.md or documentation files) - if left unchecked, the output will be CSV

Then click the "Format" button, and you'll get a nicely formatted list of your dependencies.

