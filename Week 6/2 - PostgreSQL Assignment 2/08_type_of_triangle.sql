-- Link for the question is:
https://www.hackerrank.com/challenges/what-type-of-triangle/problem


-- Solution of the problem is:
SELECT
CASE
WHEN A + B <= C OR A + C <= B OR B + C <= A THEN "Not A Triangle"
WHEN A = B AND B = C THEN "Equilateral"
WHEN A = B OR A = C OR B = C THEN "Isosceles"
ELSE "Scalene"
END AS triangle_sides
FROM triangles;
