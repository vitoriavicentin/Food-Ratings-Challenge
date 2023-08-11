const readline = require('readline');

function solution(n, ratings) {
    const dishRatings = {};

    for (let i = 0; i < n; i++) {
        const [id, rating] = ratings[i];
        if (!dishRatings[id]) {
            dishRatings[id] = [0, 0]; // [total_rating, num_reviews]
        }
        dishRatings[id][0] += rating;
        dishRatings[id][1] += 1;
    }

    let maxAverage = Number.NEGATIVE_INFINITY;
    let maxId = -1;

    for (const id in dishRatings) {
        if (dishRatings.hasOwnProperty(id)) {
            const [totalRating, numReviews] = dishRatings[id];
            const average = totalRating / numReviews;
            if (average > maxAverage || (average === maxAverage && +id < maxId)) {
                maxAverage = average;
                maxId = +id;
            }
        }
    }

    return maxId;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];

rl.on('line', (line) => {
    inputLines.push(line);
}).on('close', () => {
    const n = parseInt(inputLines[0]);
    const ratings = [];

    for (let i = 1; i <= n; i++) {
        const [id, rating] = inputLines[i].split(' ').map(Number);
        ratings.push([id, rating]);
    }

    // Call the solution function and print the result
    const result = solution(n, ratings);
    console.log(result);
});
