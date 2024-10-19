const fs = require('fs');

function parseJsonInput(jsonStr) {
    const data = JSON.parse(jsonStr);
    const n = data.keys.n;
    const k = data.keys.k;
    const roots = Object.entries(data)
        .filter(([key]) => key !== 'keys')
        .map(([key, value]) => [
            parseInt(key),
            parseInt(value.value, parseInt(value.base))
        ]);
    return { n, k, roots };
}

function lagrangeInterpolation(points, k) {
    return function(x) {
        return points.slice(0, k).reduce((sum, [xi, yi], i) => {
            const numerator = points.slice(0, k).reduce((prod, [xj], j) => 
                i !== j ? prod * (x - xj) : prod, 1);
            const denominator = points.slice(0, k).reduce((prod, [xj], j) => 
                i !== j ? prod * (xi - xj) : prod, 1);
            return sum + yi * numerator / denominator;
        }, 0);
    }(0); // Evaluate at x = 0 to get the constant term
}

function findSecret(jsonInput) {
    const { n, k, roots } = parseJsonInput(jsonInput);
    return Math.round(lagrangeInterpolation(roots, k));
}

function processFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filename}:`, err);
            return;
        }
        const secret = findSecret(data);
        console.log(`Secret for ${filename}: ${secret}`);
    });
}

// Check if filenames are provided as command-line arguments
const filenames = process.argv.slice(2);
if (filenames.length === 0) {
    console.log('Please provide JSON filenames as arguments.');
} else {
    filenames.forEach(processFile);
}