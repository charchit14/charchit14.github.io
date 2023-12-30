-- Link for the question is:
https://www.hackerrank.com/challenges/average-population-of-each-continent/problem?isFullScreen=true


-- Solution of the problem is:
SELECT country.continent, FLOOR(AVG(city.population)) FROM country 
JOIN city ON city.countrycode = country.code 
GROUP BY country.continent;
