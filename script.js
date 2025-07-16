// script.js
const translations = {
  en: {
    title: "KaamKhoj",
    tagline: "Connecting skilled workers with local job opportunities",
    "register-title": "Worker Registration",
    "name-label": "Full Name",
    "name-placeholder": "e.g. Rajesh Kumar",
    "skills-label": "Your Skills",
    "skills-placeholder": "e.g. Electrician, Plumber, Painter",
    "city-label": "Your Location",
    "city-placeholder": "e.g. Mumbai, Delhi, Bangalore",
    "contact-label": "Contact Number",
    "contact-placeholder": "e.g. 9876543210",
    "info-label": "Additional Information",
    "info-placeholder": "e.g. Available Monday-Friday, 5 years experience",
    "register-btn": "Register as Worker",
    "post-title": "Post a Job Opportunity",
    "employer-label": "Your Company/Name",
    "employer-placeholder": "e.g. Sharma Construction",
    "jobtype-label": "Job Type Needed",
    "jobtype-placeholder": "e.g. Mason, Carpenter, Driver",
    "jobcity-label": "Job Location",
    "jobcity-placeholder": "e.g. Sector 12, Gurgaon",
    "pay-label": "Payment Offered",
    "pay-placeholder": "e.g. ₹800/day or ₹20,000/month",
    "jobdesc-label": "Job Description",
    "jobdesc-placeholder": "e.g. Need experienced mason for 15-day project",
    "post-btn": "Post Job Opportunity"
  },
  hi: {
    title: "कामखोज",
    tagline: "कुशल कामगारों को स्थानीय नौकरियों से जोड़ना",
    "register-title": "कर्मचारी पंजीकरण",
    "name-label": "पूरा नाम",
    "name-placeholder": "जैसे राजेश कुमार",
    "skills-label": "आपके कौशल",
    "skills-placeholder": "जैसे इलेक्ट्रीशियन, प्लंबर, पेंटर",
    "city-label": "आपका स्थान",
    "city-placeholder": "जैसे मुंबई, दिल्ली, बैंगलोर",
    "contact-label": "संपर्क नंबर",
    "contact-placeholder": "जैसे 9876543210",
    "info-label": "अतिरिक्त जानकारी",
    "info-placeholder": "जैसे सोमवार-शुक्रवार उपलब्ध, 5 साल का अनुभव",
    "register-btn": "कर्मचारी के रूप में पंजीकृत करें",
    "post-title": "नौकरी का अवसर पोस्ट करें",
    "employer-label": "आपकी कंपनी/नाम",
    "employer-placeholder": "जैसे शर्मा कंस्ट्रक्शन",
    "jobtype-label": "आवश्यक नौकरी प्रकार",
    "jobtype-placeholder": "जैसे राजमिस्त्री, बढ़ई, ड्राइवर",
    "jobcity-label": "नौकरी का स्थान",
    "jobcity-placeholder": "जैसे सेक्टर 12, गुड़गांव",
    "pay-label": "भुगतान प्रस्ताव",
    "pay-placeholder": "जैसे ₹800/दिन या ₹20,000/माह",
    "jobdesc-label": "नौकरी विवरण",
    "jobdesc-placeholder": "जैसे 15-दिवसीय परियोजना के लिए अनुभवी राजमिस्त्री चाहिए",
    "post-btn": "नौकरी का अवसर पोस्ट करें"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang;
  Object.keys(translations[lang]).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
}

// Initialize with English
setLanguage('en');

// Form Submissions
document.getElementById("register-btn").addEventListener("click", async () => {
  const data = {
    name: document.getElementById("name").value,
    skills: document.getElementById("skills").value,
    city: document.getElementById("city").value,
    contact: document.getElementById("contact").value,
    info: document.getElementById("info").value
  };

  try {
    const res = await fetch("http://localhost:8000/register-worker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    showRecommendations(result, 'worker');
  } catch (error) {
    alert("Error: " + error);
  }
});

document.getElementById("post-btn").addEventListener("click", async () => {
  const data = {
    employer: document.getElementById("employer").value,
    job_type: document.getElementById("jobtype").value,
    city: document.getElementById("jobcity").value,
    pay: document.getElementById("pay").value,
    description: document.getElementById("jobdesc").value
  };

  try {
    const res = await fetch("http://localhost:8000/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    const result = await res.json();
    showRecommendations(result, 'job');
  } catch (error) {
    alert("Error: " + error);
  }
});

function showRecommendations(result, type) {
  const container = document.getElementById(`${type}-recommendations`);
  container.style.display = "block";
  
  if (type === 'worker') {
    container.innerHTML = `
      <h3>${document.documentElement.lang === 'hi' ? 'सफलतापूर्वक पंजीकृत!' : 'Successfully Registered!'}</h3>
      <p>${document.documentElement.lang === 'hi' ? 'आपके कौशल से मेल खाने वाली नौकरियाँ:' : 'Jobs matching your skills:'}</p>
      <div class="job-card">
        <p><span class="highlight">${document.documentElement.lang === 'hi' ? 'निर्माण सहायक' : 'Construction Helper'}</span> - ₹600/day</p>
      </div>
    `;
  } else {
    container.innerHTML = `
      <h3>${document.documentElement.lang === 'hi' ? 'नौकरी सफलतापूर्वक पोस्ट की गई!' : 'Job Posted Successfully!'}</h3>
      <p>${document.documentElement.lang === 'hi' ? 'आपकी नौकरी के लिए अनुशंसित कर्मचारी:' : 'Recommended workers:'}</p>
      <div class="worker-card">
        <p><span class="highlight">${document.documentElement.lang === 'hi' ? 'रमेश पटेल' : 'Ramesh Patel'}</span> - ${document.documentElement.lang === 'hi' ? 'बढ़ई' : 'Carpenter'}</p>
      </div>
    `;
  }
}