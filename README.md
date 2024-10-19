Secret Sharing Application
This application is designed to reconstruct a secret from a set of JSON files using Lagrange interpolation. The secret is derived from a polynomial, and the application uses a subset of points to reconstruct the constant term of the polynomial, which represents the secret.

How It Works
Input JSON Files: The application expects JSON files as input. Each JSON file contains:

A keys object with n (total number of points) and k (minimum number of points required to reconstruct the secret).
A set of points, each with a base and a value.
Parsing JSON: The parseJsonInput function reads the JSON string and extracts the values of n, k, and the points. The points are converted from their respective bases to integers.

Lagrange Interpolation: The lagrangeInterpolation function performs Lagrange interpolation on the points to find the constant term of the polynomial, which is the secret. It evaluates the polynomial at x = 0.

Finding the Secret: The findSecret function uses the parsed data and Lagrange interpolation to compute the secret.

Processing Files: The processFile function reads each file, extracts the secret, and prints it to the console.

Command-Line Interface: The application accepts filenames as command-line arguments. If no filenames are provided, it prompts the user to provide them.

Usage
To install dependencies, use the following command: npm install

To run the application, use the following command: node secretSharing.js testcase1.json testcase2.json
