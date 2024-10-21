import { Content } from 'pdfmake/interfaces';

const logo: Content = {
    image: '/src/assets/logoexp.jpg',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20],
};

export const headerSection = (): Content => {

    const headerLogo: Content = logo;

    return {
        // columns: [headerLogo]
        text: 'Hallo',
    }
};