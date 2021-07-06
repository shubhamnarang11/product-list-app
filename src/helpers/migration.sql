INSERT INTO
  customers (name)
VALUES('Customer 1'),
  ('Customer 2');
INSERT INTO
  orders (order_date, customer_id)
VALUES(now(), 1),
  (now() + INTERVAL 1 day, 1),
  (now() - INTERVAL 1 day, 1),
  (now(), 2);
INSERT INTO
  products (name, price, order_id, quantity, status)
VALUES('Laptop', 10000, 1, 1, 'Done'),
  ('Laptop', 20000, 3, 2, 'Done'),
  ('Laptop', 40000, 4, 4, 'Done'),
  ('Desktop', 1000, 1, 1, 'Done'),
  ('Desktop', 2000, 2, 2, 'Done'),
  ('Desktop', 3000, 3, 3, 'Done'),
  ('Desktop', 1000, 4, 1, 'Done'),
  ('Keyboard', 1500, 2, 3, 'Done'),
  ('Keyboard', 1000, 4, 2, 'Done'),
  ('Mouse', 700, 1, 2, 'Done'),
  ('Mouse', 350, 2, 1, 'Done'),
  ('Mouse', 1050, 3, 3, 'Done');