const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  }

  // User registration
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  // User login
  async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await fetch(`${this.baseURL}/me`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  // Update current user profile
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${this.baseURL}/me`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Health check error:", error);
      throw error;
    }
  }

  // Get dashboard data based on role
  async getDashboard(role) {
    try {
      let endpoint = "/dashboard";

      switch (role) {
        case "official":
          endpoint = "/official/dashboard";
          break;
        case "organizer":
          endpoint = "/organizer/dashboard";
          break;
        case "admin":
          endpoint = "/admin";
          break;
        default:
          endpoint = "/dashboard";
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get dashboard error:", error);
      throw error;
    }
  }

  // Get booking management (officials and organizers)
  async getBookingManagement() {
    try {
      const response = await fetch(`${this.baseURL}/booking`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get booking management error:", error);
      throw error;
    }
  }

  // Get management panel (organizers and admins)
  async getManagementPanel() {
    try {
      const response = await fetch(`${this.baseURL}/management`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get management panel error:", error);
      throw error;
    }
  }

  // Fetch all officials (admin only)
  async getOfficials() {
    try {
      const response = await fetch(`${this.baseURL}/admin/officials`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get officials error:", error);
      throw error;
    }
  }

  // Fetch all pending officials (admin only)
  async getPendingOfficials() {
    try {
      const response = await fetch(`${this.baseURL}/admin/officials/pending`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get pending officials error:", error);
      throw error;
    }
  }

  // Approve an official (admin only)
  async approveOfficial(id) {
    try {
      const response = await fetch(
        `${this.baseURL}/admin/officials/${id}/approve`,
        {
          method: "PATCH",
          headers: this.getAuthHeaders(),
        }
      );
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Approve official error:", error);
      throw error;
    }
  }

  // Decline an official (admin only)
  async declineOfficial(id) {
    try {
      const response = await fetch(
        `${this.baseURL}/admin/officials/${id}/decline`,
        {
          method: "PATCH",
          headers: this.getAuthHeaders(),
        }
      );
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Decline official error:", error);
      throw error;
    }
  }

  // Get official's availability
  async getAvailability(officialId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${this.baseURL}/availability/${officialId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch availability");
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Add new availability
  async addAvailability(data) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${this.baseURL}/availability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to add availability");
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Delete availability for an official
  async deleteAvailability(officialId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${this.baseURL}/availability/${officialId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete availability");
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Get received bookings (for officials)
  async getReceivedBookings() {
    try {
      const response = await fetch(`${this.baseURL}/booking/received`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get received bookings error:", error);
      throw error;
    }
  }

  // Get sent bookings (for organizers)
  async getSentBookings() {
    try {
      const response = await fetch(`${this.baseURL}/booking/sent`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get sent bookings error:", error);
      throw error;
    }
  }

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    try {
      const response = await fetch(`${this.baseURL}/booking/${bookingId}`, {
        method: "PATCH",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Update booking status error:", error);
      throw error;
    }
  }

  // Update booking details
  async updateBookingDetails(bookingId, updateData) {
    try {
      const response = await fetch(`${this.baseURL}/booking/${bookingId}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updateData),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Update booking details error:", error);
      throw error;
    }
  }

  // Create booking request
  async createBookingRequest(data) {
    try {
      const response = await fetch(`${this.baseURL}/booking`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Create booking error:", error);
      throw error;
    }
  }

  // Get all officials (for organizers)
  async getAllOfficials() {
    try {
      const response = await fetch(`${this.baseURL}/officials`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get all officials error:", error);
      throw error;
    }
  }

  // Get reviews for a specific official
  async getReviewsForOfficial(officialId) {
    try {
      const response = await fetch(`${this.baseURL}/reviews/official/${officialId}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get official reviews error:", error);
      throw error;
    }
  }

  // Create a review for an official
  async createReview(reviewData) {
    try {
      const response = await fetch(`${this.baseURL}/reviews`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Create review error:", error);
      throw error;
    }
  }

  // Get all reviews (admin only)
  async getAllReviews() {
    try {
      const response = await fetch(`${this.baseURL}/reviews`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get all reviews error:", error);
      throw error;
    }
  }

  // Delete a review (admin only)
  async deleteReview(reviewId) {
    try {
      const response = await fetch(`${this.baseURL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Delete review error:", error);
      throw error;
    }
  }

  // Get chat history with a specific user
  async getChatHistory(userId) {
    try {
      const response = await fetch(`${this.baseURL}/chat/${userId}`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Get chat history error:", error);
      throw error;
    }
  }

  // Send a chat message
  async sendMessage(receiverId, text) {
    try {
      const response = await fetch(`${this.baseURL}/chat/send`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ receiverId, text }),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  }

  // Store token in localStorage
  setToken(token) {
    localStorage.setItem("token", token);
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem("token");
  }

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem("token");
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Upload profile photo (sends base64 string)
  async uploadProfilePhoto(base64String) {
    try {
      const response = await fetch(`${this.baseURL}/me`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ profilePhoto: base64String }),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Upload profile photo error:", error);
      throw error;
    }
  }

  // Remove profile photo
  async removeProfilePhoto() {
    try {
      const response = await fetch(`${this.baseURL}/me`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ profilePhoto: null }),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Remove profile photo error:", error);
      throw error;
    }
  }

  // Logout user
  logout() {
    this.removeToken();
    // Redirect to login page
    window.location.href = "/Login";
  }
}

export default new ApiService();
