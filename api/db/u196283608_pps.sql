-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 04-01-2018 a las 01:02:56
-- Versión del servidor: 10.1.29-MariaDB
-- Versión de PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u196283608_pps`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos`
--

CREATE TABLE `archivos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id_asistencia` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `foto` varchar(500) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id_asistencia`, `id_curso`, `fecha`, `foto`) VALUES
(69, 33, '2017-11-25', 'img%2F69.jpeg?alt=media&amp;token=68125e4e-71c9-4193-b069-9606a0cd9e75'),
(66, 4, '2017-11-22', 'img%2F66.jpeg?alt=media&amp;token=c8f5bea9-9cb1-4f44-9414-0ab364ddce58'),
(67, 32, '2017-11-18', 'img%2F67.jpeg?alt=media&amp;token=21e9dbfd-1ab6-4ba2-ae75-d437d8ab06b2'),
(72, 31, '2017-12-02', 'img%2F72.jpeg?alt=media&amp;token=9e92a64a-6d37-4651-8a5b-69d2ab503efd'),
(73, 41, '2017-12-08', NULL),
(75, 1, '2017-12-13', NULL),
(77, 33, '2017-12-14', NULL),
(78, 59, '2017-12-16', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisiones`
--

CREATE TABLE `comisiones` (
  `id_comision` int(11) NOT NULL,
  `nombre` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comisiones`
--

INSERT INTO `comisiones` (`id_comision`, `nombre`) VALUES
(1, '4A'),
(2, '4B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL,
  `id_comision` int(11) NOT NULL,
  `id_profesor` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `aula` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id_curso`, `id_comision`, `id_profesor`, `id_materia`, `dia`, `aula`) VALUES
