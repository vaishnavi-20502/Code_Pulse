const axios = require("axios");

const getLeetCodeData = async (username) => {
  const query = {
    query: `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }`,
    variables: { username }
  };

  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      query
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching LeetCode data:", error.message);
    throw error;
  }
};

module.exports = getLeetCodeData;