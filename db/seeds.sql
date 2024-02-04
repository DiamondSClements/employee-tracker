INSERT INTO department (name)
VALUES ("Finance"),
    ("IT"),
    ("Marketing"),
    ("HR");
    


INSERT INTO role (title, salary, department_id)
VALUES ("Financial Analyst", 85000, 1 ),
        ("Chief Financial Officer", 333000, 1),
        ("Systems Analyst", 91000, 2),
        ("IT Lead", 125000, 2),
        ("Marketing Consultant", 116889,3),
        ("Marketing Director", 136000, 3),
        ("Recruitment Coordinator", 62000, 4),
        ("HR Manager", 117000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ("John", "Wick", 1, NULL),      
    ("Ash", "Ketchum", 2, NULL), 
    ("Israel", "Epps", 3, NULL),   
    ("Naomi", "Epps", 4, NULL),  
    ("Ryann", "Price", 5, NULL),    
    ("Harry", "Potter", 6, NULL),
    ("Summer", "Walker", 7, NULL),  
    ("Chris", "Brown", 8, NULL); 





