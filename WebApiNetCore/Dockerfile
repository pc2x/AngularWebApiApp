###STAGE imagen base de runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine3.18-amd64 AS base

#proporciona las bibliotecas necesarias para el soporte de caracteres Unicode
RUN apk add icu-libs icu-data-full

#Proporciona datos de zona horaria y configuraciones que permiten que el contenedor siga la zona horaria del sistema host o se configure manualmente
RUN apk add tzdata

# Instalar curl para realizar un healthcheck
RUN apk --no-cache add curl

#Establece una variable de entorno para controlar la configuración de internacionalización en aplicaciones .NET
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

WORKDIR /app
EXPOSE 80
EXPOSE 443

###STAGE Imagen del sdk de .net para compilar el proyecto
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

#copia el archivo scproj
COPY ["WebApiNetCore2023.csproj", "."]

#restaura las dependencias
RUN dotnet restore "./WebApiNetCore2023.csproj"

#copia todo el contenido del directorio actual al directorio del contenedor
COPY . .

#compila la aplicación
RUN dotnet build "WebApiNetCore2023.csproj" -c Release -o /app/build

###STAGE realiza la publicacion
FROM build AS publish
RUN dotnet publish "WebApiNetCore2023.csproj" -c Release -o /app/publish /p:UseAppHost=false

###STAGE utiliza la base (el runtime)
FROM base AS final
WORKDIR /app
#copia del stage de publicacion /app/publish al directorio /app
COPY --from=publish /app/publish .

ENV JWT_ISSUER=juanvillegas
ENV JWT_AUDIENCE=aplicacion
ENV JWT_KEY=1069880a2c3c45cca42810d6e41c7a46
ENV AdminUser=Admin
ENV AdminPass=Adminis09.
ENV AdminEmail=alberto_ville@hotmail.com


ENTRYPOINT ["dotnet", "WebApiNetCore2023.dll"]