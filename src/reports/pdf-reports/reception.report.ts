import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from 'src/helpers/date-formatter';

interface ReportValues {
  id: number;
  serial: string;
  description: string;
  coverage: string;
  vmi: string;
  fail: string;
  createdDate: Date;
  userName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 14,
    bold: true,
    // alignment: "center",
    // margin: [0, 0, 0, 0]
  }
}

const logo: Content = {
  image: '././src/assets/logoexp.jpg',
  width: 300,
  height: 55,
  alignment: 'center',
  margin: [0, 10, 0, 20],
};

const currentDate: Content = {
  text: DateFormatter.getDDMMYYYY(new Date()),
  alignment: 'right',
  margin: [0, 0],
  fontSize: 10
};



export const getHelloWorldReport = (values: ReportValues): TDocumentDefinitions => {
  const {
    id,
    serial,
    description,
    coverage,
    vmi,
    fail,
    createdDate,
    userName,
    customerName,
    customerEmail,
    customerPhone,

  } = values;

  const docDefinition: TDocumentDefinitions = {


    styles: styles,
    pageMargins: [40, 10, 40, 0],



    // header: {
    //   columns: [logo, currentDate],
    // },

    content: [
      {
        image: '././src/assets/logoexp.jpg',
        width: 350,
        height: 66,
        alignment: 'center',
        margin: [0, 10, 0, 0]
      },
      {
        text: 'Av. Francisco Villa 1010, Parota Center, Local 45\n Col. Jardines de Las Gaviotas CP. 48328\n Puerto Vallarta, Jalisco Tel. (322)2210854',
        fontSize: 9,
        alignment: 'center',
        bold: true,
        margin: [0, -10, 0, 10]
      },
      {
        text: 'FORMATO DE RECEPCION DE EQUIPO A SERVICIO',
        fontSize: 12,
        margin: [0, 0, 0, 30],
        alignment: 'center',
        bold: true
      },
      {
        columns: [
          {
            text: 'DATOS DEL SERVICIO                                                                                                                                             ', bold: true,
            fontSize: 11,
            margin: [5, 20, 0, 0],
            decoration: 'underline',
            lineHeight: 1.5
          },
          { text: `ORDEN: ${id}`, bold: true, fontSize: 12, margin: [0, 20, 45, 0], alignment: 'right', color: '#001639' },

        ]
      },

      {
        columns: [{
          table: {
            body: [
              // [{ text: 'No Servicio: ', bold: true, fontSize: 10 }, { text: '0000002197', fontSize: 10, bold: true }],
              [{ text: 'Tipo Servicio: ', bold: true, fontSize: 10 }, { text: 'SERVICIO INTERNO', fontSize: 10 }],
              [{ text: 'Tecnico: ', bold: true, fontSize: 10 }, { text: `${userName}`, fontSize: 10 }],
              [{ text: 'Tech ID: ', bold: true, fontSize: 10 }, { text: 'FKV019FF8', fontSize: 10 }]
            ]
          },
          layout: {
            defaultBorder: false,
            // fillColor: '#F1FFFA',

          }
        }, {
          table: {
            body: [
              [{ text: 'Fecha de Recepcion: ', bold: true, fontSize: 10 }, { text: DateFormatter.getDDMMYYYY(createdDate), fontSize: 10 }],
              [{ text: 'Fecha de Diagnostico: ', bold: true, fontSize: 10 }, { text: DateFormatter.getDDMMYYYY(createdDate), fontSize: 10 }],
            ]
          },
          layout: {
            defaultBorder: false,
          },
        }]
      },
      {
        text: 'DATOS DEL CLIENTE                                                       EQUIPO                                                                          ',
        bold: true,
        fontSize: 11,
        margin: [5, 20, 0, 0],
        decoration: 'underline',
        lineHeight: 1.5
      },
      {
        columns: [{
          table: {
            body: [
              [{ text: 'Cliente: ', bold: true, fontSize: 10 }, { text: `${customerName}`, fontSize: 10 }],
              [{ text: 'E-mail: ', bold: true, fontSize: 10 }, { text: `${customerEmail}`, fontSize: 10 }],
              [{ text: 'Telefono: ', bold: true, fontSize: 10 }, { text: `${customerPhone}`, fontSize: 10 }],
            ]
          },
          layout: {
            defaultBorder: false,
          }


        }, {
          table: {
            body: [
              [{ text: 'Serial: ', bold: true, fontSize: 10 }, { text: `${serial}`, bold: true, fontSize: 10 }],
              [{ text: 'Descripcion: ', bold: true, fontSize: 10 }, { text: `${description}`, fontSize: 10 }],
              [{ text: 'Cobertura: ', bold: true, fontSize: 10 }, { text: `${coverage}`, fontSize: 10 }],
              // [{ text: 'Problema o falla: ', bold: true, fontSize: 10 }, { text: 'No enciende, daño liquido.', fontSize: 10 }],
            ]
          },
          layout: {
            defaultBorder: false,
          }
        },
        ],
      }
      ,
      {
        text: 'ESTADO FISICO',
        bold: true,
        fontSize: 11,
        margin: [5, 30, 0, 5],
      },
      { text: `${vmi}`, fontSize: 10, margin: [5, 0, 0, 0] },
      {
        text: 'PROBLEMA REPORTADO: ',
        bold: true,
        fontSize: 11,
        margin: [5, 30, 0, 5],
      },
      { text: `${fail}`, fontSize: 10, margin: [5, 0, 0, 0] },
      {
        text: 'OBSERVACIONES', bold: true,
        fontSize: 11,
        margin: [5, 30, 0, 5],
      },
      { text: 'Se deja equipo a revision para enviar a validacion AppleCare, en caso de ser autorizado, costo de reparacion $2,449.', fontSize: 10, margin: [5, 0, 0, 30] },
      {
        text: 'Toda revisión y diagnostico implica un costo de $ 700.00 netos, en caso de no aceptar la cotización.',
        fontSize: 9,
        bold: true,
        margin: [5, 5, 0, 5],
      },
      {
        text: 'Después de 90 días todos los equipos que no se recojan de nuestro taller, serán enviados a Apple aplicando el programa de reciclado.',
        fontSize: 9,
        bold: true,
        margin: [5, 0, 0, 75],
      },


      {
        columns: [
          { text: '   Jose Alfredo Medina Cardenas   ', alignment: 'center', fontSize: 10, decoration: 'overline', lineHeight: 1.5 },
          { text: `          ${customerName}          `, alignment: 'center', fontSize: 10, decoration: 'overline', lineHeight: 3 }
        ]
      },
      { qr: 'https://support.apple.com/es-mx/my-support', foreground: '#173057', background: 'white', fit: 90, alignment: 'right', margin: [0, 0, -5, 0] },
    ],

  };



  return docDefinition;
};