-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 18-10-2023 a las 01:54:03
-- Versión del servidor: 10.5.19-MariaDB-cll-lve
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u647002410_print_objects`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car`
--

CREATE TABLE `car` (
  `id_car` int(11) NOT NULL,
  `x_car` int(11) DEFAULT NULL,
  `y_car` int(11) DEFAULT NULL,
  `centroidx_car` int(11) DEFAULT NULL,
  `centroidy_car` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `data`
--

CREATE TABLE `data` (
  `id_data` int(11) NOT NULL,
  `fk_car` int(11) NOT NULL,
  `fk_object` int(11) NOT NULL,
  `fk_racetrack` int(11) NOT NULL,
  `fk_route` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meta`
--

CREATE TABLE `meta` (
  `id_meta` int(11) NOT NULL,
  `x_meta` int(11) NOT NULL,
  `y_meta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `object`
--

CREATE TABLE `object` (
  `id_object` int(11) NOT NULL,
  `x_object` int(11) NOT NULL,
  `centroidx_object` int(11) NOT NULL,
  `centroidy_object` int(11) NOT NULL,
  `w_object` int(11) NOT NULL,
  `h_object` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `racetrack`
--

CREATE TABLE `racetrack` (
  `id_racetrack` int(11) NOT NULL,
  `whcmx_racetrack` int(11) NOT NULL,
  `whcmy_racetrack` int(11) NOT NULL,
  `whpxx_racetrack` int(11) NOT NULL,
  `whpxy_racetrack` int(11) NOT NULL,
  `pxporcm_racetrack` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `route`
--

CREATE TABLE `route` (
  `id_route` int(11) NOT NULL,
  `x_route` int(11) DEFAULT NULL,
  `y_route` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id_car`);

--
-- Indices de la tabla `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id_data`),
  ADD KEY `car` (`fk_car`),
  ADD KEY `object` (`fk_object`),
  ADD KEY `racetrack` (`fk_racetrack`),
  ADD KEY `route` (`fk_route`);

--
-- Indices de la tabla `meta`
--
ALTER TABLE `meta`
  ADD PRIMARY KEY (`id_meta`);

--
-- Indices de la tabla `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id_object`);

--
-- Indices de la tabla `racetrack`
--
ALTER TABLE `racetrack`
  ADD PRIMARY KEY (`id_racetrack`);

--
-- Indices de la tabla `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`id_route`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `data`
--
ALTER TABLE `data`
  ADD CONSTRAINT `car` FOREIGN KEY (`fk_car`) REFERENCES `car` (`id_car`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `object` FOREIGN KEY (`fk_object`) REFERENCES `object` (`id_object`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `racetrack` FOREIGN KEY (`fk_racetrack`) REFERENCES `racetrack` (`id_racetrack`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `route` FOREIGN KEY (`fk_route`) REFERENCES `route` (`id_route`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
