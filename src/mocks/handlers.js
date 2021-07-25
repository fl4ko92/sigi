import { rest } from 'msw'
import { REQUEST_DIR } from '../utils/constants'

export default [
  rest.get(REQUEST_DIR + 'centros?page=1', (req, res, ctx) => {
    return res(
      ctx.json({
        centros: [
          {
            id_centro: 1,
            nombre_centro: 'Verda Robel',
            municipio: 'Santa Clara',
            organismo: 'MINED',
            created_at: '2021-07-06 21:45:51',
            updated_at: '2021-07-06 21:45:51',
          },
          {
            id_centro: 2,
            nombre_centro: 'Mina Braun',
            municipio: 'Placetas',
            organismo: 'MES',
            created_at: '2021-07-06 21:45:51',
            updated_at: '2021-07-06 21:45:51',
          },
          {
            id_centro: 3,
            nombre_centro: 'Clarabelle Bednar',
            municipio: 'Placetas',
            organismo: 'MES',
            created_at: '2021-07-06 21:45:51',
            updated_at: '2021-07-06 21:45:51',
          },
        ],
        meta: {
          current_page: 1,
          from: 1,
          last_page: 2,
          per_page: 10,
          to: 10,
          total: 4,
        },
      }),
    )
  }),
  rest.post(REQUEST_DIR + 'centros', (req, res, ctx) => {
    return res(
      ctx.json({
        centro: {
          id_centro: 9,
          nombre_centro: 'Mrs. Katharina Feeney',
          municipio: 'Sagua',
          organismo: 'MES',
          created_at: '2021-07-06 21:45:51',
          updated_at: '2021-07-06 21:45:51',
        },
        message: 'Success',
      }),
    )
  }),
  rest.put(REQUEST_DIR + 'centros/1', (req, res, ctx) => {
    return res(
      ctx.json({
        centro: {
          id_centro: 10,
          nombre_centro: 'Panchito3',
          municipio: 'Sagua',
          organismo: 'MES',
          created_at: '2021-07-06 21:45:51',
          updated_at: '2021-07-07 01:45:37',
        },
        message: 'Centro Actualizado',
      }),
    )
  }),
  rest.delete(REQUEST_DIR + 'centros/1', (req, res, ctx) => {
    return res(
      ctx.json({
        centro: {
          id_centro: 10,
          nombre_centro: 'Panchito3',
          municipio: 'Sagua',
          organismo: 'MES',
          created_at: '2021-07-06 21:45:51',
          updated_at: '2021-07-07 01:45:37',
        },
        message: 'Centro Eliminado',
      }),
    )
  }),
  rest.get(REQUEST_DIR + 'centros/1/areas?page=1', (req, res, ctx) => {
    return res(
      ctx.json({
        areas: [
          {
            id_area: 1,
            id_centro: 1,
            nombre: 'Chad Bins',
            categoria: 'Alto Riesgo',
            created_at: '2021-07-07 03:20:18',
            updated_at: '2021-07-07 03:20:18',
          },
        ],
        meta: {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 10,
          to: 1,
          total: 1,
        },
      }),
    )
  }),
  rest.post(REQUEST_DIR + 'centros/1/areas', (req, res, ctx) => {
    return res(
      ctx.json({
        area: {
          id_centro: 9,
          nombre_centro: 'Mrs. Katharina Feeney',
          municipio: 'Sagua',
          organismo: 'MES',
          created_at: '2021-07-06 21:45:51',
          updated_at: '2021-07-06 21:45:51',
        },
        message: 'Success',
      }),
    )
  }),
  rest.put(REQUEST_DIR + 'areas/1', (req, res, ctx) => {
    return res(
      ctx.json({
        area: {
          id_centro: 9,
          nombre_centro: 'Mrs. Katharina Feeney',
          municipio: 'Sagua',
          organismo: 'MES',
          created_at: '2021-07-06 21:45:51',
          updated_at: '2021-07-06 21:45:51',
        },
        message: 'Success',
      }),
    )
  }),
  rest.delete(REQUEST_DIR + 'areas/1', (req, res, ctx) => {
    return res(
      ctx.json({
        centro: {
          id_centro: 10,
          nombre_centro: 'Panchito3',
          municipio: 'Sagua',
          organismo: 'MES',
          created_at: '2021-07-06 21:45:51',
          updated_at: '2021-07-07 01:45:37',
        },
        message: 'Area Eliminado',
      }),
    )
  }),
  rest.get(REQUEST_DIR + 'pacientes?page=1', (req, res, ctx) => {
    return res(
      ctx.json({
        pacientes: [
          {
            id_paciente: '1',
            ci: 92121234063,
            nombre: 'Pepe',
            apellidos: 'Glez Hdez',
          },
          {
            id_paciente: '1',
            ci: 92121234063,
            nombre: 'Pepe',
            apellidos: 'Glez Hdez',
          },
          {
            id_paciente: '1',
            ci: 92121234063,
            nombre: 'Pepe',
            apellidos: 'Glez Hdez',
          },
        ],
        meta: {
          current_page: 1,
          from: 1,
          last_page: 2,
          per_page: 10,
          to: 10,
          total: 20,
        },
      }),
    )
  }),
  rest.post(REQUEST_DIR + 'pacientes', (req, res, ctx) => {
    return res(
      ctx.json({
        paciente: {
          id_paciente: 2,
          nombre: 'Test store',
          apellidos: 'Test',
          edad: '25',
          ci: '12312312312',
          sexo: 'M',
          direccion: 'Test',
          cmf: null,
          remite_caso: null,
          hospital: null,
          estado_salud: null,
          categoria: '1',
          estado_sistema: null,
          trabajador_salud: '0',
          embarazada: '0',
          ninho: '0',
          test_antigeno: '1',
          vacunado: '0',
          apps: {
            id_app: 2,
            id_paciente: 2,
            hipertension: 0,
            diabetes: 0,
            asma: 1,
            obesidad: 0,
            insuficiencia_renal: 0,
            oncologia: 0,
            otros: '',
            created_at: '2021-07-15 03:36:39',
            updated_at: '2021-07-15 03:36:39',
          },
          sintomas: {
            id_sintomas: 2,
            id_paciente: 2,
            fecha_sintomas: null,
            fiebre: 1,
            rinorrea: 0,
            congestion_nasal: 0,
            tos: 0,
            expectoracion: 0,
            dificultad_respiratoria: 0,
            cefalea: 0,
            dolor_garganta: 0,
            otros: '',
            created_at: '2021-07-15 03:36:39',
            updated_at: '2021-07-15 03:36:39',
          },
          contacto: {
            id_contactos: 2,
            id_paciente: 2,
            fecha_contacto: null,
            tipo_contacto: null,
            lugar_contacto: 'Test',
            created_at: '2021-07-15 03:36:39',
            updated_at: '2021-07-15 03:36:39',
          },
        },
        message: 'Paciente registrado',
      }),
    )
  }),
  rest.get(REQUEST_DIR + 'pacientes/1', (req, res, ctx) => {
    return res(
      ctx.json({
        paciente: {
          id_paciente: 1,
          nombre: 'Yoelvis',
          apellidos: 'Gonzalez',
          edad: 28,
          ci: '92121234063',
          sexo: 'M',
          direccion: 'Oquendo 109 e/ Ateneo y Cornelio. Rpro Virginia',
          cmf: '20.31',
          remite_caso: 'Policlinico',
          hospital: null,
          estado_salud: 1,
          provincia: 1,
          municipio: 1,
          categoria: 1,
          area_salud: 1,
          estado_sistema: '1',
          trabajador_salud: false,
          embarazada: false,
          ninho: false,
          test_antigeno: 'Negativo',
          vacunado: true,
          apps: {
            id_app: 1,
            id_paciente: 1,
            hipertension: false,
            diabetes: false,
            asma: false,
            obesidad: false,
            insuficiencia_renal: false,
            oncologia: false,
            otros: '',
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
          sintomas: {
            id_sintomas: 1,
            id_paciente: 1,
            fecha_sintomas: null,
            fiebre: false,
            rinorrea: false,
            congestion_nasal: false,
            tos: false,
            expectoracion: false,
            dificultad_respiratoria: false,
            cefalea: false,
            dolor_garganta: false,
            otros: '',
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
          contacto: {
            id_contactos: 1,
            id_paciente: 1,
            fecha_contacto: null,
            tipo_contacto: null,
            lugar_contacto: null,
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
          arribo: {
            id_arribo: 1,
            id_paciente: 1,
            pais_procedencia: null,
            lugar_estancia: null,
            fecha_arribo: null,
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
        },
        message: 'Success',
      }),
    )
  }),
  rest.put(REQUEST_DIR + 'pacientes/1', (req, res, ctx) => {
    return res(
      ctx.json({
        paciente: {
          id_paciente: 1,
          nombre: 'Test store',
          apellidos: 'Test',
          edad: 25,
          ci: '12312312316',
          sexo: 'M',
          direccion: 'Test',
          cmf: null,
          remite_caso: null,
          hospital: null,
          estado_salud: 'Test',
          categoria: 'Test',
          estado_sistema: 'Test',
          trabajador_salud: 0,
          embarazada: 0,
          ninho: 0,
          test_antigeno: 'Test',
          vacunado: 0,
          apps: {
            id_app: 1,
            id_paciente: 1,
            hipertension: 0,
            diabetes: 0,
            asma: 1,
            obesidad: 0,
            insuficiencia_renal: 0,
            oncologia: 0,
            otros: '',
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
          sintomas: {
            id_sintomas: 1,
            id_paciente: 1,
            fecha_sintomas: null,
            fiebre: 1,
            rinorrea: 0,
            congestion_nasal: 0,
            tos: 0,
            expectoracion: 0,
            dificultad_respiratoria: 0,
            cefalea: 0,
            dolor_garganta: 0,
            otros: '',
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
          contacto: {
            id_contactos: 1,
            id_paciente: 1,
            fecha_contacto: null,
            tipo_contacto: null,
            lugar_contacto: 'Test',
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
          arribo: {
            id_arribo: 1,
            id_paciente: 1,
            pais_procedencia: 'Italia',
            lugar_estancia: null,
            fecha_arribo: null,
            created_at: '2021-07-15 20:12:20',
            updated_at: '2021-07-15 20:12:20',
          },
        },
        message: 'Success',
      }),
    )
  }),
  rest.delete(REQUEST_DIR + 'pacientes/1', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Success',
      }),
    )
  }),
  rest.get(REQUEST_DIR + 'nomenclador/antigeno', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'Positivo',
        },
        {
          id: 2,
          nombre: 'Negativo',
        },
        {
          id: 3,
          nombre: 'No realizado',
        },
      ]),
    ),
  ),
  rest.get(REQUEST_DIR + 'nomenclador/provincia', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'HABANA',
        },
        {
          id: 2,
          nombre: 'MATANZAS',
        },
        {
          id: 3,
          nombre: 'VILLA CLARA',
        },
      ]),
    ),
  ),
  rest.get(REQUEST_DIR + 'nomenclador/clasificacion', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'ALTO RIESGO',
        },
        {
          id: 2,
          nombre: 'MEDIANO RIESGO',
        },
        {
          id: 3,
          nombre: 'BAJO RIESGO',
        },
      ]),
    ),
  ),
  rest.get(REQUEST_DIR + 'nomenclador/sistema', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'ENCUESTADO',
        },
        {
          id: 2,
          nombre: 'PENDIENTE INGRESO',
        },
        {
          id: 3,
          nombre: 'INGRESADO',
        },
      ]),
    ),
  ),
  rest.get(REQUEST_DIR + 'nomenclador/estado', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'DE CUIDADO',
        },
        {
          id: 2,
          nombre: 'GRAVE',
        },
        {
          id: 3,
          nombre: 'ETC',
        },
      ]),
    ),
  ),
  rest.get(REQUEST_DIR + 'nomenclador/categoria', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'SOSPECHOSO',
        },
        {
          id: 2,
          nombre: 'POSITIVO',
        },
        {
          id: 3,
          nombre: 'CONTACTO',
        },
      ]),
    ),
  ),
  rest.get(REQUEST_DIR + 'nomenclador/municipio/1', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'Santa Clara',
        },
        {
          id: 2,
          nombre: 'Maniv=caragua',
        },
        {
          id: 3,
          nombre: 'Santo Domingo',
        },
      ]),
    ),
  ),
  rest.get(REQUEST_DIR + 'nomenclador/salud/1', (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: 1,
          nombre: 'Santa Clara',
        },
        {
          id: 2,
          nombre: 'XX Aniversario',
        },
        {
          id: 3,
          nombre: 'Maleza',
        },
      ]),
    ),
  ),
]
