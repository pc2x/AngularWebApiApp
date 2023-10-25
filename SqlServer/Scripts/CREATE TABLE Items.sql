USE WebApiNetCore
GO
IF (NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'Items'))
BEGIN
CREATE TABLE Items (
	Id int identity(1,1) primary key not null,
	[Name] nvarchar(50) not null,
	Price decimal,
	[Image] nvarchar(50)
);

INSERT INTO Items
([Name], Price, [Image])
VALUES
 ('Alesis Piano', 14700, 'alesispiano.jpg')
,('Casio PXS700', 12000, 'casiopxs700.jpg')
,('Fantom-08', 43000, 'fantom08.jpg')
,('Fantom 8', 92730, 'fantom8.jpg')
,('Kurzweil K2700', 59000, 'k2700.jpg')
,('Kawai MP7SE', 34000, 'kawaimp7se.png')
,('Kawai MP11SE', 53100, 'Kawaimp11se.jpg')
,('Kawai VPC1', 37000, 'kawaivpc1.jpg')
,('Korg Kronos', 102000, 'korgkronos.jpg')
,('Korg Nautilus', 88000, 'korgnautilus.jpg')
,('Kurzweil SP7', 43700, 'kurzweilsp7.jpg')
,('Kurzweil SP7 GRAND', 50999, 'kurzweilsp7grand.jpeg')
,('Nord Stage 4', 130400, 'nordstage4.jpg')
,('Roland Juno DS', 23800, 'rolandjuno.jpg')
,('Hammond SK1', 67000, 'sk1.jpg')
,('Yamaha SX700', 49800, 'yamahasx700.webp')
,('Yamaha YC88', 51000, 'yamahayc88.jpg');
END