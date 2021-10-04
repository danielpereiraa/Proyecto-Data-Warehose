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
