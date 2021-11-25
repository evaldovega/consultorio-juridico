export const ACCESS_TOKEN_NAME = "token-consultorio-juridico";
export const USER_FULL_NAME = "cj-nombre-usuario";

export const ROL_PERSONA = "CIUDADANO";
export const ROL_ESTUDIANTE = "ESTUDIANTE";
export const ROL_ASESOR = "ASESOR";
export const ROL_ADMIN = "ADMINISTRADOR";
export const POLITICA_DATOS =
  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500";

export const MODULES = [
  {
    id: 0,
    img: "images/modulo1.jpg",
    name: "Asesoría Jurídica",
    parent: "Asesoría Jurídica",
    url: "/asesoria-juridica",
    descripcion: "Descripción Asesoría Jurídica",
    policies: [ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE],
  },
  {
    id: 5,
    img: "images/modulo1.jpg",
    name: "Centro de conciliación",
    url: "/centro-de-conciliacion",
    descripcion: "Descripción Centro de Conciliación",
    policies: [ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE],
  },
  /*{
    id: 2,
    img: "images/modulo3.jpg",
    name: "Centro de conciliación",
    parent: "",
  },*/
  {
    id: 1,
    img: "images/modulo2.jpg",
    name: "Inscripción Estudiantes",
    parent: "Incripción de estudiantes",
    url: "/inscripcion-estudiantes",
    descripcion: "Inscripción de estudiantes",
    policies: [ROL_ADMIN, ROL_ASESOR],
  },
  {
    id: "",
    name: "Mis asesorias jurídicas",
    policies: [ROL_PERSONA],
    url: "mis-asesorias",
    descripcion: "",
    img: "images/modulo2.jpg",
  },
  {
    id: "",
    name: "Solicitar asesoría jurídica",
    policies: [ROL_PERSONA],
    url: "/asesoria-juridica/solicitar",
    descripcion: "",
    img: "images/modulo2.jpg",
  },
  {
    id: "",
    name: "Asignación de docentes",
    policies: [ROL_PERSONA, ROL_ASESOR, ROL_ADMIN],
    url: "/asignacion-empleados",
    descripcion: "",
    img: "images/modulo2.jpg",
  },
  {
    id: "",
    name: "Documentos",
    policies: [ROL_PERSONA, ROL_ASESOR, ROL_ADMIN],
    url: "/autorizaciones",
    descripcion: "",
    img: "images/modulo2.jpg",
  },
];
