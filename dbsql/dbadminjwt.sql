-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2021 a las 04:51:24
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbadminjwt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `price` int(11) NOT NULL,
  `pieces` int(11) NOT NULL,
  `iduser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `pieces`, `iduser`) VALUES
(3, 'nintendo switch', 15000, 99, 1),
(4, 'Smart TV', 30000, 1000, 1),
(5, 'licuadora', 300, 100, 2),
(6, 'lavadora', 12000, 50, 2),
(7, 'Radio', 100, 1000, 1),
(8, 'baterias', 100, 1000, 1),
(9, 'ps4 slim', 15000, 100, 3),
(10, 'xbox one S', 12000, 20, 3),
(11, 'nintendo switch lite', 9000, 100, 3),
(12, 'lavadora mabe', 12000, 20, 2),
(13, 'escritorio', 12000, 10000, 2),
(14, 'silla', 100, 200, 1),
(15, 'calculador 2 casio', 300, 10000, 3),
(17, 'xbox one series x', 15000, 500, 1),
(19, 'decodificador 4k', 1000, 10000, 3),
(20, 'laptop lenovo thikpad', 12000, 200, 3),
(21, 'videojuego gears5 xbox one', 750, 100, 2),
(22, 'videojuego borderlands ps5', 1200, 200, 3),
(23, 'ps4 slim reacondicionado', 100, 5000, 3),
(24, 'xbox one pro reacondicionado', 12000, 100, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `username` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `username`, `email`, `password`) VALUES
(1, 'Almedra', 'Perez prez', 'test1', 'test1@test.com', 'password54321'),
(2, 'perez', 'perez', 'test2', 'test2@test.com', 'password12345'),
(3, 'pedro pablo', 'cespedes', 'test3', 'test3@test.com', 'metallica12345');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_ibfk_1` (`iduser`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
