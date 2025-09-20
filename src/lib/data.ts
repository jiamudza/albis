export type Teacher = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subjects: string[];
    bio?: string;
    avatarUrl?: string;
    hireDate: string; // ISO date string
    isActive: boolean;
    rating?: number; // 0-5
    classes?: string[]; // course codes or class names
}

export type Student = {
    id: string;
    nis: string;
    nama: string;
    telepon: string;
    email?: string;
    alamat: string;
    avatar: string;
}

export const role: string = "admin"

export const studentsList = [
  {
    "id": "1",
    "nis": "2025001",
    "nama": "Ahmad Fauzi",
    "telepon": "081234567801",
    "email": "ahmad.fauzi@example.com",
    "avatar": "https://avatar.iran.liara.run/public/1",
    "alamat": "Jl. Merpati No. 12, Jakarta"
  },
  {
    "id": "2",
    "nis": "2025002",
    "nama": "Siti Rahma",
    "telepon": "081234567802",
    "email": "siti.rahma@example.com",
    "avatar": "https://avatar.iran.liara.run/public/2",
    "alamat": "Jl. Anggrek No. 8, Bandung"
  },
  {
    "id": "3",
    "nis": "2025003",
    "nama": "Budi Santoso",
    "telepon": "081234567803",
    "email": "budi.santoso@example.com",
    "avatar": "https://avatar.iran.liara.run/public/3",
    "alamat": "Jl. Kenanga No. 25, Surabaya"
  },
  {
    "id": "4",
    "nis": "2025004",
    "nama": "Dewi Lestari",
    "telepon": "081234567804",
    "email": "dewi.lestari@example.com",
    "avatar": "https://avatar.iran.liara.run/public/4",
    "alamat": "Jl. Melati No. 5, Yogyakarta"
  },
  {
    "id": "5",
    "nis": "2025005",
    "nama": "Fajar Pratama",
    "telepon": "081234567805",
    "email": "fajar.pratama@example.com",
    "avatar": "https://avatar.iran.liara.run/public/5",
    "alamat": "Jl. Mawar No. 17, Semarang"
  },
  {
    "id": "6",
    "nis": "2025006",
    "nama": "Nadia Safira",
    "telepon": "081234567806",
    "email": "nadia.safira@example.com",
    "avatar": "https://avatar.iran.liara.run/public/6",
    "alamat": "Jl. Cemara No. 9, Medan"
  },
  {
    "id": "7",
    "nis": "2025007",
    "nama": "Rizky Maulana",
    "telepon": "081234567807",
    "email": "rizky.maulana@example.com",
    "avatar": "https://avatar.iran.liara.run/public/7",
    "alamat": "Jl. Dahlia No. 14, Palembang"
  },
  {
    "id": "8",
    "nis": "2025008",
    "nama": "Intan Permata",
    "telepon": "081234567808",
    "email": "intan.permata@example.com",
    "avatar": "https://avatar.iran.liara.run/public/8",
    "alamat": "Jl. Flamboyan No. 3, Malang"
  },
  {
    "id": "9",
    "nis": "2025009",
    "nama": "Bayu Saputra",
    "telepon": "081234567809",
    "email": "bayu.saputra@example.com",
    "avatar": "https://avatar.iran.liara.run/public/9",
    "alamat": "Jl. Nusa Indah No. 11, Makassar"
  },
  {
    "id": "10",
    "nis": "2025010",
    "nama": "Laila Amalia",
    "telepon": "081234567810",
    "email": "laila.amalia@example.com",
    "avatar": "https://avatar.iran.liara.run/public/10",
    "alamat": "Jl. Cendana No. 6, Bali"
  }
]

