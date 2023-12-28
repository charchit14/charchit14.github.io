-- Link for the question is:
https://www.hackerrank.com/challenges/the-blunder/problem?isFullScreen=true


-- Solution of the problem is:
SELECT CEIL(AVG(salary)-AVG(REPLACE(salary,'0',''))) FROM employees;
