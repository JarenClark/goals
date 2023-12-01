

## Table Fields

### categories 

| column_name  | data_type                | constraints | references  | comment         |
| ------------ | ------------------------ | ----------- | ----------- | --------------- |
| id           | bigint                   | NOT NULL    |             | 🔑 Primary key |
| title        | text                     | NULL        |             | Parent title    |
| sub_title    | text                     | NULL        |             | Child title     |
| sub_duration | text                     | NULL        |             | Child duration  |
| created_by   | uuid                     | NULL        | profiles.id |                 |
| updated_by   | uuid                     | NULL        | profiles.id |                 |
| created_at   | timestamp with time zone | NULL        |             |                 |
| updated_at   | timestamp with time zone | NULL        |             |                 |


The data in this table is derived from the original `categories` table, with a flattened data structure.

### companies

| column_name | data_type                | constraints | references  | comment         |
| ----------- | ------------------------ | ----------- | ----------- | --------------- |
| id          | bigint                   | NOT NULL    |             | 🔑 Primary key |
| name        | text                     | NULL        |             |                 |
| logo        | text                     | NULL        |             |                 |
| created_at  | timestamp with time zone | NOT NULL    |             |                 |
| updated_at  | timestamp with time zone | NULL        |             |                 |
| updated_by  | uuid                     | NULL        | profiles.id |                 |
| created_by  | uuid                     | NULL        | profiles.id |                 |


This table originates from the `company` and `logo` fields in the document, with duplicates removed:

- `name` sourced from `document.company`
- `logo` sourced from `document.logo`

### documents

⭐️ Indicates that the field has been modified from its original value.


#### documents Main table

| column_name            | data_type                | constraints | old_column   | references  | comment                                                        |
| ---------------------- | ------------------------ | ----------- | ------------ | ----------- | -------------------------------------------------------------- |
| id                     | bigint                   | NOT NULL    |              |             | 🔑 Primary key                                                |
| ⭐️created_by         | uuid                     | NOT NULL    | createdBy    | profiles.id | Creator UUID                                                   |
| title                  | text                     | NOT NULL    |              |             | 🔐 Indexes Key （So the query is faster.）                    |
| owner_id               | text                     | NULL        |              |             |                                                                |
| doc_number             | bigint                   | NULL        |              |             |                                                                |
| type                   | text                     | NOT NULL    |              |             |                                                                |
| custom                 | text                     | NULL        |              |             |                                                                |
| quarter                | text                     | NULL        |              |             |                                                                |
| version                | bigint                   | NULL        |              |             |                                                                |
| sig_date               | timestamp with time zone | NULL        |              |             |                                                                |
| year                   | text                     | NULL        |              |             |                                                                |
| company                | text                     | NULL        |              |             |                                                                |
| ⭐️account_management | ARRAY                    | NULL        |              |             | e.g.:['member-id-one','member-id-tow']                         |
| clone                  | boolean                  | NOT NULL    |              |             |                                                                |
| currency               | text                     | NULL        |              |             |                                                                |
| custom_date            | timestamp with time zone | NULL        |              |             |                                                                |
| doc_type               | text                     | NULL        |              |             |                                                                |
| ⭐️sales_person       | ARRAY                    | NULL        |              |             | e.g.:['member-id-one','member-id-tow']                         |
| start_date             | timestamp with time zone | NULL        |              |             |                                                                |
| ⭐️team               | ARRAY                    | NULL        | team         |             | e.g.:['member-id-one','member-id-tow']                         |
| ⭐️grand_total        | numeric                  | NULL        |              |             | grand total from old document calculate                        |
| ⭐️status             | USER-DEFINED             | NOT NULL    |              |             | 0: normal 1: Approved 2: Sent to client 3: Rejected 4: Revised |
| ⭐️del_status         | USER-DEFINED             | NOT NULL    |              |             | delete or normal                                               |
| ⭐️old_doc_id         | text                     | NULL        |              |             | old system id                                                  |
| date                   | timestamp with time zone | NOT NULL    |              |             |                                                                |
| ⭐️master             | boolean                  | NOT NULL    |              |             | is master                                                      |
| ⭐️ updated_at        | timestamp with time zone | NULL        | lastModified |             | Modification time                                              |
| ⭐️ updated_by        | uuid                     | NULL        | lastModified | profiles.id | Modification uid                                               |
| created_at             | timestamp with time zone | NOT NULL    | date         |             | Creation time                                                  |
| ⭐️created_by_old     | text                     | NULL        | createdBy    |             | old system uid                                                 |

