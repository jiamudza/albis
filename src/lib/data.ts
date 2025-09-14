export interface Teacher {
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

export const teachers: Teacher[] = [
    {
        id: "tch-001",
        firstName: "Aisha",
        lastName: "Khan",
        email: "aisha.khan@example.edu",
        phone: "+1-415-555-0101",
        subjects: ["Mathematics", "Statistics"],
        bio: "Experienced math teacher focusing on problem solving and data literacy.",
        avatarUrl: "https://example.com/avatars/aisha-khan.png",
        hireDate: "2016-08-15",
        isActive: true,
        rating: 4.7,
        classes: ["ALG101", "STAT201"]
    },
    {
        id: "tch-002",
        firstName: "Daniel",
        lastName: "Park",
        email: "daniel.park@example.edu",
        phone: "+1-212-555-0123",
        subjects: ["Computer Science", "Robotics"],
        bio: "Computer science instructor passionate about teaching algorithms and hands-on robotics.",
        avatarUrl: "https://example.com/avatars/daniel-park.png",
        hireDate: "2018-01-10",
        isActive: true,
        rating: 4.9,
        classes: ["CS101", "ROB202"]
    },
    {
        id: "tch-003",
        firstName: "Marta",
        lastName: "González",
        email: "marta.gonzalez@example.edu",
        phone: "+1-305-555-0188",
        subjects: ["Spanish", "Literature"],
        bio: "Bilingual Spanish teacher who integrates literature and culture into language learning.",
        avatarUrl: "https://example.com/avatars/marta-gonzalez.png",
        hireDate: "2014-09-01",
        isActive: true,
        rating: 4.6,
        classes: ["SPA101", "LIT210"]
    },
    {
        id: "tch-004",
        firstName: "Ethan",
        lastName: "Nguyen",
        email: "ethan.nguyen@example.edu",
        phone: "+1-617-555-0147",
        subjects: ["Physics"],
        bio: "Physics teacher who emphasizes conceptual understanding and laboratory skills.",
        avatarUrl: "https://example.com/avatars/ethan-nguyen.png",
        hireDate: "2012-07-20",
        isActive: true,
        rating: 4.5,
        classes: ["PHY101", "PHY301"]
    },
    {
        id: "tch-005",
        firstName: "Sofia",
        lastName: "Rossi",
        email: "sofia.rossi@example.edu",
        phone: "+1-415-555-0166",
        subjects: ["Art", "Design"],
        bio: "Visual arts teacher focused on creative process, portfolio development, and design thinking.",
        avatarUrl: "https://example.com/avatars/sofia-rossi.png",
        hireDate: "2019-03-05",
        isActive: true,
        rating: 4.4,
        classes: ["ART100", "DES200"]
    },
    {
        id: "tch-006",
        firstName: "Liam",
        lastName: "O'Connor",
        email: "liam.oconnor@example.edu",
        phone: "+1-718-555-0199",
        subjects: ["History", "Civics"],
        bio: "History educator with a focus on modern world history and civic engagement.",
        avatarUrl: "https://example.com/avatars/liam-oconnor.png",
        hireDate: "2010-11-11",
        isActive: false,
        rating: 4.3,
        classes: ["HIS101", "CIV150"]
    },
    {
        id: "tch-007",
        firstName: "Mei",
        lastName: "Chen",
        email: "mei.chen@example.edu",
        phone: "+1-206-555-0133",
        subjects: ["Biology", "Environmental Science"],
        bio: "Biology teacher who leads field studies and sustainability projects.",
        avatarUrl: "https://example.com/avatars/mei-chen.png",
        hireDate: "2017-05-22",
        isActive: true,
        rating: 4.8,
        classes: ["BIO101", "ENV200"]
    },
    {
        id: "tch-008",
        firstName: "Jacob",
        lastName: "Brown",
        email: "jacob.brown@example.edu",
        phone: "+1-312-555-0177",
        subjects: ["Physical Education", "Health"],
        bio: "PE teacher promoting lifelong fitness and healthy habits.",
        avatarUrl: "https://example.com/avatars/jacob-brown.png",
        hireDate: "2015-02-02",
        isActive: true,
        rating: 4.2,
        classes: ["PE100", "HLT101"]
    },
    {
        id: "tch-009",
        firstName: "Nadia",
        lastName: "Petrova",
        email: "nadia.petrova@example.edu",
        phone: "+1-646-555-0155",
        subjects: ["Chemistry"],
        bio: "Chemistry teacher dedicated to safe, inquiry-driven laboratory instruction.",
        avatarUrl: "https://example.com/avatars/nadia-petrova.png",
        hireDate: "2020-09-14",
        isActive: true,
        rating: 4.1,
        classes: ["CHEM101", "CHEM220"]
    },
    {
        id: "tch-010",
        firstName: "Oluwaseun",
        lastName: "Adams",
        email: "seun.adams@example.edu",
        phone: "+1-773-555-0110",
        subjects: ["Music"],
        bio: "Music teacher and conductor specializing in choir and composition.",
        avatarUrl: "https://example.com/avatars/seun-adams.png",
        hireDate: "2013-06-30",
        isActive: true,
        rating: 4.6,
        classes: ["MUS101", "CHOIR200"]
    }
];

export default teachers;