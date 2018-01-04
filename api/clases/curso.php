<?php
class curso{
    public $id_curso;
    public $id_comision;
    public $id_profesor;
    public $id_materia;
    public $dia;
    public $aula;

    public static function AgregarCurso($comision,$profesor,$materia,$dia,$aula){
        $rta = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta
        ("INSERT INTO curso (id_comision,id_profesor,id_materia,dia,aula) 
            VALUES (:id_comision,:id_profesor,:id_materia,:dia,:aula) ");
        $consulta->bindValue(':id_comision',$comision);
        $consulta->bindValue(':id_profesor',$profesor);
        $consulta->bindValue(':id_materia',$materia);
        $consulta->bindValue(':dia',$dia);
        $consulta->bindValue(':aula',$aula);
        if($consulta->execute()){
            $rta = true;
        }
        return $rta;
    }
    public static function TraerListaPorCurso($idCurso){
        $rta = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT usuarios.legajo,usuarios.nombre, usuarios.apellido
                                                        FROM usuarios, curso, detalle_curso
                                                        WHERE detalle_curso.id_alumno = usuarios.id AND curso.id_curso = detalle_curso.id_curso AND curso.id_curso = :id_curso");
        $consulta->bindValue(':id_curso',$idCurso);
        if ($consulta->execute()){
            $rta = $consulta->fetchAll(PDO::FETCH_ASSOC);
            $rta = json_encode($rta);
        }
        return $rta;
    }
    public static function TraerCursosPorFecha($dia){
        $rta = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT curso.id_curso, comisiones.nombre AS Comision,materias.nombre AS Materia,usuarios.nombre AS nombre_prof,usuarios.apellido ape_prof
                                                         FROM comisiones,materias,usuarios,curso
                                                         WHERE curso.id_comision = comisiones.id_comision AND materias.id = curso.id_materia AND curso.id_profesor = usuarios.id AND curso.dia = :dia ");
        $consulta->bindValue(':dia',$dia);
        if ($consulta->execute()){
            $rta = $consulta->fetchAll(PDO::FETCH_ASSOC);
            $rta = json_encode($rta);
        }
        return $rta;
    }
    public static function TraerTodosLosCursos(){
        $rta = false;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM cursos");
        if($consulta->execute()){
            $rta = $consulta->fetchAll(PDO::FETCH_ASSOC);
            $rta = json_encode($rta);
        }
        return $rta;
    }
    public static function TraerCursoPorComision ($comision){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM cursos WHERE id_comision=:id_comision");
        $consulta->bindValue(':id_comision',$comision);
        $consulta->execute();
        $consulta = $consulta->fetAll(PDO::FETCH_ASSOC);
        $consulta = json_encode($consulta);

        return $consulta;
    }
    public static function TraerCursoPorMateria($materia){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM cursos WHERE id_materia=:id_materia");
        $consulta->bindValue(':id_materia', $materia);
        $consulta->execute();
        $consulta = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $consulta = json_encode($consulta);
        return $consulta;
    }
    public static function TraerCursoPorId($id_curso){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM cursos WHERE id_curso = :id_curso");
        $consulta->bindValue(':id_curso',$id_curso);
        $consulta->execute();
        $consulta = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $consulta = json_encode($consulta);
        return $consulta;
    }
}
?>