export const teachers = [
  {
    "id": "tch-001",
    "firstName": "Aisyah",
    "lastName": "Rahma",
    "email": "aisyah.rahmawati@example.id",
    "phone": "+62-812-3456-7801",
    "subjects": ["Matematika", "Statistika"],
    "bio": "Guru matematika berpengalaman dengan fokus pada pemecahan masalah dan literasi numerasi.",
    "avatarUrl": "https://avatar.iran.liara.run/public/10",
    "hireDate": "2016-08-15",
    "isActive": true,
    "rating": 4.7,
    "classes": ["MAT101", "STAT201"]
  },
  {
    "id": "tch-002",
    "firstName": "Budi",
    "lastName": "Santoso",
    "email": "budi.santoso@example.id",
    "phone": "+62-812-3456-7802",
    "subjects": ["Bahasa Indonesia", "Sastra"],
    "bio": "Mengajar bahasa dan sastra Indonesia dengan pendekatan kreatif.",
    "avatarUrl": "https://avatar.iran.liara.run/public/20",
    "hireDate": "2018-02-10",
    "isActive": true,
    "rating": 4.5,
    "classes": ["IND101", "SAS201"]
  },
  {
    "id": "tch-003",
    "firstName": "Citra",
    "lastName": "Permata",
    "email": "citra.permata@example.id",
    "phone": "+62-812-3456-7803",
    "subjects": ["Biologi", "IPA"],
    "bio": "Guru biologi yang fokus pada eksperimen laboratorium dan pembelajaran berbasis proyek.",
    "avatarUrl": "https://avatar.iran.liara.run/public/30",
    "hireDate": "2017-05-20",
    "isActive": true,
    "rating": 4.6,
    "classes": ["BIO101", "IPA201"]
  },
  {
    "id": "tch-004",
    "firstName": "Dedi",
    "lastName": "Saputra",
    "email": "dedi.saputra@example.id",
    "phone": "+62-812-3456-7804",
    "subjects": ["Pendidikan Jasmani", "Kesehatan"],
    "bio": "Berpengalaman membina siswa dalam olahraga dan gaya hidup sehat.",
    "avatarUrl": "https://avatar.iran.liara.run/public/40",
    "hireDate": "2015-01-05",
    "isActive": true,
    "rating": 4.4,
    "classes": ["PJK101", "KES201"]
  },
  {
    "id": "tch-005",
    "firstName": "Eka",
    "lastName": "Wijaya",
    "email": "eka.wijaya@example.id",
    "phone": "+62-812-3456-7805",
    "subjects": ["Fisika", "Astronomi"],
    "bio": "Mengajar fisika dengan pendekatan praktis dan pengenalan astronomi.",
    "avatarUrl": "https://avatar.iran.liara.run/public/45",
    "hireDate": "2019-09-12",
    "isActive": true,
    "rating": 4.8,
    "classes": ["FIS101", "AST201"]
  },
  {
    "id": "tch-006",
    "firstName": "Farah",
    "lastName": "Amalia",
    "email": "farah.amalia@example.id",
    "phone": "+62-812-3456-7806",
    "subjects": ["Kimia", "IPA"],
    "bio": "Guru kimia yang mengutamakan eksperimen dan pemahaman konsep dasar.",
    "avatarUrl": "https://avatar.iran.liara.run/public/47",
    "hireDate": "2020-07-01",
    "isActive": true,
    "rating": 4.3,
    "classes": ["KIM101", "IPA202"]
  },
  {
    "id": "tch-007",
    "firstName": "Galih",
    "lastName": "Pratama",
    "email": "galih.pratama@example.id",
    "phone": "+62-812-3456-7807",
    "subjects": ["Sejarah", "Sosiologi"],
    "bio": "Mengajarkan sejarah nasional dan ilmu sosial dengan diskusi interaktif.",
    "avatarUrl": "https://avatar.iran.liara.run/public/49",
    "hireDate": "2014-11-18",
    "isActive": true,
    "rating": 4.6,
    "classes": ["SEJ101", "SOS201"]
  },
  {
    "id": "tch-008",
    "firstName": "Hani",
    "lastName": "Fitriani",
    "email": "hani.fitriani@example.id",
    "phone": "+62-812-3456-7808",
    "subjects": ["Ekonomi", "Kewirausahaan"],
    "bio": "Berpengalaman mengajarkan ekonomi makro dan mikro serta keterampilan bisnis.",
    "avatarUrl": "https://avatar.iran.liara.run/public/50",
    "hireDate": "2013-04-22",
    "isActive": true,
    "rating": 4.9,
    "classes": ["EKO101", "KWU201"]
  },
  {
    "id": "tch-009",
    "firstName": "Irfan",
    "lastName": "Maulana",
    "email": "irfan.maulana@example.id",
    "phone": "+62-812-3456-7809",
    "subjects": ["Teknologi Informasi", "Pemrograman"],
    "bio": "Fokus pada pengajaran dasar-dasar TIK dan pengembangan perangkat lunak.",
    "avatarUrl": "https://avatar.iran.liara.run/public/52",
    "hireDate": "2021-03-30",
    "isActive": true,
    "rating": 4.5,
    "classes": ["TIK101", "PRO201"]
  },
  {
    "id": "tch-010",
    "firstName": "Jannah",
    "lastName": "Azizah",
    "email": "jannah.azizah@example.id",
    "phone": "+62-812-3456-7810",
    "subjects": ["Pendidikan Agama Islam", "Akhlak"],
    "bio": "Mengajar agama Islam dengan pendekatan akhlak mulia dan pembiasaan ibadah.",
    "avatarUrl": "https://avatar.iran.liara.run/public/53",
    "hireDate": "2012-12-10",
    "isActive": true,
    "rating": 4.8,
    "classes": ["PAI101", "AKH201"]
  }
]


export default teachers;