(1, 1, 7, 4, 3, 203),
(41, 1, 21, 2, 4, 204),
(3, 2, 21, 1, 5, 205),
(4, 1, 7, 3, 6, 206),
(31, 2, 7, 3, 7, 207),
(33, 2, 7, 6, 6, 215),
(32, 2, 5, 4, 2, 202),
(60, 2, 23, 6, 6, 201),
(59, 1, 7, 6, 6, 200),
(58, 1, 7, 6, 6, 200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_asistencia`
--

CREATE TABLE `detalle_asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `presente` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_asistencia`
--

INSERT INTO `detalle_asistencia` (`id_asistencia`, `id_alumno`, `presente`) VALUES
(69, 19, 1),
(69, 15, 1),
(69, 12, -1),
(69, 11, 1),
(66, 12, 1),
(66, 11, 1),
(66, 19, 1),
(66, 15, 1),
(67, 20, 1),
(67, 27, 1),
(67, 28, 1),
(67, 29, 1),
(72, 24, 1),
(72, 15, -1),
(72, 12, 1),
(69, 24, -1),
(72, 11, -1),
(72, 19, 1),
(73, 11, -1),
(73, 12, -1),
(73, 15, -1),
(73, 19, -1),
(73, 24, -1),
(75, 11, -1),
(75, 15, -1),
(77, 24, 1),
(77, 20, -1),
(77, 27, 1),
(77, 28, -1),
(78, 11, -1),
(78, 12, -1),
(78, 15, -1),
(78, 24, -1),
(78, 19, -1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_curso`
--

CREATE TABLE `detalle_curso` (
  `id_curso` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_curso`
--

INSERT INTO `detalle_curso` (`id_curso`, `id_alumno`) VALUES
(1, 11),
(1, 15),
(2, 11),
(2, 12),
(2, 15),
(2, 19),
(3, 11),
(3, 12),
(3, 15),
(3, 19),
(4, 11),
(4, 12),
(4, 15),
(4, 19),
(5, 11),
(5, 12),
(5, 15),
(5, 19),
(7, 11),
(7, 12),
(7, 15),
(7, 19),
(33, 20),
(33, 24),
(33, 27),
(33, 28),
(51, 24),
(52, 20),
(52, 27),
(52, 28),
(52, 29),
(53, 11),
(53, 12),
(53, 15),
(53, 19),
(53, 24),
(54, 20),
(54, 27),
(54, 28),
(54, 29),
(55, 11),
(55, 12),
(55, 15),
(55, 19),
(55, 24),
(56, 20),
(56, 27),
(56, 28),
(56, 29),
(57, 11),
(57, 12),
(57, 15),
(57, 19),
(57, 24),
(58, 11),
(58, 12),
(58, 15),
(58, 19),
(58, 24),
(59, 11),
(59, 12),
(59, 15),
(59, 19),
(59, 24),
(60, 20),
(60, 27),
(60, 28),
(60, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_encuesta`
--

CREATE TABLE `detalle_encuesta` (
  `id_encuesta` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `voto` tinyint(1) NOT NULL,
  `quevoto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `detalle_encuesta`
--

INSERT INTO `detalle_encuesta` (`id_encuesta`, `id_alumno`, `voto`, `quevoto`) VALUES
(1, 11, 1, 1),
(1, 12, 0, 0),
(1, 15, 1, 2),
(1, 19, 0, 0),
(2, 20, 1, 2),
(2, 24, 0, 0),
(2, 27, 1, 1),
(2, 28, 1, 2),
(3, 20, 1, 2),
(3, 24, 0, 0),
(3, 27, 1, 1),
(3, 28, 1, 1),
(4, 11, 1, 1),
(4, 12, 1, 2),
(4, 15, 1, 2),
(4, 19, 0, 0),
(5, 11, 1, 1),
(5, 12, 1, 1),
(5, 15, 1, 2),
(5, 19, 0, 0),
(6, 20, 0, 0),
(6, 24, 1, 1),
(6, 27, 0, 0),
(6, 28, 0, 0),
(7, 11, 1, 1),
(7, 12, 1, 1),
(7, 15, 1, 2),
(7, 19, 1, 1),
(8, 11, 1, 2),
(8, 12, 0, 0),
(8, 15, 0, 0),
(8, 19, 0, 0),
(9, 11, 1, 1),
(9, 12, 0, 0),
(9, 15, 0, 0),
(9, 19, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `id_encuesta` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `nombre_encuesta` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `opcion1` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `opcion2` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `activa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`id_encuesta`, `id_curso`, `nombre_encuesta`, `opcion1`, `opcion2`, `fecha_inicio`, `fecha_fin`, `activa`) VALUES
(1, 4, 'Enc 4a', 'Multiple', 'Normal', '2017-12-14 16:12:27', '2017-12-14 19:12:27', 0),
(2, 33, 'Enc 4b', 'Cine', 'Teatro', '2017-12-14 16:12:05', '2017-12-14 18:12:05', 0),
(3, 41, 'Pintura', 'Pasillos', 'Aulas', '2017-12-14 18:12:29', '2017-12-14 21:12:29', 0),
(4, 4, 'Examen', 'Oral', 'Escrito', '2017-12-14 19:12:04', '2017-12-14 21:12:04', 0),
(5, 4, 'Recuperatorio', 'Oral', 'Escrito', '2017-12-15 05:12:00', '2017-12-15 17:12:00', 0),
(6, 3, 'Encuesta fonte', 'Matematica', 'Estadistica', '2017-12-15 18:12:25', '2017-12-17 18:12:25', 0),
(7, 4, 'Encuesta 4a viernes', 'Batman', 'Superman', '2017-12-16 02:12:29', '2017-12-17 02:12:29', 0),
(8, 4, 'Llueve?', 'Si', 'No', '2017-12-16 13:12:18', '2017-12-17 14:12:18', 0),
(9, 4, 'Hahha', 'Si', 'No', '2017-12-18 19:12:04', '2017-12-19 19:12:04', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `aula` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id`, `nombre`, `aula`) VALUES
(1, 'MATEMATICA I', 403),
(2, 'MATEMATICA II', 201),
(3, 'PROGRAMACION', 21),
(4, 'PROGRAMACION II', 205),
(5, 'SISTEMAS OPERATIVOS', 213),
(6, 'PPS', 306),
(7, 'LEGISLACION', 301);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `sexo` char(1) NOT NULL,
  `dni` int(11) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` int(11) NOT NULL,
  `legajo` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `foto` varchar(250) DEFAULT NULL,
  `libre` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `sexo`, `dni`, `mail`, `password`, `legajo`, `tipo`, `foto`, `libre`) VALUES
(1, 'guillermo', 'fink', 'M', 32022487, 'guillermo_fink@hotmail.com', 321321321, 1, 1, 'img%2F1.jpeg?alt=media&amp;token=a3294872-1d8d-44db-b8ed-b6b706425d60', NULL),
(3, 'juan pablo', 'letteri', 'M', 31225658, 'jp_lt@gmail.com', 321321321, 2, 1, NULL, NULL),
(6, 'emiliano', 'dalesio', 'M', 30256985, 'dalesioe@gmail.com', 321321321, 3, 1, NULL, NULL),
(7, 'Octavio', 'Villegas', 'M', 25132659, 'octavio@gmail.com', 321321321, 1004, 2, 'img%2F7.jpeg?alt=media&amp;token=68aa3c40-ab90-4711-a27e-6177e0e91a23', NULL),
(8, 'roxana', 'gonzalez', 'F', 22549865, 'rx@gmail.com', 321321321, 105, 3, NULL, NULL),
(11, 'Raul', 'Perez', 'M', 36252485, 'rp@gmail.com', 321321321, 100001, 4, NULL, NULL),
(12, 'Roberto', 'Gomez', 'M', 34521695, 'robert@gmail.com', 321321321, 100002, 4, NULL, NULL),
(15, 'Juan', 'Perez', 'M', 20154895, 'juan@yahoo.com.ar', 20154895, 100003, 4, NULL, NULL),
(16, 'Jose', 'Martin', 'M', 28745365, 'jm@gmail.com', 28745365, 106, 3, 'img%2F16.jpeg?alt=media&amp;token=3d097da1-1c5b-4e99-8ded-dd47132af68e', NULL),
(24, 'Patricia', 'Stein', 'M', 12345433, 'asdasd@asadsd.com', 12345433, 100006, 4, NULL, NULL),
(18, 'maria', 'fernandez', 'f', 24555887, 'mf@gmail.com', 24555887, 108, 3, NULL, NULL),
(19, 'Marcela', 'Gomez', 'f', 35669854, 'mg@gmail.com', 1234, 100004, 4, NULL, NULL),
(20, 'Analia', 'Mazzeo', 'f', 36415986, 'asd@hotmail.com', 0, 100005, 4, NULL, NULL),
(5, 'Cristian', 'Bahus', 'M', 27588456, 'cb@gmail.com', 0, 1005, 2, NULL, NULL),
(9, 'German', 'Scarafilo', 'M', 28774555, 'ger@gmail.com', 123, 1006, 2, 'img%2F9.jpeg?alt=media&amp;token=fe99c6d4-1f57-4d63-8b56-b6ee02d18acd', NULL),
(21, 'Ruben', 'Fonte', 'M', 21154869, 'fonte@gmail.com', 1, 1007, 2, NULL, NULL),
(22, 'Evelina', 'Benavidez', 'F', 25589659, 'evelina@yahoo.com', 12589659, 1008, 2, NULL, NULL),
(23, 'Maximiliano', 'Neiner', 'F', 29365849, 'mn@gmail.com', 29365849, 1009, 2, NULL, NULL),
(25, 'administrativo', 'emi', 'f', 93658412, 'Pro@asd.com', 93658412, 109, 3, NULL, NULL),
(26, 'prueba', 'emi', 'f', 1234412, 'administrativo@asd.com', 1234412, 1010, 2, NULL, NULL),
(27, 'Jhon', 'Rambo', 'M', 52649859, 'rambo@gmail.com', 52649859, 100007, 4, NULL, NULL),
(28, 'James', 'Rodriguez', 'M', 23568497, 'james@yahoo.com.ar', 23568497, 100008, 4, NULL, NULL),
(29, 'Lucia', 'Mema', 'F', 11111111, 'lulu@gmail.com', 11111111, 100009, 4, NULL, NULL),
(171, 'Juan', 'Perez', 'm', 29912283, 'jp@gmail.com', 1, 1011, 2, NULL, NULL),
(170, 'Jose', 'Lopez', 'M', 22334543, 'jlopez@gmail.com', 22334543, 100014, 4, NULL, NULL),
(169, 'Cristian', 'Quiroga', 'M', 45362546, 'cquiroga@gmail.com', 45362546, 100013, 4, NULL, NULL),
(168, 'Santiago', 'Leston', 'M', 54435276, 'sleston@gmail.com', 54435276, 100012, 4, NULL, NULL),
(165, 'Barbara', 'Iniguez', 'F', 35190003, 'biniguez@gmail.com', 35190003, 100010, 4, NULL, NULL),
(166, 'Lucia', 'Fernandez', 'F', 44544344, 'lfernandez@gmail.com', 44544344, 100011, 4, NULL, NULL),
(167, 'Pedro', 'Gonzalez', 'M', 34567876, 'pgonzalez@gmail.com', 34567876, 100012, 4, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id_asistencia`);

--
-- Indices de la tabla `comisiones`
--
ALTER TABLE `comisiones`
  ADD PRIMARY KEY (`id_comision`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `detalle_curso`
--
ALTER TABLE `detalle_curso`
  ADD PRIMARY KEY (`id_curso`,`id_alumno`);

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id_encuesta`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
--
-- AUTO_INCREMENT de la tabla `comisiones`
--
ALTER TABLE `comisiones`
  MODIFY `id_comision` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id_encuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
