import axios from "axios";
import { constructNow } from "date-fns";

const getWPPages = async (pageId: number = 0) => {
  const searchParam = pageId > 0 ? `${pageId}` : "";
  try {
    const response = await axios.get(
      `${process.env.WP_API_URL}/pages/${searchParam}`
    );
    const pages = response.data;
    // const data = await Promise.all(
    //   pages.map(async (page: any) => {
    //     const result = await axios.get(page.link);
    //     console.log('doc.headBody');
    //     console.log(result.data);
    //     return page;
    //   })
    // );
    return pages;
  } catch (error) {
    console.log("Error fetching pages:", error);
    return [];
  }
};
const getWPBlogs = async (per_page: number = 1) => {
  try {
    const response = await axios.get(
      `${process.env.WP_API_URL}/posts?per_page=${per_page}`
    );
    const posts = response.data;
    const data = await Promise.all(
      posts.map(async (post: any) => {
        if (post.featured_media) {
          post.featured_media = await getFeaturedMedia(post.featured_media);
        }
        if (post.author) {
          post.author = await getUser(post.author);
        }
        if (post.categories) {
          post.categories = await getPostCategories(post.categories[0]);
        }
        return post;
      })
    );
    return data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    return [];
  }
};

const getCustomPosts = async (postType: string) => {
  try {
    const response = await axios.get(`${process.env.WP_API_URL}/${postType}`);
    const posts = response.data;
    const data = await Promise.all(
      posts.map(async (post: any) => {
        if (post.featured_media) {
          post.featured_media = await getFeaturedMedia(post.featured_media);
        }
        if (post.author) {
          post.author = await getUser(post.author);
        }
        if (post.categories) {
          post.categories = await getPostCategories(post.categories[0]);
        }
        return post;
      })
    );
    return data;
  } catch (error) {
    console.log("Error fetching posts:", error);
    return [];
  }
};

const getFeaturedMedia = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.WP_API_URL}/media/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching media:", error);
    return null;
  }
};
const getSinglePost = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.WP_API_URL}/posts/${id}`);
    const post = response.data;
    if (post.featured_media) {
      post.featured_media = await getFeaturedMedia(post.featured_media);
    }
    if (post.author) {
      post.author = await getUser(post.author);
    }
    if (post.categories) {
      post.categories = await getPostCategories(post.categories[0]);
    }
    return post;
  } catch (error) {
    console.log("Error fetching post:", error);
    return null;
  }
};

const getUser = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.WP_API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
};
const getPostCategories = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.WP_API_URL}/categories/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching category:", error);
    return null;
  }
};
export {
  getWPBlogs,
  getFeaturedMedia,
  getSinglePost,
  getUser,
  getPostCategories,
  getCustomPosts,
  getWPPages,
};


/*

  const WORDPRESS_URL = "https://wp.gamcatoken.online/wp-json/wp/v2/posts";
  const USERNAME = "admin";
  const APP_PASSWORD = ""; // Your application password

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
 */