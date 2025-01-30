
# SQL


### Explaination of `user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE`

`NOT NULL`
Ensures that this column cannot be NULL, meaning every row must have a valid user_id.

`REFERENCES users(id)`
Establishes a foreign key constraint linking user_id to the id column in the users table.
Ensures that every value in user_id must match an existing id in the users table.

`ON DELETE CASCADE`
Specifies that if a user is deleted from the users table, all related records in this table will also be deleted automatically.
This prevents orphaned records in the child table.
