CREATE TABLE `data_warehouse`.`usuarios` (
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(30) NOT NULL ,
    `apellido` VARCHAR(30) NOT NULL , 
    `email` VARCHAR(30) NOT NULL , 
    `admin` BOOLEAN NOT NULL , 
    `password` VARCHAR(30) NOT NULL , 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `data_warehouse`.`compañias` ( 
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `nombre_company` VARCHAR(30) NOT NULL , 
    `direccion` VARCHAR(40) NOT NULL , 
    `email` VARCHAR(30) NOT NULL , 
    `telefono` INT(15) NOT NULL , 
    `ciudad_id` INT(20) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `data_warehouse`.`contactos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `nombre_contacto` VARCHAR(30) NOT NULL ,
    `apellido_contacto` VARCHAR(30) NOT NULL ,
    `email` VARCHAR(30) NOT NULL , 
    `pais` INT(10) NOT NULL ,
    `compañia` INT(10) NOT NULL , 
    `direccion` VARCHAR(30) NOT NULL , 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `data_warehouse`.`regiones` (
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(30) NOT NULL ,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `data_warehouse`.`paises` (
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `region_id` INT(10) NOT NULL , 
    `nombre` VARCHAR(30) NOT NULL ,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `data_warehouse`.`ciudades` (
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `id_pais` INT(10) NOT NULL , 
    `nombre_ciudad` VARCHAR(30) NOT NULL ,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;


INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `admin`, `password`) VALUES 
    (NULL, 'Pedro', 'Perez', 'Pedro@gmail.com', TRUE, '1234'),
    (NULL, 'Jose', 'Silva', 'Jose@gmail.com', FALSE, '2345'), 
    (NULL, 'Juan', 'Mora', 'Juan@gmail.com', FALSE, '3456'),
    (NULL, 'Alberto', 'Perez', 'Alberto@gmail.com', TRUE, '1234');

INSERT INTO `contactos` (`id`, `nombre_contacto`, `apellido_contacto`, `email`,`pais`, `compañia`, `direccion`) VALUES 
    (NULL, 'Laura', "Perez", "Laura@gmail.com", 1, 1, "Calle 1"),
    (NULL, 'Zara', "Jimenez", "Zara@gmail.com", 1, 1, "Calle 2"),
    (NULL, 'Maria',"Perez", "Maria@gmail.com", 2, 2, "Calle 3"),
    (NULL, 'Josefa', "Silva", "Josefa@gmail.com", 2, 2, "Calle 4");

INSERT INTO `compañias` (`id`, `nombre_company`, `direccion`, `email`, `telefono`, `ciudad_id`) VALUES 
    (NULL, 'Amazon', "Calle 1", "Amazon@gmail.com", 88888888, 1),
    (NULL, 'Fedex', "Calle 2", "Fedex@gmail.com", 77777777, 2);

INSERT INTO `regiones` (`id`, `nombre`) VALUES 
    (NULL, 'Europa'),
    (NULL, 'America');

INSERT INTO `paises` (`id`, `region_id`, `nombre`) VALUES 
    (NULL, 1, "Francia"),
    (NULL, 2, "Argentina");

INSERT INTO `ciudades` (`id`, `id_pais`, `nombre_ciudad`) VALUES 
    (NULL, 1, "Paris"),
    (NULL, 2, "Buenos Aires");






