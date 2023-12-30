-- Link for the question is:
https://www.hackerrank.com/challenges/weather-observation-station-18/problem


-- Solution of the problem is:
SELECT ROUND(ABS(MIN(lat_n) - MAX(lat_n)) + ABS(MIN(long_w) - MAX(long_w)),4) FROM station;