#### document_details

| column_name | data_type | constraints | references   | comment             |
| ----------- | --------- | ----------- | ------------ | ------------------- |
| document_id | bigint    | NULL        | documents.id | 🔑 Primary key     |
| content     | jsonb     | NULL        |              | old content field   |
| ⭐️rest    | jsonb     | NULL        |              | [...old rest field] |

The `rest` field (jsonb) primarily stores the remaining fields that have not been extracted into the main table. This approach ensures that no fields are discarded, and the jsonb type still maintains the advantages of non-relational data.

#### document_revisions

| column_name     | data_type                | constraints | references   | comment                      |
| --------------- | ------------------------ | ----------- | ------------ | ---------------------------- |
| id              | bigint                   | NOT NULL    |              | 🔑 Primary key              |
| document_id     | bigint                   | NULL        | documents.id |                              |
| document_old_id | text                     | NULL        |              | old system doc id            |
| ⭐️data        | jsonb                    | NULL        |              | Same processing as documents |
| created_by      | uuid                     | NULL        | profiles.id  | from old system saved        |
| created_at      | timestamp with time zone | NULL        |              | from old system saved        |
| created_name    | text                     | NULL        |              | from old system saved        |

`document_revisions` originates from the old system's `revisions` table. The processing of the `data` is the same as described in the above document section. Both data formats remain consistent in the new system.

### members

| column_name | data_type                | constraints |
| ----------- | ------------------------ | ----------- |
| id          | text                     | NOT NULL    |
| name        | text                     | NULL        |
| title       | text                     | NULL        |
| description | text                     | NULL        |
| email       | text                     | NULL        |
| department  | text                     | NULL        |
| start_date  | timestamp with time zone | NULL        |
| created_at  | timestamp with time zone | NULL        |
| updated_at  | timestamp with time zone | NULL        |
| experience  | text                     | NULL        |
| pharma_date | timestamp with time zone | NULL        |

There are no changes to the `members` table.

### profiles

| column_name   | data_type                | constraints | references    | comment         |
| ------------- | ------------------------ | ----------- | ------------- | --------------- |
| id            | uuid                     | NOT NULL    | auth.users.id | 🔑 Primary key |
| created_at    | timestamp with time zone | NOT NULL    |               |                 |
| updated_at    | timestamp with time zone | NULL        |               |                 |
| full_name     | text                     | NULL        |               |                 |
| avatar_url    | text                     | NULL        |               |                 |
| old_id        | text                     | NULL        |               | old system uid  |
| old_member_id | text                     | NULL        |               | old member uid  |
| role_id       | bigint                   | NOT NULL    | roles.id      | user role id    |
| email         | character varying        | NULL        |               |                 |

The `profiles` table is primarily generated automatically through triggers. This approach aims to avoid direct interactions with Supabase Auth while providing better control over our user permissions.

### roles

| column_name | data_type    | constraints |
| ----------- | ------------ | ----------- |
| id          | bigint       | NOT NULL    |
| name        | USER-DEFINED | NULL        |


## User Module


1. Users sign in through Supabase Google Auth.
2. Supabase inserts a record into the `auth.users` table in the database.
3. A trigger is activated upon the insertion operation.
4. The trigger executes the database function `handle_new_user()`.
5. User information is populated into the `public.profiles` table.

## Permission Module

Supabase comes with default roles, but for better control over permissions, we need to set and manage user permissions ourselves.

- anon (public access)
- authenticated (authenticated user access)
- service_role (admin access)

In the new system, three roles are currently defined: `ADMIN`, `READ ONLY`, and `READ WRITE` users. New users are assigned the `READ WRITE` role by default.

In the user table `profiles`, each user is associated with the `roles` table through the `role_id`.

Permission checks for user operations (SELECT, INSERT, DELETE, UPDATE, DELETE) are conducted based on the current user's role. Row-Level Security (RLS) is implemented on tables to enable finer control.

Currently, RLS is enabled on all tables.

To efficiently create RLS policies, a database function named `check_user_permission(user_id uuid,user_roles user_role_type[])`. This function returns a boolean value and can verify whether the current user is in the corresponding user role.

```bash
# return boolean
check_user_permission(auth.uid(), ARRAY['ADMIN']::user_role_type[])
```

How permissions work:

- All tables have RLS enabled, allowing access only to authenticated users (anno access is prohibited).
- Specific RLS policies are set for each table based on roles.
- Client access to data requires prior permission checks using `check_user_permission`. Access or manipulation of data is granted only upon successful verification.























