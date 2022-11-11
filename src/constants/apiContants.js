export const ACCESS_TOKEN_NAME = "token-consultorio-juridico";
export const USER_FULL_NAME = "cj-nombre-usuario";
export const PERSONA_NATURAL = "NATURAL";
export const PERSONA_JURIDICA = "JURIDICA";
export const ROL_PERSONA = "CIUDADANO";
export const ROL_ESTUDIANTE = "ESTUDIANTE";
export const ROL_ASESOR = "ASESOR";
export const ROL_ADMIN = "ADMINISTRADOR";
export const ROL_DOCENTE = "DOCENTE";
export const POLITICA_DATOS =
  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500";
export const PAGE_SIZE = 10;
export const CONFIRM_BORRAR_ARCHIVO = "¿Seguro que quiere borrar este archivo?";
export const MODULES = [
  {
    id: 0,
    img: "images/modulo3.jpg",
    name: "Mi inscripción",
    url: "/mi-inscripcion",
    descripcion: "",
    policies: [ROL_ESTUDIANTE],
  },
  {
    id: 0,
    img: "images/modulo2.jpg",
    name: "Asesoría Jurídica",
    parent: "Asesoría Jurídica",
    url: "/asesoria-juridica",
    descripcion: "",
    policies: [ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE, ROL_DOCENTE],
  },
  {
    id: 5,
    img: "images/modulo4.jpg",
    name: "Centro de conciliación",
    url: "/centro-de-conciliacion",
    descripcion: "",
    policies: [ROL_ADMIN, ROL_ASESOR, ROL_ESTUDIANTE, ROL_DOCENTE, ROL_PERSONA],
  },
  {
    id: 1,
    img: "images/modulo3.jpg",
    name: "Inscripción Estudiantes",
    parent: "Incripción de estudiantes",
    url: "/inscripcion-estudiantes",
    descripcion: "",
    policies: [ROL_ADMIN, ROL_ASESOR, ROL_DOCENTE],
  },
  {
    id: "",
    name: "Mis asesorias",
    policies: [ROL_PERSONA],
    url: "/asesoria-juridica/solicitudes",
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
    name: "Encuesta de satisfacción",
    policies: [ROL_PERSONA],
    url: "/asesoria-juridica/encuesta",
    descripcion: "",
    img: "images/modulo2.jpg",
  },
  {
    id: "",
    name: "Asignación de docentes",
    policies: [ROL_ASESOR, ROL_ADMIN],
    url: "/asignacion-docentes",
    descripcion: "",
    img: "images/modulo5.jpg",
  },
  {
    id: "",
    name: "Documentos y autorizaciones",
    policies: [ROL_ADMIN, ROL_ASESOR],
    url: "/autorizaciones",
    descripcion: "",
    img: "images/modulo6.jpg",
  },
  {
    id: "",
    name: "Funciones de administrador",
    policies: [ROL_ADMIN],
    url: "/funciones-admin",
    descripcion: "",
    img: "images/modulo2.jpg",
  },
];

export const VIDEOS = [
  {
    id: 0,
    img: "images/modulo2.jpg",
    name: "Registro de asesoría",
    parent: "Registro de asesoría",
    url: "https://consultoriojuridico.uniatlantico.edu.co:8000/media/tutoriales/registro_de_asesoria.mp4",
    descripcion: "",
  },
  {
    id: 1,
    img: "images/modulo5.jpg",
    name: "Registro de usuario ciudadano",
    parent: "Registro de usuario ciudadano",
    url: "https://consultoriojuridico.uniatlantico.edu.co:8000/media/tutoriales/registro_de_usuario_ciudadano.mp4",
    descripcion: "",
  },
]
