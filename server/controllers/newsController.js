import dotenv from 'dotenv';
import NewsAPI from 'newsapi';

dotenv.config(); 

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

export const getNews = async (req, res) => {
  const { categories } = req.query;
  try {
    const response = await newsapi.v2.topHeadlines({
      category: categories || 'general',
      language: 'en',
      country: 'us',
      pageSize: 12,
    });
    if (response.status === 'ok') {
      const articles = response.articles.map((a) => ({
        title: a.title,
        description: a.description,
        image: a.urlToImage,
        url: a.url,
        source: a.source,
      }));
      res.status(200).json({ data: articles });
    } else {
      res.status(500).json({ message: 'Failed to fetch news from NewsAPI' });
    }
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};
