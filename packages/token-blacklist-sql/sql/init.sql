if(not(exists(select *
from sys.tables
where name = 'token_blacklist' and type = 'U')))
create table token_blacklist
(
    id bigint IDENTITY( 1, 1),
    [iat] DATETIME NOT NULL,
    [exp] DATETIME NOT NULL,
    token varchar(max) NOT NULL
)
GO
