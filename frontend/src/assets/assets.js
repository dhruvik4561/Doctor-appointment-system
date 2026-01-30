import appointment_img from './appointment_img.png'
import header_img from './header_img1.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './LOGO.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './Doct1.png'
import doc2 from './doct2.png'
import doc3 from './doct3.png'
import doc4 from './doct4.png'
import doc5 from './doct5.png'
import doc6 from './doct6.png'
import doc7 from './doct7.png'
import doc8 from './doct8.png'
import doc9 from './doct9.png'
import doc10 from './doct10.png'
import doc11 from './doct11.png'
import doc12 from './doct12.png'
import doc13 from './doct13.png'
import doc14 from './doct14.png'
import doc15 from './doct15.png'
import doc16 from './doct16.png'
import doc17 from './doct17.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import stethoscope from './stethoscope.png'
import stethoscope1 from './stethoscope-solid.svg'
import Gynecologist1  from './person-pregnant-solid.svg'
import skincare from './dermatology1.png'
import dermatology1 from './dermatology1.png'
import pediatricians1 from './pediatrician1.png'
import neurology1 from './neurologist1.png'
import gastroenterologist1 from './gastroenterologist1.png'
import clipboard_icon from './clipboard-pen-line.png'
import capsule_icon from './capsules-solid.svg'
import appointment_icon from './appointment_icon.svg'
import login_back from './login_back.jpg'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    stethoscope,
    stethoscope1,
    Gynecologist1,
    skincare,
    dermatology1,
    pediatricians1,
    neurology1,
    gastroenterologist1,
    clipboard_icon,
    capsule_icon,
    appointment_icon,
    login_back
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rajesh Sharma',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rajesh sharma has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Neha Patel',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. neha patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. she has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. sarah patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Priya Desai',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. priya patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. she has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Hiren Chaudhary',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. hiren  has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Vishal Dave',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. vishal dave has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Chetan Solanki',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. chetan solanki has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Pooja Vyas',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. pooja vyas has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. she has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Priya Desai',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. priya has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Kunal Shah',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. kunah shah has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. kunal has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Falguni Gohil',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. falguni has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. falguni has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Amit Trivedi',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. amit trivedi has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Snehal Joshi',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. snehal has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Ramesh Makwana',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. ramesh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. ramesh has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Deepak Thakkar',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. deepak has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. deepak has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc16',
        name: 'Dr. Manish Shukla',
        image: doc16,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '10 Years',
        about: 'Dr.manish shukla has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc17',
        name: 'Dr. Sanjay Vaghani',
        image: doc17,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. sanjay Vaghani has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. he has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]