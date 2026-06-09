// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of my personal projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Teaching philosophy and course history across mathematics, statistics, and data science",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-the-k-means-paradox",
        
          title: "The K-Means Paradox",
        
        description: "Why k-means is widely used in production despite its hardest problem being cluster interpretation",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/The-K-Means-Paradox/";
          
        },
      },{id: "post-the-abstraction-pattern",
        
          title: "The Abstraction Pattern",
        
        description: "How AI is following the same pattern of abstraction that defined programming languages",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/The-AI-Engineer-Transition/";
          
        },
      },{id: "post-liouville-39-s-theorem-and-the-extra-dimension",
        
          title: "Liouville&#39;s Theorem and the Extra Dimension",
        
        description: "Why bounded and differentiable doesn&#39;t mean constant on the real line, but does on the complex plane",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/Liouvilles-Theorem/";
          
        },
      },{id: "post-the-feedback-problem-in-machine-learning",
        
          title: "The Feedback Problem in Machine Learning",
        
        description: "When your model shapes the very data it learns from",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/The-Feedback-Problem-in-ML/";
          
        },
      },{id: "post-choosing-the-right-tool",
        
          title: "Choosing the Right Tool",
        
        description: "Tool selection matters more than solution-first thinking",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/Choosing-the-Right-Tool/";
          
        },
      },{id: "post-past-and-present-of-data-science",
        
          title: "Past and Present of Data Science",
        
        description: "History of Data Science Career",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Past-and-Present-of-Data-Science/";
          
        },
      },{id: "post-sharing-my-thoughts-on-data-science-consulting",
        
          title: "Sharing my Thoughts on (Data Science) Consulting",
        
        description: "Miscellaneous thoughts about my job for the past few years",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Thoughts-about-Consulting/";
          
        },
      },{id: "post-how-does-gradient-descent-work",
        
          title: "How does Gradient Descent work?",
        
        description: "Math Behind Gradient Descent",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Gradient-Descent/";
          
        },
      },{id: "post-different-types-of-data-scientist",
        
          title: "Different types of Data Scientist",
        
        description: "Sharing my thoughts on different thoughts of types of Data Scientists",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Types-of-Data-Scientists/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-liar-39-s-dice",
          title: 'Liar&amp;#39;s Dice',
          description: "A Quick Demo for Analyzing Liar&#39;s Dice Game",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2019-04-27-Liars-Dice/";
            },},{id: "projects-r",
          title: 'R²',
          description: "Why you should not use R² for machine learning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2020-07-12-R-Squared/";
            },},{id: "projects-youtube-summarizer",
          title: 'YouTube Summarizer',
          description: "Building a Chrome Extension to Summarize YouTube Videos",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2025-10-21-Youtbe-Summarizer/";
            },},{id: "projects-central-limit-theorem",
          title: 'Central Limit Theorem',
          description: "Interactive simulation demonstrating the Central Limit Theorem",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2025-10-22-Central-Limit-Theorem/";
            },},{id: "projects-visualizing-overfitting-and-regularization",
          title: 'Visualizing Overfitting and Regularization',
          description: "Interactive demo on Overfitting and Regularization",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2025-10-23-Visualizing-Overfitting-and-Regularization/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%6B%32%74%73%61%6E%67@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/tsangcharles", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/tsangcharles", "_blank");
        },
      },{
        id: 'social-wechat_qr',
        title: 'Wechat_qr',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-steam_id',
        title: 'Steam_id',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-playstation_id',
        title: 'Playstation_id',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-nintendo_friend_code',
        title: 'Nintendo_friend_code',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
