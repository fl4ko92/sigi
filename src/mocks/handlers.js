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
          path: 'http://localhost:8000/api/centros',
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
          path: 'http://localhost:8000/api/centros',
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
]
