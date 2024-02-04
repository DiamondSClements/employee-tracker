CREATE VIEW role_department_view AS
SELECT role.title, department.name AS department_name, role.salary
FROM role
JOIN department ON role.department_id = department.id;

CREATE VIEW employee_view AS
SELECT 
    e.first_name,
    e.last_name,
    r.title AS role_title,
    d.name AS department_name,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;