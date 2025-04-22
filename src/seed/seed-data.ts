interface Order {
    serial: string;
    description: string;
    coverage: string;
    vmi: string;
    fail: string;
    user: number;
    client: number;
}

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface Client {
    name: string;
    email: string;
    phone: string;

}

interface SeedData {
    users: User [];
    clients: Client [];
    orders: Order[];

}

export const seed: SeedData = {
    
    users: [
        {
            name: 'Jose Alfredo Medina',
            email: 'alfredo.medina@expertics.com.mx',
            password: '1234',
            role: 'ADMIN'
        },
        {
            name: 'Angeles Villafaña',
            email: 'calidad@expertics.com.mx',
            password: '4321',
            role: 'USER'
        },
        {
            name: 'Jorge Estrada',
            email: 'jorge.estrada@expertics.com.mx',
            password: '123456',
            role: 'ADMIN'
        },
        
    ],
    clients: [
        {
            name: 'Michael Scott',
            email: 'worldsbestboss@dundermifflin.com',
            phone: '3201234567'
        },
        {
            name: 'Walter White',
            email: 'heisenberg@lospollos.com',
            phone: '3202345678'
        },
        {
            name: 'Jonas Kahnwald',
            email: 'jonas@winden.de',
            phone: '3203456789'
        },
        {
            name: 'Dwight Schrute',
            email: 'assistantregionalmanager@schrutefarms.com',
            phone: '3204567890'
        },
        {
            name: 'Jesse Pinkman',
            email: 'sciencebitch@abq.com',
            phone: '3205678901'
        },
        {
            name: 'Martha Nielsen',
            email: 'martha@winden.de',
            phone: '3206789012'
        },
        {
            name: 'Jim Halpert',
            email: 'bigtuna@dundermifflin.com',
            phone: '3207890123'
        },
        {
            name: 'Saul Goodman',
            email: 'bettercallsaul@lawyer.com',
            phone: '3208901234'
        },
        {
            name: 'Ulrich Nielsen',
            email: 'ulrich@windenpd.de',
            phone: '3209012345'
        },
        {
            name: 'Pam Beesly',
            email: 'pam@dundermifflin.com',
            phone: '3210123456'
        },
        {
            name: 'Gus Fring',
            email: 'gus@lospollos.com',
            phone: '3211234567'
        },
        {
            name: 'Claudia Tiedemann',
            email: 'claudia@winden.de',
            phone: '3212345678'
        },
        {
            name: 'Angela Martin',
            email: 'angela@dundermifflin.com',
            phone: '3213456789'
        },
        {
            name: 'Skyler White',
            email: 'skyler@carwash.com',
            phone: '3214567890'
        },
        {
            name: 'Magnus Nielsen',
            email: 'magnus@winden.de',
            phone: '3215678901'
        },
        {
            name: 'Kevin Malone',
            email: 'kevinnumber@dundermifflin.com',
            phone: '3216789012'
        },
        {
            name: 'Hank Schrader',
            email: 'hank@dea.gov',
            phone: '3217890123'
        },
        {
            name: 'Noah Kahnwald',
            email: 'noah@winden.de',
            phone: '3218901234'
        },
        {
            name: 'Stanley Hudson',
            email: 'stanley@dundermifflin.com',
            phone: '3219012345'
        },
        {
            name: 'Mike Ehrmantraut',
            email: 'mike@betterwork.com',
            phone: '3220123456'
        },
        {
            name: 'Charlotte Doppler',
            email: 'charlotte@windenpd.de',
            phone: '3221234567'
        },
        {
            name: 'Creed Bratton',
            email: 'creed@dundermifflin.com',
            phone: '3222345678'
        },
        {
            name: 'Todd Alquist',
            email: 'todd@vamonospest.com',
            phone: '3223456789'
        },
        {
            name: 'H.G. Tannhaus',
            email: 'tannhaus@winden.de',
            phone: '3224567890'
        },
        {
            name: 'Oscar Martinez',
            email: 'oscar@dundermifflin.com',
            phone: '3225678901'
        },
        {
            name: 'Tuco Salamanca',
            email: 'tuco@cartel.com',
            phone: '3226789012'
        },
        {
            name: 'Mikkel Nielsen',
            email: 'mikkel@winden.de',
            phone: '3227890123'
        },
        {
            name: 'Kelly Kapoor',
            email: 'kelly@dundermifflin.com',
            phone: '3228901234'
        },
        {
            name: 'Badger',
            email: 'badger@abq.com',
            phone: '3229012345'
        },
        {
            name: 'Adam',
            email: 'adam@sic.de',
            phone: '3230123456'
        },
        {
            name: 'Meredith Palmer',
            email: 'meredith@dundermifflin.com',
            phone: '3231234567'
        },
        {
            name: 'Skinny Pete',
            email: 'skinnypete@abq.com',
            phone: '3232345678'
        },
        {
            name: 'Hannah Kahnwald',
            email: 'hannah@winden.de',
            phone: '3233456789'
        },
        {
            name: 'Ryan Howard',
            email: 'ryan@wuphf.com',
            phone: '3234567890'
        },
        {
            name: 'Jane Margolis',
            email: 'jane@abq.com',
            phone: '3235678901'
        },
        {
            name: 'Bartosz Tiedemann',
            email: 'bartosz@winden.de',
            phone: '3236789012'
        },
        {
            name: 'Toby Flenderson',
            email: 'toby@dundermifflin.com',
            phone: '3237890123'
        },
        {
            name: 'Huell Babineaux',
            email: 'huell@lawyer.com',
            phone: '3238901234'
        },
        {
            name: 'Regina Tiedemann',
            email: 'regina@winden.de',
            phone: '3239012345'
        },
        {
            name: 'Phyllis Vance',
            email: 'phyllis@dundermifflin.com',
            phone: '3240123456'
        },
        {
            name: 'Ted Beneke',
            email: 'ted@beneke.com',
            phone: '3241234567'
        },
        {
            name: 'Elisabeth Doppler',
            email: 'elisabeth@winden.de',
            phone: '3242345678'
        },
        {
            name: 'Jan Levinson',
            email: 'jan@dundermifflin.com',
            phone: '3243456789'
        },
        {
            name: 'Gretchen Schwartz',
            email: 'gretchen@graymatter.com',
            phone: '3244567890'
        },
        {
            name: 'Peter Doppler',
            email: 'peter@winden.de',
            phone: '3245678901'
        },
        {
            name: 'David Wallace',
            email: 'wallace@dundermifflin.com',
            phone: '3246789012'
        },
        {
            name: 'Lydia Rodarte-Quayle',
            email: 'lydia@madrigal.com',
            phone: '3247890123'
        },
        {
            name: 'Franziska Doppler',
            email: 'franziska@winden.de',
            phone: '3248901234'
        },
        {
            name: 'Holly Flax',
            email: 'holly@dundermifflin.com',
            phone: '3249012345'
        }
    ],
    orders: [
        {
            serial: 'MNPD2023ABC',
            description: 'MacBook Pro 16" M2 Max 32GB RAM',
            coverage: 'AppleCare+',
            vmi: 'Minor wear on keyboard, slight dent on bottom case',
            fail: 'Random system crashes, battery draining fast',
            user: 1,
            client: 1,
        },
        {
            serial: 'XNP0298374',
            description: 'iPhone 15 Pro Max 256GB Space Black',
            coverage: 'Limited Warranty',
            vmi: 'Screen protector applied, small scratch on camera lens',
            fail: 'Face ID not responding, cellular signal issues',
            user: 2,
            client: 2,
        },
        {
            serial: 'IPDA987654Z',
            description: 'iPad Air 5th Gen 256GB Blue',
            coverage: 'Out of Warranty',
            vmi: 'Heavy usage marks on screen, bent corner',
            fail: 'Touch screen unresponsive in certain areas',
            user: 3,
            client: 3,
        },
        {
            serial: 'APTW456789Y',
            description: 'Apple Watch Series 9 45mm',
            coverage: 'AppleCare+',
            vmi: 'Scratches on display, worn sport band',
            fail: 'Battery not holding charge, crown stuck',
            user: 1,
            client: 4,
        },
        {
            serial: 'MPB2023XYZ1',
            description: 'MacBook Air M2 512GB Midnight',
            coverage: 'Limited Warranty',
            vmi: 'Perfect condition, minimal usage',
            fail: 'Wi-Fi connectivity issues, speaker crackling',
            user: 2,
            client: 5,
        },
        {
            serial: 'IPH15PRO123',
            description: 'iPhone 15 Pro 512GB Natural',
            coverage: 'AppleCare+',
            vmi: 'Case used, minor scratches on frame',
            fail: 'Camera autofocus not working',
            user: 3,
            client: 6,
        },
        {
            serial: 'IPDM2023456',
            description: 'iPad Mini 6th Gen 64GB Starlight',
            coverage: 'Limited Warranty',
            vmi: 'Screen protector cracked, otherwise good',
            fail: 'Not charging properly, battery drain',
            user: 1,
            client: 7,
        },
        {
            serial: 'APTW987ULT8',
            description: 'Apple Watch Ultra 2 49mm',
            coverage: 'AppleCare+',
            vmi: 'Light scratches on titanium case',
            fail: 'Altitude readings incorrect, GPS issues',
            user: 2,
            client: 8,
        },
        {
            serial: 'MBP16M2MAX9',
            description: 'MacBook Pro 16" M2 Max 1TB',
            coverage: 'Limited Warranty',
            vmi: 'Small dent on lid, keyboard marks on screen',
            fail: 'External display connection issues',
            user: 3,
            client: 9,
        },
        {
            serial: 'IPH15PM1TB0',
            description: 'iPhone 15 Pro Max 1TB Blue',
            coverage: 'AppleCare+',
            vmi: 'Minor scratches around charging port',
            fail: 'Overheating during charging',
            user: 1,
            client: 10,
        },
        {
            serial: 'IPDP12M128G',
            description: 'iPad Pro 12.9" M2 128GB',
            coverage: 'Limited Warranty',
            vmi: 'Apple Pencil marks on screen protector',
            fail: 'Random restarts, Apple Pencil not pairing',
            user: 2,
            client: 11,
        },
        {
            serial: 'AWSE9GPS45M',
            description: 'Apple Watch SE 2nd Gen 45mm',
            coverage: 'Out of Warranty',
            vmi: 'Heavy wear on digital crown',
            fail: 'Heart rate sensor malfunction',
            user: 3,
            client: 12,
        },
        {
            serial: 'MBA15M2512',
            description: 'MacBook Air 15" M2 512GB',
            coverage: 'AppleCare+',
            vmi: 'Pristine condition',
            fail: 'Keyboard certain keys not responding',
            user: 1,
            client: 13,
        },
        {
            serial: 'IPH14P256GB',
            description: 'iPhone 14 Plus 256GB Purple',
            coverage: 'Limited Warranty',
            vmi: 'Back glass cracked, front perfect',
            fail: 'Microphone not working during calls',
            user: 2,
            client: 14,
        },
        {
            serial: 'IPDAIR5256G',
            description: 'iPad Air 5th Gen 256GB Pink',
            coverage: 'AppleCare+',
            vmi: 'Minor scratches on back',
            fail: 'Display showing yellow tint',
            user: 3,
            client: 15,
        },
        {
            serial: 'AWULTRA2TI',
            description: 'Apple Watch Ultra 2 Titanium',
            coverage: 'Limited Warranty',
            vmi: 'Scratches on display',
            fail: 'Action button stuck',
            user: 1,
            client: 16,
        },
        {
            serial: 'MBP14M2PRO',
            description: 'MacBook Pro 14" M2 Pro 512GB',
            coverage: 'Out of Warranty',
            vmi: 'Dents on corners, scratched bottom',
            fail: 'Fan making loud noise',
            user: 2,
            client: 17,
        },
        {
            serial: 'IPH15128GB',
            description: 'iPhone 15 128GB Pink',
            coverage: 'AppleCare+',
            vmi: 'Like new condition',
            fail: 'Speaker distorted at high volume',
            user: 3,
            client: 18,
        },
        {
            serial: 'IPDM664WIFI',
            description: 'iPad Mini 6 64GB Wi-Fi',
            coverage: 'Limited Warranty',
            vmi: 'Heavy usage signs',
            fail: 'Not detecting Apple Pencil',
            user: 1,
            client: 19,
        },
        {
            serial: 'AWS9SS41MM',
            description: 'Apple Watch Series 9 41mm',
            coverage: 'AppleCare+',
            vmi: 'Scratched steel case',
            fail: 'Digital Crown not rotating smoothly',
            user: 2,
            client: 20,
        }
    ]
}