CREATE VIEW role_department_view AS
SELECT role.title, department.name AS department_name, role.salary
FROM role
JOIN department ON role.department_id = department.id;