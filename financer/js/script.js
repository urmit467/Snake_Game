// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      toggleBtn.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
      toggleBtn.style.left = sidebar.classList.contains('active') ? '260px' : '10px';
    });

    document.addEventListener('click', function (e) {
      if (sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
        sidebar.classList.remove('active');
        toggleBtn.textContent = '☰';
        toggleBtn.style.left = '10px';
      }
    });
  });

  // Finance Calculator
  const calculateBtn = document.getElementById('calculateBtn');
  const monthlyIncomeInput = document.getElementById('monthlyIncome');
  const investmentEl = document.getElementById('investment');
  const savingsEl = document.getElementById('savings');
  const expensesEl = document.getElementById('expenses');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const chartContainer = document.getElementById('chartContainer');

  // Initialize Chart.js
  const ctx = document.getElementById('financeChart').getContext('2d');
  let financeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Investment', 'Savings', 'Expenses'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: ['#00d4d4', '#02a3a3', '#045454'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#e0e0e0' }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const rawValue = context.raw.toFixed(2);
              const percentage = ((context.raw / total) * 100).toFixed(0);
              return `${context.label}: ₹${rawValue} (${percentage}%)`;
            }
          }
        }
      }
    }
  });

  calculateBtn.addEventListener('click', function () {
    const monthlyIncome = parseFloat(monthlyIncomeInput.value);
    if (isNaN(monthlyIncome)) {
      alert('Please enter a valid number');
      return;
    }
    const investment = monthlyIncome * 0.3;
    const savings = monthlyIncome * 0.2;
    const expenses = monthlyIncome * 0.5;
    investmentEl.textContent = '₹' + investment.toFixed(2);
    savingsEl.textContent = '₹' + savings.toFixed(2);
    expensesEl.textContent = '₹' + expenses.toFixed(2);
    financeChart.data.datasets[0].data = [investment, savings, expenses];
    financeChart.update();
    welcomeMessage.style.display = 'none';
    chartContainer.style.display = 'flex';
  });

  // News Section Functionality
  let newsArray = [];
  const newsUrl = 'https://saurav.tech/NewsAPI/top-headlines/category/business/in.json';

  async function fetchNews() {
    try {
      const response = await fetch(newsUrl);
      const result = await response.json();
      newsArray = result.articles.slice(0, 8);
      displayNews(0);
    } catch (error) {
      console.error(error);
    }
  }

  let startIndex = 0;
  function displayNews(start) {
    const container = document.getElementById('news-card');
    container.innerHTML = '';
    for (let i = start; i < start + 4 && i < newsArray.length; i++) {
      const article = newsArray[i];
      const card = document.createElement('div');
      card.className = 'news-holder';

      const img = document.createElement('img');
      img.src = article.urlToImage || 'fallback.jpg';

      const title = document.createElement('h3');
      title.textContent = article.title;

      const desc = document.createElement('p');
      desc.textContent = article.description || 'No description available.';

      const author = document.createElement('p');
      author.textContent = `Author: ${article.author || 'Unknown'}`;

      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = 'Read more';
      link.target = '_blank';
      link.className = 'news-link';

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(author);
      card.appendChild(link);

      container.appendChild(card);
    }
  }

  function scrollNews() {
    startIndex = (startIndex + 4) % 8;
    displayNews(startIndex);
  }
  fetchNews();

  // Contact Form & Comments Functionality
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const commentsList = document.getElementById("commentsList");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (name && message) {
      const commentBox = document.createElement("div");
      commentBox.style.backgroundColor = "#2a2a2a";
      commentBox.style.padding = "10px";
      commentBox.style.borderRadius = "6px";
      commentBox.innerHTML = `<strong style="color:#00d4d4;">${name}</strong><br><span style="color:#ccc;">${message}</span>`;
      commentsList.prepend(commentBox);
      contactForm.reset();
    }
  });