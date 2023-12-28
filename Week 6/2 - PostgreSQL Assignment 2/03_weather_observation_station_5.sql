-- Link for the question is:
https://www.hackerrank.com/challenges/weather-observation-station-5/problem


-- Solution of the problem is:
SELECT city, LENGTH(city) FROM station ORDER BY LENGTH(city) ASC, city ASC LIMIT 1;
SELECT DISTINCT(city), LENGTH(city) FROM station ORDER BY LENGTH(city) DESC, city ASC LIMIT 1;
