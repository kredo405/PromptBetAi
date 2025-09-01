import axios from "axios";

class ApiService {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });
  }

  // Статус upcoming - не начались
  // Статус ended - Закончились

  // Метод для получения списка матчей
  async getMatchesPrematch(params) {
    try {
      const response = await this.client.get(
        "stavkatv/matches/",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }

  async getLastMatches(params) {
    try {
      const response = await this.client.get(
        "stavkatv/last-matches/",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }

  async getStatistics(params) {
    try {
      const response = await this.client.get(
        "stavkatv/statistics/",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }

  async getPreview(params) {
    try {
      const response = await this.client.get(
        "stavkatv/preview/",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }

  async getBestPredicts(params) {
    try {
      const response = await this.client.get(
        "stavkatv/popular-bets/",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }

  async getPredictions(params) {
    try {
      const response = await this.client.get(
        "stavkatv/predictions/",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }

  async getStatisticsAverage(params) {
    try {
      const response = await this.client.get(
        "stavkatv/average-statistics/",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }

  async getOdds(params) {
    try {
      const response = await this.client.get("stavkatv/odds/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error; // Пробрасываем ошибку для обработки в try...catch
    }
  }
}
// Создание экземпляра класса
const apiService = new ApiService("https://kredo-bet-api.vercel.app/");

export default apiService;
