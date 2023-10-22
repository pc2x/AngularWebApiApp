USE WebApiNetCore
GO
IF (NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'Heroes'))
BEGIN
    CREATE TABLE Heroes (
	Id int identity(1,1) primary key not null,
	[Name] nvarchar(50) not null
	);
	INSERT INTO Heroes([Name])
	VALUES
	 ('Dr. Nice')
	,('Bombasto')
	,('Celeritas')
	,('Magneta')	
	,('RubberMan')
	,('Dynama')	
	,('Dr. IQ') 	
	,('Magma')	
	,('Tornado')
	;
END

