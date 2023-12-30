-- Link for the question is:
https://www.hackerrank.com/challenges/the-pads/problem


-- Solution of the problem is:
SELECT CONCAT(name,'(',SUBSTRING(occupation,1,1),')') AS Name
FROM occupations 
ORDER by Name;

SELECT concat ('There are a total of ', COUNT(occupation),' ', LOWER(occupation),'s.') AS totals
FROM occupations
GROUP BY occupation
ORDER BY totals;
