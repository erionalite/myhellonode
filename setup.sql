CREATE USER myhellonode WITH PASSwORD='Luljeta79Gj'
execute sp_addrolemember db_datareader,"myhellonode"
execute sp_addrolemember db_datawriter,"myhellonode"
GRANT CONNECT TO myhellonode
create table users (
    id int IDENTITY primary key,
    name nvarchar(255),
    email nvarchar(255)
)
select * from users