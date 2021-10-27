CREATE TABLE `warehouse`.`usuarios` (
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(30) NOT NULL ,
    `apellido` VARCHAR(30) NOT NULL , 
    `email` VARCHAR(30) NOT NULL , 
    `admin` BOOLEAN NOT NULL , 
    `password` VARCHAR(30) NOT NULL , 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `admin`, `password`) VALUES 
    (NULL, 'Pedro', 'Perez', 'Pedro@gmail.com', TRUE, '1234'),
    (NULL, 'Jose', 'Silva', 'Jose@gmail.com', FALSE, '2345'), 
    (NULL, 'Juan', 'Mora', 'Juan@gmail.com', FALSE, '3456');


CREATE TABLE `warehouse`.`compañías` ( 
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(30) NOT NULL , 
    `direccion` VARCHAR(40) NOT NULL , 
    `email` VARCHAR(30) NOT NULL , 
    `telefono` INT(15) NOT NULL , 
    `ciudad` VARCHAR(20) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;


//revisar
CREATE TABLE `warehouse`.`contactos` (
    `id` INT(10) NOT NULL AUTO_INCREMENT , 
    `contacto` VARCHAR(30) NOT NULL ,
    `pais` INT(10) NOT NULL ,
    `compañia` INT(10) NOT NULL , 
    `cargo` VARCHAR(30) NOT NULL , 
    `interes` INT(10) NOT NULL , 
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

INSERT INTO `contactos` (`id`, `contacto`, `pais`, `compañia`, `cargo`, `interes`) VALUES 
    (NULL, 'Pedro', 1, 2, "Developer", '1234'),
    (NULL, 'Jose', 2, 2, "UI Designer", '2345'),
    (NULL, 'Pedro', 6, 5, "Developer", '1234'),
    (NULL, 'Jose', 7, 5, "Developer", '2345'),
    (NULL, 'Pedro', 1, 6, "Developer", 	'1234'),
    (NULL, 'Jose', 2, 6, "Developer", '2345'),
    (NULL, 'Pedro', 1, 6, "Developer", '1234'),
    (NULL, 'Jose', 2, 7, "Developer", '2345'),
    (NULL, 'Pedro', 7,7, "UI Designer", '1234'),
    (NULL, 'Jose', 1, 7, "UI Designer", '2345'),
    (NULL, 'Juan', 2, 7, "UI Designer", '3456');


