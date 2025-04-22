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
  clientName: string;
  clientEmail: string;
  clientPhone: string;
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
    clientName,
    clientEmail,
    clientPhone,

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
        width: 450,
        height: 80,
        alignment: 'center',
        margin: [0, 10, 0, 0]
      },
      {
        text: 'Av. Francisco Villa 1010, Parota Center, Local 45\n Col. Jardines de Las Gaviotas CP. 48328\n Puerto Vallarta, Jalisco Tel. (322)2210854',
        fontSize: 10,
        alignment: 'center',
        bold: true,
        margin: [0, -10, 0, 10]
      },

      //Ejemplo canvas caja redondeada
      // {
      //   canvas: [
      //     {
      //       type: 'rect',
      //       x: 0,
      //       y: 20,
      //       w: 200,
      //       h: 80,
      //       r: 5,
      //       lineColor: 'black',
      //     },
      //   ]
      // },

      {
        text: 'FORMATO DE RECEPCION DE EQUIPO A SERVICIO',
        fontSize: 12,
        margin: [0, 0, 0, 20],
        alignment: 'center',
        bold: true
      },
      {
        columns: [
          {
            text: 'DATOS DEL SERVICIO', bold: true,
            fontSize: 11,
            margin: [0, 0, 0, 0],
            lineHeight: 1.5
          },
          // { text: `SERVICIO: ${id}`, bold: true, fontSize: 11, margin: [0, 20, 55, 0], alignment: 'right', color: '#001639' },

        ]
      },

      {
        canvas: [
          {
            type: 'rect',
            x: -5,
            y: -5,
            w: 530,
            h: 70,
            r: 5,
            lineColor: 'black',
            color: '#FFFCFC'
          },
        ]
      },

      {
        columns: [{
          table: {
            body: [
              [{ text: 'No Servicio: ', bold: true, fontSize: 11 }, { text: `00000${id}`, fontSize: 11, margin: [0, 0, 0, 3] }],
              // [{ text: 'Tipo Servicio: ', bold: true, fontSize: 10 }, { text: 'SERVICIO INTERNO', fontSize: 10 }],
              [{ text: 'Tecnico: ', bold: true, fontSize: 11 }, { text: `${userName}`, fontSize: 11, margin: [0, 0, 0, 3] }],
              [{ text: 'Tech ID: ', bold: true, fontSize: 11 }, { text: 'FKV019FF8', fontSize: 11, margin: [0, 0, 0, 3] }]
            ]
          },
          layout: 'noBorders',
          absolutePosition: { x: 45, y: 190 }
        }, {
          table: {
            body: [
              [{ text: 'Fecha de Recepcion: ', bold: true, fontSize: 11 }, { text: DateFormatter.getDDMMYYYY(createdDate), fontSize: 11, margin: [0, 0, 0, 3] }],
              [{ text: 'Fecha de Diagnostico: ', bold: true, fontSize: 11 }, { text: DateFormatter.getDDMMYYYY(createdDate), fontSize: 11, margin: [0, 0, 0, 3] }],
              [{ text: 'Tipo Servicio: ', bold: true, fontSize: 11 }, { text: 'SERVICIO INTERNO', fontSize: 11, margin: [0, 0, 0, 3] }],
            ]
          },
          layout: 'noBorders',
          absolutePosition: { x: 300, y: 190 }
        }]
      },
      {
        columns: [
          {
            text: 'DATOS DEL CLIENTE', bold: true,
            fontSize: 11,
            margin: [0, 20, 0, 0],
            lineHeight: 1.5
          },
          { text: 'DATOS DEL EQUIPO', bold: true, fontSize: 11, margin: [0, 20, 0, 0], alignment: 'left', color: '#001639' },

        ]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: -5,
            y: -5,
            w: 530,
            h: 70,
            r: 5,
            lineColor: 'black',
            color: '#FFFCFC'
          },
        ]
      },
      {
        columns: [{
          table: {
            body: [
              [{ text: 'Cliente: ', bold: true, fontSize: 11 }, { text: `${clientName}`, fontSize: 11, margin: [0, 0, 0, 3] }],
              [{ text: 'E-mail: ', bold: true, fontSize: 11 }, { text: `${clientEmail}`, fontSize: 11, margin: [0, 0, 0, 3] }],
              [{ text: 'Telefono: ', bold: true, fontSize: 11 }, { text: `${clientPhone}`, fontSize: 11, margin: [0, 0, 0, 3] }],
            ]
          },
          layout: 'noBorders',
          absolutePosition: { x: 45, y: 295 }
        }, {
          table: {
            body: [
              [{ text: 'Serial: ', bold: true, fontSize: 11 }, { text: `${serial}`, bold: true, fontSize: 11, margin: [0, 0, 0, 3] }],
              [{ text: 'Descripcion: ', bold: true, fontSize: 11 }, { text: `${description}`, fontSize: 11, margin: [0, 0, 0, 3] }],
              [{ text: 'Cobertura: ', bold: true, fontSize: 11 }, { text: `${coverage}`, fontSize: 11, margin: [0, 0, 0, 3] }],
              // [{ text: 'Problema o falla: ', bold: true, fontSize: 10 }, { text: 'No enciende, daño liquido.', fontSize: 10 }],
            ]
          },
          layout: 'noBorders',
          absolutePosition: { x: 300, y: 295 }
        },
        ],
      }
      ,
      
      {
        text: 'ESTADO FISICO',
        bold: true,
        fontSize: 11,
        margin: [0, 20, 0, 5],
      },
      { text: `${vmi}`, fontSize: 11, margin: [0, 0, 0, 0] },
      {
        text: 'PROBLEMA REPORTADO: ',
        bold: true,
        fontSize: 11,
        margin: [0, 20, 0, 5],
      },
      { text: `${fail}`, fontSize: 11, margin: [0, 0, 0, 0] },
      {
        text: 'OBSERVACIONES', bold: true,
        fontSize: 11,
        margin: [0, 20, 0, 5],
      },
      { text: 'Se deja equipo a revision para enviar a validacion AppleCare, en caso de ser autorizado, costo de reparacion $2,449.',
        fontSize: 11,
        margin: [0, 0, 0, 20],
        alignment: 'justify'
        },
      {
        text: 'Toda revisión y diagnostico implica un costo de $ 700.00 netos, en caso de no aceptar la cotización.',
        fontSize: 11,
        bold: true,
        margin: [0, 5, 0, 5],
        alignment: 'justify'
      },
      {
        text: 'Después de 90 días todos los equipos que no se recojan de nuestro taller, serán enviados a Apple aplicando el programa de reciclado.',
        fontSize: 11,
        bold: true,
        margin: [0, 0, 0, 60],
        alignment: 'justify'
      },


      {
        columns: [
          { text: `          ${userName}          `, alignment: 'center', fontSize: 12, decoration: 'underline' },
          { text: `          ${clientName}          `, alignment: 'center', fontSize: 12, decoration: 'underline' }
        ]
      },
      {
        columns: [
          {text: 'RECIBE', alignment: 'center', fontSize: 10, margin: [0,2,0,0]},
          {text: 'ENTREGO', alignment: 'center', fontSize: 10, margin: [0,2,0,0]}
      ]
      },
      { qr: 'https://support.apple.com/es-mx/my-support', foreground: '#053582', background: 'white', fit: 90, alignment: 'left', margin: [0, 15, 0, 2] },
      {text: 'Verifica el estado\nde tu servicio.', fontSize:10, margin:[-2,0,0,0]}
    ],

  };



  return docDefinition;
};