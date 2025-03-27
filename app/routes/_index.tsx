import type { MetaFunction } from "@remix-run/node";
import axios from "axios";
import { Company, GCCountries, PakCities } from "Constant";
import Home from "~/components/website/home";
import RootLayout from "./_layout";

export const meta: MetaFunction = () => {
  return [
    { title: Company.name },
    { name: "description", content: "Welcome to Gamca Token!" },
    {
      name: "keywords",
      content:
        "#wafidmedicalpakistan #wafidmedicalsliponline #gamcamedicalpakistan #wafid #gamcapakistan #wafidpakistan #dubaimedical #gamcamedical #gamcaappointment #wafidappointment #wafidmedical #saudiarabia🇸🇦 #gamcaislamabad #gamcamedicalappointment #gamcamedicalonline #Gamcalahore #gamcapeshawar #gamcamedicalcheck #gamcagujranwala #gamcakarachi #gamcamultan #gamcarawalpindi #Gamcamedicalstatus #GamcaMedicalfeesforsaudiarabia #GamcaMedicalfeesforuae #GamcaMedicalfeesforoman #saudiarabia #گیمکا #Gamca #gamcamedicalreport #omanmedical #muscatmedical #bahrainmedical #sudiamedical #kuwaitmedical #qatarmedical @gamcapakistanfee #gamcaappointment #wafidappointment #wafidreportchek #wafidonlinereport #wafidmedicalappointment #wafidpakistan",
    },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "google", content: "notranslate" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "Muhammad Saleem" },
    { name: "rating", content: "general" },
    { name: "distribution", content: "global" },
    { name: "revisit-after", content: "7 days" },
    { name: "language", content: "EN" },
    { name: "reply-to", content: Company.email },
    { name: "geo.placename", content: Company.address },
  ];
};

// export const loader: LoaderFunction = async ({ request }) => {
//   const blogs = await getWPBlogs(5);
//   const countries = await getCustomPosts(5, "countries");
//   const medicalcenters = await getCustomPosts(5, "medicalcenters");
//   //console.log("Index.countries", countries);
//   const obj = { blogs, countries, medicalcenters };
//   return new Response(JSON.stringify(obj), { status: 200 });
// };

export default function Index() {

  const WORDPRESS_URL = "https://wp.gamcatoken.online/wp-json/wp/v2/posts";
  const USERNAME = "admin";
  const APP_PASSWORD = "weV0 2iQF UAgk wN66 xqSN cctD"; // Your application password

  const fetchPosts = async () => {
    try {
      const response = await axios.get(WORDPRESS_URL, {
        headers: {
          Authorization: `Basic ${btoa(`${USERNAME}:${APP_PASSWORD}`)}`,
        },
      });
      console.log("Posts:", response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Call the function
  //fetchPosts();

  const createPost = async () => {
    try {
      const postData = {
        title: "My New Post",
        content: "This is the content of the post.",
        status: "publish",
      };

      const response = await axios.post(WORDPRESS_URL, postData, {
        headers: {
          Authorization: `Basic ${btoa(`${USERNAME}:${APP_PASSWORD}`)}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Post Created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const createAppointments = async () => {
    const randomEmail = Math.random().toString(36).substring(7);
    const randomPhone = Math.floor(Math.random() * 10000000000);
    const randomName = Math.random().toString(36).substring(7);
    const randomCountry =
      GCCountries[Math.floor(Math.random() * GCCountries.length)];
    const randomCity = PakCities[Math.floor(Math.random() * PakCities.length)];
    const randomTravelCountry =
      GCCountries[Math.floor(Math.random() * GCCountries.length)];

    try {
      const appointmentData = {
        country: randomCountry,
        city: randomCity,
        country_travelling_to: randomTravelCountry,
        first_name: randomEmail + "John",
        last_name: randomEmail + "Doe",
        date_of_birth: "1990-05-15",
        nationality: "American",
        gender: "Male",
        marital_status: "Married",
        passport_number: "A12345678",
        passport_issue_date: "2015-06-20",
        passport_expiry_date: "2025-06-20",
        passport_issue_place: "New York",
        visa_type: "Family Visa",
        email: randomEmail + "kashif@example.com",
        phone: randomPhone,
        national_id: "123456789",
        position_applied_for: "Software Engineer",
        other_position: "Backend Developer",
        information_accurate: true,
        payment_method: "Credit Card",
        trx_id: "TXN123456",
        payment_screenshot: "https://example.com/screenshot.jpg",
      };

      const APPOINTMENT_URL =
        "https://wp.gamcatoken.online/wp-json/wp-appointment/v1/book/";
      const response = await axios.post(APPOINTMENT_URL, appointmentData, {
        headers: {
          Authorization: `Basic ${btoa(`${USERNAME}:${APP_PASSWORD}`)}`,
          "Content-Type": "application/json",
        },
      });

      console.log("APPOINTMENT Created:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  // Call the function
  //createAppointments();
  return (
    <RootLayout>
      <Home />
    </RootLayout>
  );
}
