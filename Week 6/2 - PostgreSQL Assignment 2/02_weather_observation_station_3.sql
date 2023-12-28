-- Link for the question is:
https://www.hackerrank.com/challenges/weather-observation-station-3/problem?isFullScreen=true


-- Solution of the problem is:
SELECT DISTINCT city FROM station WHERE MOD(id, 2) = 0;
