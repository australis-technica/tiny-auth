if(not(exists(select *
from sys.tables
where name = 'users' and type = 'U')))
create table users
(
    id varchar(1024) UNIQUE,
    displayName varchar(max) not null,
    email varchar(1024) not null UNIQUE,
    [password] varchar(max) not null,
    roles varchar(max) not null,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
)
GO
/* add column */
if(not(exists(select top 1 name from sys.columns where object_id = object_id('users') AND [name] in ('createdAt', 'updatedAt'))))
ALTER TABLE users add 
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
GO
if(not(exists(select top 1
    *
from users)))
insert into users
    (id, displayName, [password], email, roles)
values
    ('admin', 'Admin', '', 'admin@localhost', 'admin,user');
GO